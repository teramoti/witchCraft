import { lazy, Suspense } from 'react'
import ResultScreen from './screens/ResultScreen/ResultScreen'
import StartScreen from './screens/StartScreen/StartScreen'
import { useAppFlow } from './hooks/useAppFlow'

export type {
  Difficulty,
  GameResult,
  GameSettings,
  PlayerResult,
  PlayerReview,
  PlayerStats,
  ScoreBreakdown
} from './types/gameTypes'

const GameScreen = lazy(() => import('./screens/GameScreen/GameScreen'))

export default function App() {
  const flow = useAppFlow()

  return (
    <>
      {flow.screen === 'start' && <StartScreen onStart={flow.handleStart} />}

      {flow.screen === 'game' && flow.settings && (
        <Suspense fallback={<div className="gameLoading">魔法の世界を準備中…</div>}>
          <GameScreen settings={flow.settings} onFinish={flow.handleFinish} />
        </Suspense>
      )}

      {flow.screen === 'result' && flow.result && (
        <ResultScreen
          result={flow.result}
          onRetry={flow.handleRetry}
          onBack={flow.handleBack}
        />
      )}
    </>
  )
}
