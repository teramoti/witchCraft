import redFlower from '../../../../assets/Image/generated/flowers/red_01_rose.png'
import blueFlower from '../../../../assets/Image/generated/flowers/blue_01_nemophila.png'
import yellowFlower from '../../../../assets/Image/generated/flowers/yellow_01_sunflower.png'
import whiteFlower from '../../../../assets/Image/generated/flowers/white_01_lily.png'
import blackFlower from '../../../../assets/Image/generated/flowers/black_01_black_rose.png'
import purpleDye from '../../../../assets/Image/generated/potions/01_01_basic_purple.png'
import greenDye from '../../../../assets/Image/generated/potions/01_02_basic_green.png'
import orangeDye from '../../../../assets/Image/generated/potions/01_03_basic_orange.png'
import catIdle1 from '../../../../assets/Image/generated/cats/cat_idle_1.png'
import catIdle2 from '../../../../assets/Image/generated/cats/cat_idle_2.png'
import catWalk from '../../../../assets/Image/generated/cats/cat_walk.png'
import catHappy from '../../../../assets/Image/generated/cats/cat_happy.png'
import catSurprised from '../../../../assets/Image/generated/cats/cat_surprised.png'
import catQuestion from '../../../../assets/Image/generated/cats/cat_question.png'
import catSleep from '../../../../assets/Image/generated/cats/cat_sleep.png'
import catRoll from '../../../../assets/Image/generated/cats/cat_roll.png'

export type DifficultyInfo = {
  name: string
  seconds: number
  colors: number
  board: string
  belts: number
  multiplier: string
  description: string
}

export type StandardDifficulty = 'easy' | 'normal' | 'hard'

export type TitleCatFrame = {
  src: string
  className: string
}

export const difficultyInfo: Record<StandardDifficulty, DifficultyInfo> = {
  easy: {
    name: 'EASY', seconds: 60, colors: 3, board: '5×4', belts: 4, multiplier: '×1.00',
    description: '赤・青・黄の3色。1マス動かして、3素材レシピを一直線にそろえる。'
  },
  normal: {
    name: 'NORMAL', seconds: 45, colors: 4, board: '6×4', belts: 4, multiplier: '×1.15',
    description: '白が追加。横幅が伸び、3つの並びを1手で完成させる判断が増える。'
  },
  hard: {
    name: 'HARD', seconds: 30, colors: 5, board: '7×4', belts: 4, multiplier: '×1.35',
    description: '黒まで追加。7列から3素材レシピを探し、短時間で1マスを選ぶ。'
  }
}

export const standardDifficulties: StandardDifficulty[] = ['easy', 'normal', 'hard']

export const titleCatFrames: TitleCatFrame[] = [
  { src: catIdle1, className: 'state-idle' },
  { src: catIdle2, className: 'state-idle' },
  { src: catWalk, className: 'state-walk' },
  { src: catHappy, className: 'state-happy' },
  { src: catSurprised, className: 'state-surprised' },
  { src: catQuestion, className: 'state-question' },
  { src: catSleep, className: 'state-sleep' },
  { src: catRoll, className: 'state-roll' }
]

export const startScreenAssets = Object.freeze({
  redFlower,
  blueFlower,
  yellowFlower,
  whiteFlower,
  blackFlower,
  purpleDye,
  greenDye,
  orangeDye
})
