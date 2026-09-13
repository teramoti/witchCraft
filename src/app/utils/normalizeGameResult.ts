import type { GameResult, RawGameResult } from '../types/gameTypes'

export function normalizeGameResult(raw: RawGameResult): GameResult {
  if (Array.isArray(raw.results)) {
    return {
      results: raw.results
        .map((entry, index) => ({
          player: entry.player ?? entry.playerNumber ?? index + 1,
          score: entry.score,
          skin: entry.skin,
          stats: entry.stats,
          review: entry.review
        }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score
          return a.player - b.player
        })
    }
  }

  if (Array.isArray(raw.scores)) {
    return {
      results: raw.scores
        .map((score, index) => ({ player: index + 1, score }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score
          return a.player - b.player
        })
    }
  }

  return { results: [] }
}
