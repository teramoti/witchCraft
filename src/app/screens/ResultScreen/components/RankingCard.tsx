import rainbowSlash from '../../../../../assets/Image/alchemy/effects/08_rainbow_slash.png'
import { getWitchSkin } from '../../../data/witchSkins.js'
import { getColorTitle, getMixGradient, type PlayerResult } from '../resultPresentation'
import './RankingCard.css'

type Props = {
  entry: PlayerResult
  rank: number | undefined
}

export default function RankingCard({ entry, rank }: Props) {
  const isFirst = rank === 1
  return (
    <article className={isFirst ? 'first' : ''}>
      <div className="flowerRankFlag"><b>{rank}</b><small>位</small></div>
      <div className="flowerCardSlash" aria-hidden="true">
        <div className="flowerDynamicSlash" style={{ backgroundImage: getMixGradient(entry) }} />
        <img src={rainbowSlash} alt="" />
      </div>

      <div className="flowerPlayerMark">
        <img
          className="flowerResultWitch"
          src={getWitchSkin(entry.skin).ranks[Math.max(0, Math.min(3, (rank ?? 4) - 1))]}
          alt={`PLAYER ${entry.player}`}
        />
      </div>
      <strong className="flowerPlayerName">PLAYER {entry.player}</strong>
      <b className="flowerScore">{entry.score.toLocaleString()}<small>pt</small></b>

      <dl className="flowerStats">
        <div><dt>成功合成</dt><dd>{entry.stats?.stars ?? 0}</dd></div>
        <div><dt>操作回数</dt><dd>{entry.stats?.distance ?? 0}</dd></div>
        <div><dt>最大連続</dt><dd>{entry.stats?.maxCombo ?? 0}</dd></div>
        <div><dt>ミス</dt><dd>{entry.stats?.hits ?? 0}</dd></div>
      </dl>

      <div className="flowerColorName">
        <small>TODAY'S COLOR</small>
        <b>{getColorTitle(entry)}</b>
        <span className="flowerColorBar" style={{ backgroundImage: getMixGradient(entry) }} />
      </div>
    </article>
  )
}
