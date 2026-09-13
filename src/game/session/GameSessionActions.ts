import type { GameResult, GameSettings } from '../../app/types/gameTypes'
import { createPlayerSkinAssignment, type PlayerSkinId } from '../../app/data/playerSkins.js'
import { createInitialSessionState, normalizePlayerCount } from './GameSessionFactory'
import {
  getGameSessionState,
  replaceSessionState,
  updateSessionState
} from './GameSessionStore'
import type { GameHudUpdateDetail } from './GameSessionTypes'

export { normalizePlayerCount } from './GameSessionFactory'

export function initializeRunningSession(
  playerCount: number,
  difficulty: GameSettings['difficulty'] = 'normal'
): PlayerSkinId[] {
  const safeCount = normalizePlayerCount(playerCount)
  const playerSkins = createPlayerSkinAssignment(safeCount)
  replaceSessionState({
    ...createInitialSessionState(safeCount, difficulty),
    playerSkins: [...playerSkins],
    currentSkin: playerSkins[0] ?? 'pink',
    isRunning: true
  })
  return playerSkins
}

export function applyHudUpdate(detail: GameHudUpdateDetail): void {
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
      currentSkin: current.playerSkins[playerIndex] ?? 'pink',
      isRunning: true
    }
  })
}

export function finalizeSession(result: GameResult): void {
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
}

export function markSessionStopped(): void {
  if (!getGameSessionState().isRunning) return
  updateSessionState((current) => ({ ...current, isRunning: false }))
}
