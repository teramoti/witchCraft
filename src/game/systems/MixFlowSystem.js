import FeverSystem from './FeverSystem.js'
import MixResolutionSystem from './MixResolutionSystem.js'

export default class MixFlowSystem {
  constructor(scene) {
    this.fever = new FeverSystem(scene)
    this.resolution = new MixResolutionSystem(scene)
  }

  findMatchAtPosition(row, col, colorAt) { return this.resolution.findMatchAtPosition(row, col, colorAt) }
  resolveMovedFlower(row, col) { return this.resolution.resolveMovedFlower(row, col) }
  handleSuccess(matchCells) { return this.resolution.handleSuccess(matchCells) }
  startFever() { return this.fever.startFever() }
  handleMiss() { return this.resolution.handleMiss() }
  animateMix(matchCells, target) { return this.resolution.animateMix(matchCells, target) }
}
