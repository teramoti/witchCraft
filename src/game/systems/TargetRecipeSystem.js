import { COLORS, TARGET_RECIPES } from '../config/alchemyConfig.js'

export default class TargetRecipeSystem {
  constructor(scene) {
    this.scene = scene
  }

  refresh() {
    if (!this.scene.target) return

    const targetInfo = COLORS[this.scene.target]
    const recipe = TARGET_RECIPES[this.scene.target]

    if (this.scene.targetPotion?.active) {
      this.scene.targetPotion
        .setTexture(this.scene.randomVariantKey(this.scene.target))
        .setDisplaySize(72, 72)
    }
    if (this.scene.targetTitle?.active) {
      this.scene.targetTitle
        .setText(`${targetInfo.name}を作れ！`)
        .setColor('#4b2d2a')
    }
    if (this.scene.targetCard?.active) {
      this.scene.targetCard.setStrokeStyle(3, targetInfo.hex, 0.72)
    }
    if (!this.scene.recipeContainer?.active) return

    this.scene.recipeContainer.removeAll(true)
    const [a, b, c] = recipe
    const flowerA = this.scene.add.image(-108, 0, this.scene.randomVariantKey(a)).setDisplaySize(46, 46)
    const plusA = this.scene.add.text(-66, 0, '+', {
      fontFamily: 'Georgia',
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#ffe99c'
    }).setOrigin(0.5)
    const flowerB = this.scene.add.image(-22, 0, this.scene.randomVariantKey(b)).setDisplaySize(46, 46)
    const plusB = this.scene.add.text(20, 0, '+', {
      fontFamily: 'Georgia',
      fontSize: '24px',
      fontStyle: 'bold',
      color: '#ffe99c'
    }).setOrigin(0.5)
    const flowerC = this.scene.add.image(62, 0, this.scene.randomVariantKey(c)).setDisplaySize(46, 46)
    const equal = this.scene.add.text(104, 0, '=', {
      fontFamily: 'Georgia',
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#ffe99c'
    }).setOrigin(0.5)
    const result = this.scene.add.circle(136, 0, 16, targetInfo.hex)
      .setStrokeStyle(2, 0xffffff, 0.65)

    this.scene.recipeContainer.add([
      flowerA,
      plusA,
      flowerB,
      plusB,
      flowerC,
      equal,
      result
    ])
  }
}
