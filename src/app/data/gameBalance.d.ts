/** JavaScript設定値をTypeScript側から参照するための宣言です。 */
import type { Difficulty } from '../App'

export const ROUND_TIME_SECONDS: number
export const GROUND_TOP: number
export const WORLD_WIDTH: number
export const CHUNK_WIDTH: number
export const STAR_BASE_POINTS: Record<string, number>
export const SPEED_MODE_BALANCE: {
  speedRampPerSecond: number
  openingBoostDurationSeconds: number
  openingSpeedBonus: number
  worldWidth: number
}
export const DIFFICULTY_BALANCE: Record<Difficulty, {
  roundTimeSeconds: number
  baseSpeed: number
  maxSpeed: number
  speedRampPerSecond: number
  hitPenaltySeconds: number
  floatDurationMs: number
  comboWindowMs: number
}>
