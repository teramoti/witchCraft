import type { Difficulty } from '../../../types/gameTypes'
import { playClickSound } from '../../../audio/playClickSound'
import { difficultyInfo, standardDifficulties, startScreenAssets, type DifficultyInfo, type StandardDifficulty } from '../startScreenData'

type Props = {
  selectedDifficulty: StandardDifficulty
  selectedInfo: DifficultyInfo
  onChange: (difficulty: Difficulty) => void
}

export default function DifficultySelector({ selectedDifficulty, selectedInfo, onChange }: Props) {
  const { redFlower, blueFlower, yellowFlower, whiteFlower, blackFlower } = startScreenAssets
  return (
    <>
      <div className="flowerControlBlock">
        <label>DIFFICULTY</label>
        <div className="flowerDifficultyButtons">
          {standardDifficulties.map((level) => {
            const info = difficultyInfo[level]
            return (
              <button
                key={level}
                type="button"
                className={`${selectedDifficulty === level ? 'selected ' : ''}difficulty-${level}`}
                onClick={() => { playClickSound(); onChange(level) }}
              >
                <b>{info.name}</b>
                <small>{info.seconds}秒　{info.board}　{info.colors}色</small>
              </button>
            )
          })}
        </div>
      </div>

      <div className={`flowerDifficultyDetail difficulty-${selectedDifficulty}`}>
        <div className="flowerDifficultyStats">
          <span><b>{selectedInfo.seconds}</b> SEC</span>
          <span><b>{selectedInfo.colors}</b> COLORS</span>
          <span><b>{selectedInfo.board}</b> BOARD</span>
          <span><b>{selectedInfo.belts}</b> ROWS</span>
          <span><b>{selectedInfo.multiplier}</b> SCORE</span>
        </div>
        <p>{selectedInfo.description}</p>
        <div className="flowerDifficultyPalette" aria-hidden="true">
          <img src={redFlower} alt="" /><img src={blueFlower} alt="" /><img src={yellowFlower} alt="" />
          {selectedInfo.colors >= 4 && <img src={whiteFlower} alt="" />}
          {selectedInfo.colors >= 5 && <img src={blackFlower} alt="" />}
        </div>
      </div>
    </>
  )
}
