import type { GameSettings } from '../../app/types/gameTypes'
import { DIFFICULTY_BALANCE } from '../../app/data/gameBalance.js'
import { createPlayerSkinAssignment } from '../../app/data/playerSkins.js'
import type { GameSessionState } from './GameSessionTypes'

export function normalizePlayerCount(playerCount: number): number {
  if (!Number.isFinite(playerCount)) return 1
  return Math.max(1, Math.min(4, Math.floor(playerCount)))
}

export function createInitialSessionState(
  playerCount: number,
  difficulty: GameSettings['difficulty'] = 'normal'
): GameSessionState {
  const safeCount = normalizePlayerCount(playerCount)
  const playerSkins = createPlayerSkinAssignment(safeCount)
  return {
    playerCount: safeCount,
    currentPlayer: 1,
    currentScore: 0,
    playerScores: Array.from({ length: safeCount }, () => 0),
    currentStars: 0,
    currentDistance: 0,
    timeLeft: DIFFICULTY_BALANCE[difficulty ?? 'normal'].roundTimeSeconds,
    currentAmmo: 0,
    maxAmmo: 1,
    playerSkins,
    currentSkin: playerSkins[0] ?? 'pink',
    completedResults: [],
    isRunning: false
  }
}
