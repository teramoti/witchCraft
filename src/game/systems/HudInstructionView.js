import { BOARD_LEFT } from '../config/alchemyConfig.js'

export default class HudInstructionView {
  constructor(scene) {
    this.scene = scene
  }

  create() {
    this.scene.add.text(
      BOARD_LEFT + 8,
      132,
      '花を1マス動かして、レシピの3色を一直線にそろえる',
      {
        fontFamily: 'Yu Gothic, sans-serif',
        fontSize: '24px',
        fontStyle: 'bold',
        color: '#fff7df'
      }
    )

    this.scene.add.text(
      BOARD_LEFT + 8,
      162,
      '上下左右へ1マスだけ。動かした花を含む横3マス／縦3マスだけを判定します。',
      {
        fontFamily: 'Yu Gothic, sans-serif',
        fontSize: '15px',
        color: '#bfaed2'
      }
    )
  }
}
