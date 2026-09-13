import type { DifficultyInfo, TitleCatFrame } from '../startScreenData'
import './TitleHero.css'

type Props = {
  selectedInfo: DifficultyInfo
  witchSrc: string
  cat: TitleCatFrame
}

export default function TitleHero({ selectedInfo, witchSrc, cat }: Props) {
  return (
    <div className="flowerAlchemyHero" aria-hidden="true">
      <div className="flowerHeroMagicRing" />
      <img className="flowerTitleWitch" src={witchSrc} alt="" />
      <img className={`flowerTitleCat ${cat.className}`} src={cat.src} alt="" />
      <span className="flowerHeroSpark sparkA">✦</span>
      <span className="flowerHeroSpark sparkB">✧</span>
      <span className="flowerHeroSpark sparkC">✦</span>
      <div className="flowerHeroCaption">
        <span>{selectedInfo.seconds}秒で何色作れる？</span>
        <b>{selectedInfo.board} / 3素材スライド錬金</b>
      </div>
    </div>
  )
}
