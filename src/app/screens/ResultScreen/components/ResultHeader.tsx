import type { PlayerResult } from '../resultPresentation'
import './ResultHeader.css'

type Props = { winner?: PlayerResult }

export default function ResultHeader({ winner }: Props) {
  return (
    <header className="flowerResultHeader">
      <div>
        <p>FLOWER DYE ALCHEMY LAB</p>
        <h1>RESULT</h1>
        <span>1マススライド錬金の記録</span>
      </div>
      {winner && (
        <div className="flowerWinnerBadge">
          <small>WINNER</small>
          <strong>{winner.player}P</strong>
          <b>{winner.score.toLocaleString()} pt</b>
        </div>
      )}
    </header>
  )
}
