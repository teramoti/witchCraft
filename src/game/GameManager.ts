import Phaser from 'phaser'
import type { GameResult, GameSettings } from '../app/types/gameTypes'
import StartScene, { configureStartScene } from '../scenes/Start'
import { createPhaserGame } from './PhaserGameFactory'
import { attachHudStateListener, detachHudStateListener } from './session/HudStateBridge'
import {
  finalizeSession,
  initializeRunningSession,
  markSessionStopped,
  normalizePlayerCount
} from './session/GameSessionActions'
import {
  getGameSessionState,
  resetGameSession,
  subscribeGameSession
} from './session/GameSessionStore'
import type { GameSessionState } from './session/GameSessionTypes'

export type { GameSessionState }
export { getGameSessionState, subscribeGameSession, resetGameSession }

let game: Phaser.Game | null = null

export function startGame(
  parent: HTMLElement,
  settings: GameSettings,
  onFinish: (result: GameResult) => void
) {
  destroyGame()

  const playerCount = normalizePlayerCount(settings.playerCount)
  const difficulty = settings.difficulty ?? 'normal'
  const hudTarget = settings.hudTarget ?? new EventTarget()
  const playerSkins = initializeRunningSession(playerCount, difficulty)
  const normalizedSettings: GameSettings = {
    ...settings,
    playerCount,
    difficulty,
    hudTarget,
    playerSkins
  }

  attachHudStateListener(hudTarget)
  const handleFinish = (result: GameResult) => {
    finalizeSession(result)
    onFinish(result)
  }
  configureStartScene(normalizedSettings, handleFinish)

  try {
    game = createPhaserGame(parent, new StartScene({
      playerCount,
      difficulty,
      speedMode: normalizedSettings.speedMode
    }))
  } catch {
    game = null
    handleFinish({ results: getGameSessionState().completedResults ?? [] })
  }
}

export function destroyGame() {
  detachHudStateListener()
  game?.destroy(true)
  game = null
  markSessionStopped()
}
