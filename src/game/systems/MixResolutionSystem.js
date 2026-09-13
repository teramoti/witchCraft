import MatchFinderSystem from './MatchFinderSystem.js'
import MixMissSystem from './MixMissSystem.js'
import MixPresentationSystem from './MixPresentationSystem.js'
import MixSuccessSystem from './MixSuccessSystem.js'

export default class MixResolutionSystem {
  constructor(scene) {
    this.scene = scene
    this.matchFinder = new MatchFinderSystem(scene)
    this.success = new MixSuccessSystem(scene)
    this.miss = new MixMissSystem(scene)
    this.presentation = new MixPresentationSystem(scene)
  }

  findMatchAtPosition(row, col, colorAt) {
    return this.matchFinder.findAt(row, col, colorAt)
  }

  resolveMovedFlower(row, col) {
    const movedColor = this.scene.rows[row]?.[col]
    if (!movedColor) return
    const matchCells = this.findMatchAtPosition(row, col)
    if (matchCells) this.handleSuccess(matchCells)
    else this.handleMiss()
  }

  handleSuccess(matchCells) {
    return this.success.resolve(matchCells)
  }

  handleMiss() {
    return this.miss.resolve()
  }

  animateMix(matchCells, target) {
    return this.presentation.animate(matchCells, target)
  }
}
