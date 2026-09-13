import type { GameResult } from '../../app/types/gameTypes'
import type { PlayerSkinId } from '../../app/data/playerSkins.js'

export type GameHudUpdateDetail = {
  player: number
  playerCount: number
  score: number
  stars: number
  distance: number
  timeLeft: number
  ammo: number
  maxAmmo: number
}

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
