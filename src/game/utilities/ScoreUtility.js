import { BLACK_TARGETS, WHITE_TARGETS } from '../config/recipeConfig.js'

export function targetBaseScore(target) {
  if (BLACK_TARGETS.includes(target)) return 170
  if (WHITE_TARGETS.includes(target)) return 135
  return 100
}

export function calculateMixScore({ target, streak, feverActive, difficultyMultiplier }) {
  const base = targetBaseScore(target)
  const safeStreak = Math.max(1, Number(streak) || 1)
  const streakBonus = 1 + Math.min(4, safeStreak - 1) * 0.12
  const feverBonus = feverActive ? 1.5 : 1
  const difficultyBonus = Number(difficultyMultiplier) || 1
  return Math.round(base * streakBonus * feverBonus * difficultyBonus)
}
