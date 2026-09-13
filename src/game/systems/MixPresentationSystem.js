import { COLORS } from '../config/alchemyConfig.js'

export default class MixPresentationSystem {
  constructor(scene) {
    this.scene = scene
  }

  animate(matchCells, target) {
    const points = matchCells.map(({ row, col }) => this.scene.cellCenter(row, col))
    this.scene.animation.animateMix({
      points,
      targetHex: COLORS[target].hex,
      potionKey: this.scene.randomVariantKey(target),
      showRainbow: this.scene.streak >= 4 || this.scene.successes % 8 === 0
    })
  }
}
