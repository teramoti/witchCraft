import { useCallback, useState } from 'react'
import { resetGameSession } from '../../game/GameManager'
import type { GameResult, GameSettings, RawGameResult } from '../types/gameTypes'
import { normalizeGameResult } from '../utils/normalizeGameResult'

export type AppScreen = 'start' | 'game' | 'result'

export function useAppFlow() {
  const [screen, setScreen] = useState<AppScreen>('start')
  const [settings, setSettings] = useState<GameSettings | null>(null)
  const [result, setResult] = useState<GameResult | null>(null)

  const handleStart = useCallback((nextSettings: GameSettings) => {
    setSettings(nextSettings)
    setScreen('game')
  }, [])

  const handleFinish = useCallback((rawResult: RawGameResult) => {
    setResult(normalizeGameResult(rawResult))
    setScreen('result')
  }, [])

  const handleRetry = useCallback(() => {
    if (!settings) return
    resetGameSession()
    setResult(null)
    setScreen('game')
  }, [settings])

  const handleBack = useCallback(() => {
    resetGameSession()
    setSettings(null)
    setResult(null)
    setScreen('start')
  }, [])

  return {
    screen,
    settings,
    result,
    handleStart,
    handleFinish,
    handleRetry,
    handleBack
  }
}
