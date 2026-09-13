import { startScreenAssets } from '../startScreenData'
import './RecipePreview.css'

export default function RecipePreview() {
  const { redFlower, blueFlower, yellowFlower, purpleDye, greenDye, orangeDye } = startScreenAssets
  return (
    <div className="flowerRecipePreview" aria-label="基本レシピ">
      <div><img src={redFlower} alt="赤い花" /><span>＋</span><img src={redFlower} alt="赤い花" /><span>＋</span><img src={blueFlower} alt="青い花" /><span>＝</span><img src={purpleDye} alt="紫の染料" /></div>
      <div><img src={blueFlower} alt="青い花" /><span>＋</span><img src={blueFlower} alt="青い花" /><span>＋</span><img src={yellowFlower} alt="黄色い花" /><span>＝</span><img src={greenDye} alt="緑の染料" /></div>
      <div><img src={yellowFlower} alt="黄色い花" /><span>＋</span><img src={yellowFlower} alt="黄色い花" /><span>＋</span><img src={redFlower} alt="赤い花" /><span>＝</span><img src={orangeDye} alt="橙の染料" /></div>
    </div>
  )
}
