import type { PlayerSkinId } from '../data/playerSkins.js'

export type Difficulty = 'easy' | 'normal' | 'hard' | 'phantom'

export type GameSettings = {
  playerCount: number
  difficulty?: Difficulty
  speedMode?: boolean
  pattern?: string
  hudTarget?: EventTarget
  playerSkins?: PlayerSkinId[]
}

export type PlayerReview = {
  rightGrid: string[][]
  selectedKeys: string[]
  correctKeys: string[]
  pattern: string
}

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

export type PlayerResult = {
  player: number
  score: number
  skin?: PlayerSkinId
  stats?: PlayerStats
  review?: PlayerReview
}

export type GameResult = {
  results: PlayerResult[]
}

export type RawPlayerResult = {
  player?: number
  playerNumber?: number
  score: number
  skin?: PlayerSkinId
  stats?: PlayerStats
  review?: PlayerReview
}

export type RawGameResult = {
  scores?: number[]
  results?: RawPlayerResult[]
}
