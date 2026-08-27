/**
 * React側のタイトル・ゲーム・リザルト遷移を管理します。
 *
 * 元PJのデータ連携契約を維持します。
 * - GameSettingsをGameScreenへ渡す
 * - PhaserからGameResultを受け取る
 * - ResultScreenへ同じresults配列を渡す
 *
 * ランナー固有の統計はoptionalな拡張情報であり、親PJが利用する
 * `player`・`score`・`results`の形は変更しません。
 */
import { lazy, Suspense, useCallback, useState } from 'react'
import type { PlayerSkinId } from './data/playerSkins.js'
import { resetGameSession } from '../game/GameManager'
import ResultScreen from './screens/ResultScreen/ResultScreen'
import StartScreen from './screens/StartScreen/StartScreen'

/** Phaserを含むゲーム画面だけ遅延読み込みします。 */
const GameScreen = lazy(() => import('./screens/GameScreen/GameScreen'))

/** React側で表示する画面です。 */
type Screen = 'start' | 'game' | 'result'

/** 元PJと同じ難易度候補です。 */
export type Difficulty = 'easy' | 'normal' | 'hard' | 'phantom'

/**
 * 元PJのゲーム開始設定です。
 *
 * `hudTarget`はReactとPhaser間の内部連携用です。外部親PJが送る必要はありません。
 * `pattern`は元PJとの型互換のため残していますが、ランナー本体では使用しません。
 */
export type GameSettings = {
  playerCount: number
  difficulty?: Difficulty
  /** Removes the HARD speed cap while preserving its other rules. */
  speedMode?: boolean
  pattern?: string
  hudTarget?: EventTarget

  /** GameManagerがゲーム開始時に固定する1P～4Pの衣装色です。 */
  playerSkins?: PlayerSkinId[]
}

/** 元PJのレビュー情報型を互換目的で残します。 */
export type PlayerReview = {
  rightGrid: string[][]
  selectedKeys: string[]
  correctKeys: string[]
  pattern: string
}

/** ランナー固有の最終得点内訳です。 */
export type ScoreBreakdown = {
  starScore: number
  distanceBonus: number
  comboBonus: number
  survivalBonus: number
  spellBonus: number
  shootingBonus: number
  burstBonus: number
  noHitBonus: number
  total: number
}

/** ランナー固有のプレイ統計です。親PJ連携には必須ではありません。 */
export type PlayerStats = {
  stars: number
  normalStars: number
  bigStars: number
  rainbowStars: number
  distance: number
  maxCombo: number
  hits: number
  spellCasts: number
  enemiesDefeated: number
  shotsFired: number
  shotsHit: number
  starBursts: number
  survivedSeconds: number
  score: number
  feverCount?: number
  preparedOrders?: number
  bloomCount?: number
  boardRescues?: number
  colorMixes?: {
    purple: number
    green: number
    orange: number
    pink?: number
    sky?: number
    cream?: number
    maroon?: number
    navy?: number
    olive?: number
    mud: number
  }
  breakdown: ScoreBreakdown
}

/**
 * 元PJと同じ1プレイヤー分の必須結果です。
 * `stats`はランナー用の追加情報、`review`は旧ゲーム互換情報です。
 */
export type PlayerResult = {
  player: number
  score: number
  /** 表示用の衣装色です。親PJの順位計算には使用しません。 */
  skin?: PlayerSkinId
  stats?: PlayerStats
  review?: PlayerReview
}

/** 元PJと同じ全プレイヤー分の終了結果です。 */
export type GameResult = {
  results: PlayerResult[]
}

/** 元PJが受け入れていた1プレイヤー分の旧形式を含む終了入力です。 */
type RawPlayerResult = {
  player?: number
  playerNumber?: number
  score: number
  /** 表示用の衣装色です。親PJの順位計算には使用しません。 */
  skin?: PlayerSkinId
  stats?: PlayerStats
  review?: PlayerReview
}

/** 元PJが受け入れていた`scores`形式と`results`形式です。 */
type RawGameResult = {
  scores?: number[]
  results?: RawPlayerResult[]
}

/**
 * 元PJと同じルールで終了結果を正規化します。
 *
 * 重要:
 * - `player`と`score`を必ず保持する
 * - score降順、同点時player昇順へ並べる
 * - ランナー固有statsは存在する場合だけ引き継ぐ
 */
function normalizeGameResult(raw: RawGameResult): GameResult {
  if (Array.isArray(raw.results)) {
    return {
      results: raw.results
        .map((entry, index) => ({
          player: entry.player ?? entry.playerNumber ?? index + 1,
          score: entry.score,
          skin: entry.skin,
          stats: entry.stats,
          review: entry.review
        }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score
          return a.player - b.player
        })
    }
  }

  if (Array.isArray(raw.scores)) {
    return {
      results: raw.scores
        .map((score, index) => ({
          player: index + 1,
          score
        }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score
          return a.player - b.player
        })
    }
  }

  return { results: [] }
}

/** タイトル・ゲーム・リザルトの表示を切り替えるルートコンポーネントです。 */
export default function App() {
  /** 現在表示している画面です。 */
  const [screen, setScreen] = useState<Screen>('start')

  /** タイトル画面で確定した設定です。 */
  const [settings, setSettings] = useState<GameSettings | null>(null)

  /** Phaserから受け取った結果です。 */
  const [result, setResult] = useState<GameResult | null>(null)

  /** タイトル画面からゲーム画面へ進みます。 */
  const handleStart = useCallback((nextSettings: GameSettings) => {
    setSettings(nextSettings)
    setScreen('game')
  }, [])

  /** Phaser終了結果を元PJ互換形式へ正規化してリザルトへ渡します。 */
  const handleFinish = useCallback((rawResult: RawGameResult) => {
    setResult(normalizeGameResult(rawResult))
    setScreen('result')
  }, [])

  /** 同じ設定でもう一度遊びます。制作で再試行しやすいよう1クリックで再戦できます。 */
  const handleRetry = useCallback(() => {
    if (!settings) return
    resetGameSession()
    setResult(null)
    setScreen('game')
  }, [settings])

  /** リザルトからタイトルへ戻り、GameManagerの共有状態も初期化します。 */
  const handleBack = useCallback(() => {
    resetGameSession()
    setSettings(null)
    setResult(null)
    setScreen('start')
  }, [])

  return (
    <>
      {screen === 'start' && <StartScreen onStart={handleStart} />}

      {screen === 'game' && settings && (
        <Suspense fallback={<div className="gameLoading">魔法の世界を準備中…</div>}>
          <GameScreen settings={settings} onFinish={handleFinish} />
        </Suspense>
      )}

      {screen === 'result' && result && (
        <ResultScreen result={result} onRetry={handleRetry} onBack={handleBack} />
      )}
    </>
  )
}
