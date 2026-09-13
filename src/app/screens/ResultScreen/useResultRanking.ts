import { useMemo } from 'react'
import { getRanksFromScores } from '../../../utils/Result.js'
import type { GameResult } from '../../types/gameTypes'

export function useResultRanking(result: GameResult) {
  const rankedResults = useMemo(() => (
    [...result.results].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.player - b.player
    })
  ), [result.results])

  const ranksByPlayer = useMemo(() => {
    const byPlayer = [...result.results].sort((a, b) => a.player - b.player)
    const ranks = getRanksFromScores(byPlayer.map((entry) => entry.score))
    return new Map(byPlayer.map((entry, index) => [entry.player, ranks[index]]))
  }, [result.results])

  return { rankedResults, ranksByPlayer }
}
