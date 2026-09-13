import { useRef } from 'react'
import resultTheme from '../../../../assets/audio/result_theme.wav'
import resultBackdrop from '../../../../assets/Image/alchemy_ui/result_backdrop.png'
import resultCat from '../../../../assets/Image/generated/cats/cat_happy.png'
import type { GameResult } from '../../types/gameTypes'
import { playClickSound } from '../../audio/playClickSound'
import { useLoopingAudio } from '../../hooks/useLoopingAudio'
import { useMenuKeyboardNavigation } from '../../hooks/useMenuKeyboardNavigation'
import RankingCard from './components/RankingCard'
import ResultHeader from './components/ResultHeader'
import { postGameClear } from './resultActions'
import { useResultRanking } from './useResultRanking'
import './ResultScreen.css'

type Props = {
  result: GameResult
  onRetry: () => void
  onBack: () => void
}

export default function ResultScreen({ result, onRetry, onBack }: Props) {
  const screenRef = useRef<HTMLElement | null>(null)
  useMenuKeyboardNavigation(screenRef)
  useLoopingAudio(resultTheme, 0.12)

  const { rankedResults, ranksByPlayer } = useResultRanking(result)

  const handleBack = () => {
    playClickSound()
    postGameClear(result)
    onBack()
  }

  const handleRetry = () => {
    playClickSound()
    onRetry()
  }

  return (
    <main
      className="flowerResultScreen"
      ref={screenRef}
      style={{ backgroundImage: `url(${resultBackdrop})` }}
    >
      <div className="flowerResultWash" aria-hidden="true" />
      <section className="flowerResultShell">
        <ResultHeader winner={rankedResults[0]} />

        <div className={`flowerRanking count-${Math.min(4, rankedResults.length)}`}>
          {rankedResults.map((entry) => (
            <RankingCard
              key={entry.player}
              entry={entry}
              rank={ranksByPlayer.get(entry.player)}
            />
          ))}
        </div>

        <img className="flowerResultCat" src={resultCat} alt="" aria-hidden="true" />

        <div className="flowerResultActions">
          <button className="flowerRetryButton" type="button" data-menu-default onClick={handleRetry}>
            同じ設定でもう一度
          </button>
          <button className="flowerResultBack" type="button" onClick={handleBack}>
            タイトルに戻る
          </button>
        </div>
      </section>
    </main>
  )
}
