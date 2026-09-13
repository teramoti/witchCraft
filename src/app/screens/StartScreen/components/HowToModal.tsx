import './HowToModal.css'
type Props = { onClose: () => void }

export default function HowToModal({ onClose }: Props) {
  return (
    <div className="flowerModal" role="dialog" aria-modal="true" aria-label="遊び方">
      <section>
        <button className="flowerModalClose" type="button" onClick={onClose}>×</button>
        <p>HOW TO PLAY</p>
        <h2>花を上下左右へ1マス動かして、3素材レシピを一直線にそろえる</h2>
        <div className="flowerHowToSteps compact">
          <article><b>1</b><strong>レシピを見る</strong><span>紫なら赤＋赤＋青。今作る色と必要な3素材を確認します。</span></article>
          <article><b>2</b><strong>上下左右へ1マス</strong><span>ドラッグした方向の隣接1マスとだけ入れ替わります。長距離移動はできません。</span></article>
          <article><b>3</b><strong>3つ並べて錬金</strong><span>動かした花を含む横3マス／縦3マスがレシピ通りなら成功。適当な移動では得点しません。</span></article>
        </div>
        <div className="flowerHowToNote">3回連続で成功すると短いFEVERに入り、得点が1.5倍になります。NORMAL/HARDはミスで時間も減るので、どの1マスを動かすか考えるのがコツです。</div>
      </section>
    </div>
  )
}
