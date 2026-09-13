import { getRanksFromScores } from '../../../utils/Result.js'
import type { GameResult } from '../../types/gameTypes'

export function postGameClear(result: GameResult): void {
  const scoresByPlayer = [...result.results]
    .sort((a, b) => a.player - b.player)
    .map((entry) => entry.score)

  window.parent.postMessage({
    type: 'GameClear',
    rank: getRanksFromScores(scoresByPlayer)
  }, '*')
}
