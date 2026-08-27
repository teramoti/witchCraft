import { useEffect, useMemo, useRef } from 'react'
import resultTheme from '../../../../assets/audio/result_theme.wav'
import resultBackdrop from '../../../../assets/Image/alchemy_ui/result_backdrop.png'
import rainbowSlash from '../../../../assets/Image/alchemy/effects/08_rainbow_slash.png'
import { getRanksFromScores } from '../../../utils/Result.js'
import type { GameResult } from '../../App'
import { playClickSound } from '../../audio/playClickSound'
import { getWitchSkin } from '../../data/witchSkins.js'
import { useMenuKeyboardNavigation } from '../../hooks/useMenuKeyboardNavigation'
import './ResultScreen.css'

const MIX_COLORS = {
  purple: '#a86cff', green: '#52d47b', orange: '#ff963e', pink: '#ff77ad', sky: '#72d9ff',
  cream: '#ffe6a3', maroon: '#8e3047', navy: '#314a8f', olive: '#71843a', mud: '#665a63'
} as const

const COLOR_TITLES = {
  purple: '妖精の夜色', green: '森の錬金色', orange: '夕焼け色', pink: '花霞の桃色', sky: '朝空のしずく色',
  cream: '月蜜の淡黄色', maroon: '深紅の秘薬色', navy: '深海の紺色', olive: '古森の苔色', mud: '禁断のにごり色'
} as const

type MixKey = keyof typeof MIX_COLORS

function getMixEntries(result: GameResult['results'][number]): Array<[MixKey, number]> {
  const mixes = result.stats?.colorMixes
  if (!mixes) return []
  return (Object.keys(MIX_COLORS) as MixKey[]).map((key) => [key, Number(mixes[key] ?? 0)])
}

function getMixGradient(result: GameResult['results'][number]): string {
  const entries = getMixEntries(result).filter(([, value]) => value > 0)
  const total = entries.reduce((sum, [, value]) => sum + value, 0)
  if (total <= 0) return 'linear-gradient(90deg,#a86cff,#52d47b,#ff963e)'
  let cursor = 0
  const stops = entries.map(([key, value]) => {
    const start = cursor
    cursor += (value / total) * 100
    return `${MIX_COLORS[key]} ${start.toFixed(1)}%, ${MIX_COLORS[key]} ${cursor.toFixed(1)}%`
  })
  return `linear-gradient(90deg,${stops.join(',')})`
}

function getColorTitle(result: GameResult['results'][number]): string {
  const entries = getMixEntries(result)
  const total = entries.reduce((sum, [, value]) => sum + value, 0)
  if (total <= 0) return 'まだ見ぬ錬金色'
  const nonMud = entries.filter(([key]) => key !== 'mud')
  const usedColors = nonMud.filter(([, value]) => value > 0)
  const strongest = Math.max(...usedColors.map(([, value]) => value), 0)
  if (usedColors.length >= 4 && strongest / total < 0.38) return '虹色アルケミスト'
  const sorted = [...entries].sort((a, b) => b[1] - a[1])
  return COLOR_TITLES[sorted[0]?.[0] ?? 'purple']
}

type Props = {
  result: GameResult
  onRetry: () => void
  onBack: () => void
}

export default function ResultScreen({ result, onRetry, onBack }: Props) {
  const screenRef = useRef<HTMLElement | null>(null)
  useMenuKeyboardNavigation(screenRef)

  const rankedResults = useMemo(() => [...result.results].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.player - b.player
  }), [result.results])

  const ranksByPlayer = useMemo(() => {
    const byPlayer = [...result.results].sort((a, b) => a.player - b.player)
    const ranks = getRanksFromScores(byPlayer.map((entry) => entry.score))
    return new Map(byPlayer.map((entry, i) => [entry.player, ranks[i]]))
  }, [result.results])

  useEffect(() => {
    const audio = new Audio(resultTheme)
    audio.loop = true
    audio.volume = 0.12
    const play = () => void audio.play().catch(() => undefined)
    play()
    window.addEventListener('pointerdown', play, { once: true })
    return () => {
      window.removeEventListener('pointerdown', play)
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  const handleBack = () => {
    playClickSound()
    const scoresByPlayer = [...result.results].sort((a, b) => a.player - b.player).map((entry) => entry.score)
    window.parent.postMessage({ type: 'GameClear', rank: getRanksFromScores(scoresByPlayer) }, '*')
    onBack()
  }

  const handleRetry = () => {
    playClickSound()
    onRetry()
  }

  const winner = rankedResults[0]

  return (
    <main className="flowerResultScreen" ref={screenRef} style={{ backgroundImage: `url(${resultBackdrop})` }}>
      <div className="flowerResultWash" aria-hidden="true" />
      <section className="flowerResultShell">
        <header className="flowerResultHeader">
          <div>
            <p>FLOWER DYE ALCHEMY LAB</p>
            <h1>RESULT</h1>
            <span>1マススライド錬金の記録</span>
          </div>
          {winner && (
            <div className="flowerWinnerBadge">
              <small>WINNER</small>
              <strong>{winner.player}P</strong>
              <b>{winner.score.toLocaleString()} pt</b>
            </div>
          )}
        </header>

        <div className={`flowerRanking count-${Math.min(4, rankedResults.length)}`}>
          {rankedResults.map((entry) => {
            const rank = ranksByPlayer.get(entry.player)
            const isFirst = rank === 1
            return (
              <article key={entry.player} className={isFirst ? 'first' : ''}>
                <div className="flowerRankFlag"><b>{rank}</b><small>位</small></div>
                <div className="flowerCardSlash" aria-hidden="true">
                  <div className="flowerDynamicSlash" style={{ backgroundImage: getMixGradient(entry) }} />
                  <img src={rainbowSlash} alt="" />
                </div>

                <div className="flowerPlayerMark">
                  <img
                    className="flowerResultWitch"
                    src={getWitchSkin(entry.skin).ranks[Math.max(0, Math.min(3, (rank ?? 4) - 1))]}
                    alt={`PLAYER ${entry.player}`}
                  />
                </div>
                <strong className="flowerPlayerName">PLAYER {entry.player}</strong>
                <b className="flowerScore">{entry.score.toLocaleString()}<small>pt</small></b>

                <dl className="flowerStats">
                  <div><dt>成功合成</dt><dd>{entry.stats?.stars ?? 0}</dd></div>
                  <div><dt>操作回数</dt><dd>{entry.stats?.distance ?? 0}</dd></div>
                  <div><dt>最大連続</dt><dd>{entry.stats?.maxCombo ?? 0}</dd></div>
                  <div><dt>ミス</dt><dd>{entry.stats?.hits ?? 0}</dd></div>
                </dl>

                <div className="flowerColorName">
                  <small>TODAY'S COLOR</small>
                  <b>{getColorTitle(entry)}</b>
                  <span className="flowerColorBar" style={{ backgroundImage: getMixGradient(entry) }} />
                </div>
              </article>
            )
          })}
        </div>

        <div className="flowerResultActions">
          <button className="flowerRetryButton" type="button" data-menu-default onClick={handleRetry}>同じ設定でもう一度</button>
          <button className="flowerResultBack" type="button" onClick={handleBack}>タイトルに戻る</button>
        </div>
      </section>
    </main>
  )
}
