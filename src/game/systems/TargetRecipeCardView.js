import { BOARD_TOP, PANEL_W, PANEL_X } from '../config/alchemyConfig.js'

export default class TargetRecipeCardView {
  constructor(scene) {
    this.scene = scene
  }

  create() {
    const cx = PANEL_X + PANEL_W / 2

    this.scene.targetCard = this.scene.add.rectangle(
      cx,
      BOARD_TOP + 154,
      PANEL_W - 42,
      254,
      0xead7b5,
      1
    ).setStrokeStyle(3, 0x9e7544, 0.95)

    this.scene.add.text(cx, BOARD_TOP + 50, '今回のレシピ', {
      fontFamily: 'Yu Mincho, Georgia, serif',
      fontSize: '27px',
      fontStyle: 'bold',
      color: '#4b2d2a'
    }).setOrigin(0.5)

    this.scene.targetTitle = this.scene.add.text(cx, BOARD_TOP + 102, '', {
      fontFamily: 'Yu Gothic, sans-serif',
      fontSize: '31px',
      fontStyle: 'bold',
      color: '#4b2d2a',
      align: 'center'
    }).setOrigin(0.5)

    this.scene.recipeContainer = this.scene.add.container(cx, BOARD_TOP + 160)
    this.scene.targetPotion = this.scene.add.image(
      cx,
      BOARD_TOP + 225,
      this.scene.randomVariantKey('purple')
    ).setDisplaySize(72, 72)
  }
}
