import { playClickSound } from '../../../audio/playClickSound'

type Props = {
  playerCount: number
  fixed: boolean
  onChange: (count: number) => void
}

export default function PlayerSelector({ playerCount, fixed, onChange }: Props) {
  return (
    <div className="flowerControlBlock">
      <label>PLAYERS</label>
      <div className="flowerPlayerButtons">
        {[1, 2, 3, 4].map((count) => (
          <button
            key={count}
            type="button"
            className={playerCount === count ? 'selected' : ''}
            disabled={fixed}
            onClick={() => { playClickSound(); onChange(count) }}
          >{count}P</button>
        ))}
      </div>
    </div>
  )
}
