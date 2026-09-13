import HudHeaderView from './HudHeaderView.js'
import HudInstructionView from './HudInstructionView.js'

export default class HudCreateSystem {
  constructor(scene) {
    this.header = new HudHeaderView(scene)
    this.instructions = new HudInstructionView(scene)
  }

  create() {
    this.header.create()
    this.instructions.create()
  }
}
