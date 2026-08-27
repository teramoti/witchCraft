/**
 * ReactとPhaserの境界を管理します。
 *
 * 公開関数の形とファイル位置は元PJを維持しています。
 * - `startGame(parent, settings, onFinish)`
 * - `destroyGame()`
 *
 * 追加したセッション参照機能は、この既存境界を変更せず内部状態を公開します。
 */
import Phaser from 'phaser'
import type { GameResult, GameSettings } from '../app/App'
import { DIFFICULTY_BALANCE } from '../app/data/gameBalance.js'
import { createPlayerSkinAssignment, type PlayerSkinId } from '../app/data/playerSkins.js'
import StartScene, { configureStartScene } from '../scenes/Start'

/** Phaserから通知されるHUD情報のうち、GameManagerが保持する項目です。 */
type GameHudUpdateDetail = {
  player: number
  playerCount: number
  score: number
  stars: number
  distance: number
  timeLeft: number
  ammo: number
  maxAmmo: number
}

/** Reactや外部PJから参照できる現在のセッション状態です。 */
export type GameSessionState = {
  playerCount: number
  currentPlayer: number
  currentScore: number
  playerScores: number[]
  currentStars: number
  currentDistance: number
  timeLeft: number
  currentAmmo: number
  maxAmmo: number
  playerSkins: PlayerSkinId[]
  currentSkin: PlayerSkinId
  completedResults: GameResult['results']
  isRunning: boolean
}

/** Phaserゲームインスタンスです。二重起動を防ぐため1件だけ保持します。 */
let game: Phaser.Game | null = null

/** GameManagerが監視しているHUD連携用EventTargetです。 */
let activeHudTarget: EventTarget | null = null

/** HUD更新リスナーを解除するために保持します。 */
let hudUpdateHandler: EventListener | null = null

/** セッション状態変更を購読している処理です。 */
const sessionSubscribers = new Set<(state: GameSessionState) => void>()

/** 現在のセッション状態です。 */
let sessionState: GameSessionState = createInitialSessionState(1)

/** 指定人数から初期状態を作成します。 */
function createInitialSessionState(playerCount: number, difficulty: GameSettings['difficulty'] = 'normal'): GameSessionState {
  const playerSkins = createPlayerSkinAssignment(playerCount)

  return {
    playerCount,
    currentPlayer: 1,
    currentScore: 0,
    playerScores: Array.from({ length: playerCount }, () => 0),
    currentStars: 0,
    currentDistance: 0,
    timeLeft: DIFFICULTY_BALANCE[difficulty ?? 'normal'].roundTimeSeconds,
    currentAmmo: 0,
    maxAmmo: 1,
    playerSkins,
    currentSkin: playerSkins[0] ?? 'navy',
    completedResults: [],
    isRunning: false
  }
}

/** 外部入力の人数をゲーム仕様の1～4人へ正規化します。 */
function normalizePlayerCount(playerCount: number): number {
  if (!Number.isFinite(playerCount)) return 1
  return Math.max(1, Math.min(4, Math.floor(playerCount)))
}

/** 状態を更新し、購読者へコピーを通知します。 */
function updateSessionState(
  updater: (current: GameSessionState) => GameSessionState
): void {
  sessionState = updater(sessionState)
  const snapshot = getGameSessionState()
  sessionSubscribers.forEach((subscriber) => subscriber(snapshot))
}

/** SceneのHUD通知をGameManagerの共有状態へ反映します。 */
function applyHudUpdate(detail: GameHudUpdateDetail): void {
  updateSessionState((current) => {
    const playerCount = normalizePlayerCount(detail.playerCount)
    const playerScores = Array.from(
      { length: playerCount },
      (_, index) => current.playerScores[index] ?? 0
    )
    const playerIndex = Math.max(0, Math.min(playerCount - 1, detail.player - 1))
    playerScores[playerIndex] = detail.score

    return {
      ...current,
      playerCount,
      currentPlayer: playerIndex + 1,
      currentScore: detail.score,
      playerScores,
      currentStars: detail.stars,
      currentDistance: detail.distance,
      timeLeft: detail.timeLeft,
      currentAmmo: detail.ammo,
      maxAmmo: detail.maxAmmo,
      currentSkin: current.playerSkins[playerIndex] ?? 'navy',
      isRunning: true
    }
  })
}

/** GameManager用のHUD更新リスナーを登録します。 */
function attachHudStateListener(target: EventTarget): void {
  detachHudStateListener()

  activeHudTarget = target
  hudUpdateHandler = ((event: Event) => {
    const customEvent = event as CustomEvent<GameHudUpdateDetail>
    if (customEvent.detail) applyHudUpdate(customEvent.detail)
  }) as EventListener

  target.addEventListener('game-hud-update', hudUpdateHandler)
}

/** 登録済みHUD更新リスナーを解除します。 */
function detachHudStateListener(): void {
  if (activeHudTarget && hudUpdateHandler) {
    activeHudTarget.removeEventListener('game-hud-update', hudUpdateHandler)
  }

  activeHudTarget = null
  hudUpdateHandler = null
}

/**
 * ゲーム開始関数
 * @param parent 描画先のDOM要素
 * @param settings 設定情報（プレイヤー数など）
 * @param onFinish ゲーム終了時のコールバック
 */
export function startGame(
  parent: HTMLElement,
  settings: GameSettings,
  onFinish: (result: GameResult) => void
) {
  const { playerCount } = settings
  const { difficulty = 'normal' } = settings

  /** React StrictModeや再遷移による二重生成を防ぎます。 */
  destroyGame()

  /** 元PJの入力形式を壊さず、内部で安全な値へ正規化します。 */
  const normalizedPlayerCount = normalizePlayerCount(playerCount)
  const hudTarget = settings.hudTarget ?? new EventTarget()
  const playerSkins = createPlayerSkinAssignment(normalizedPlayerCount)
  const normalizedSettings: GameSettings = {
    ...settings,
    playerCount: normalizedPlayerCount,
    difficulty,
    hudTarget,
    playerSkins
  }

  /** 新しいゲーム開始時に人数・スコア・結果を初期化します。 */
  sessionState = {
    ...createInitialSessionState(normalizedPlayerCount, difficulty),
    playerSkins: [...playerSkins],
    currentSkin: playerSkins[0] ?? 'navy',
    isRunning: true
  }
  sessionSubscribers.forEach((subscriber) => subscriber(getGameSessionState()))

  /** Sceneから送られるリアルタイム情報をGameManagerへ同期します。 */
  attachHudStateListener(hudTarget)

  /** 確定結果をGameManagerへ保存してから、元のonFinishへ返します。 */
  const handleFinish = (result: GameResult): void => {
    updateSessionState((current) => {
      const playerScores = Array.from(
        { length: current.playerCount },
        (_, index) => result.results.find((entry) => entry.player === index + 1)?.score ?? 0
      )
      const lastResult = result.results.at(-1)

      return {
        ...current,
        currentPlayer: lastResult?.player ?? current.currentPlayer,
        currentScore: lastResult?.score ?? current.currentScore,
        currentSkin: current.playerSkins[(lastResult?.player ?? current.currentPlayer) - 1] ?? current.currentSkin,
        playerScores,
        completedResults: [...result.results],
        isRunning: false
      }
    })

    onFinish(result)
  }

  /** 元PJと同じく、Scene生成前に設定と終了コールバックを登録します。 */
  configureStartScene(normalizedSettings, handleFinish)

  /**
   * Phaserゲームの生成
   * 画面比率と外部連携の入口は元PJと同じ`GameManager.ts`に固定します。
   */
  try {
    game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    parent,
    backgroundColor: '#100b2d',
    // 花・ポーション画像をそのまま高解像度で見せるためpixelArt固定を解除します。
    pixelArt: false,
    roundPixels: false,
    render: {
      antialias: true,
      antialiasGL: true,
      roundPixels: false
    },
      scene: new StartScene({
        playerCount: normalizedPlayerCount,
        difficulty,
        speedMode: normalizedSettings.speedMode
      })
    })
  } catch {
    // ensure we don't leave a half-initialized game
    game = null
    // notify finish to allow the app to recover
    handleFinish({ results: sessionState.completedResults ?? [] })
  }
}

/** GameManagerが保持する状態のコピーを返します。 */
export function getGameSessionState(): GameSessionState {
  return {
    ...sessionState,
    playerScores: [...sessionState.playerScores],
    playerSkins: [...sessionState.playerSkins],
    completedResults: [...sessionState.completedResults]
  }
}

/** 状態変更を購読し、戻り値の関数で購読を解除します。 */
export function subscribeGameSession(
  subscriber: (state: GameSessionState) => void
): () => void {
  sessionSubscribers.add(subscriber)
  subscriber(getGameSessionState())

  return () => sessionSubscribers.delete(subscriber)
}

/** タイトルへ戻る際に保持中の人数・スコア・結果を初期化します。 */
export function resetGameSession(): void {
  sessionState = createInitialSessionState(1)
  sessionSubscribers.forEach((subscriber) => subscriber(getGameSessionState()))
}

/**
 * ゲーム破棄処理
 * メモリ解放や再生成のために使用します。
 */
export function destroyGame() {
  detachHudStateListener()
  game?.destroy(true)
  game = null

  if (sessionState.isRunning) {
    updateSessionState((current) => ({ ...current, isRunning: false }))
  }
}
