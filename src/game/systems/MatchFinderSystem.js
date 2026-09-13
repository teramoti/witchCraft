import { ROW_COUNT } from '../config/alchemyConfig.js'
import { findRecipeMatchAtPosition } from '../utilities/AlchemyRules.js'

export default class MatchFinderSystem {
  constructor(scene) {
    this.scene = scene
  }

  findAt(row, col, colorAt = (r, c) => this.scene.rows[r]?.[c]) {
    return findRecipeMatchAtPosition({
      row,
      col,
      cols: this.scene.balance.cols,
      rowCount: ROW_COUNT,
      target: this.scene.target,
      colorAt
    })
  }
}
