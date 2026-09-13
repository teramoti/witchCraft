import { ROW_COUNT } from '../config/alchemyConfig.js'
import { pickMaterialVariantKey } from '../config/alchemyAssets.js'
import { ensureSolvableTarget, pickBaseColor, pickTarget } from '../utilities/BoardUtility.js'

export default class PuzzleStateSystem {
  constructor(scene) {
    this.scene = scene
  }

  ensureTargetPossible() {
    const result = ensureSolvableTarget({
      rows: this.scene.rows,
      target: this.scene.target,
      balance: this.scene.balance,
      rowCount: ROW_COUNT,
      randomizer: this.scene.randomizer
    })
    this.scene.rows = result.rows
    this.scene.target = result.target
  }

  pickTarget() {
    return pickTarget(this.scene.balance.targets, this.scene.lastTarget, this.scene.randomizer)
  }

  randomBaseColor() {
    return pickBaseColor(this.scene.balance.colors, this.scene.randomizer)
  }

  randomVariantKey(colorKey) {
    return pickMaterialVariantKey(colorKey, this.scene.randomizer)
  }
}
