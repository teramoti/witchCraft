import { buildTurnResultEntry } from './TurnResultBuilder.js'
import TurnTransitionSystem from './TurnTransitionSystem.js'

export default class TurnResultSystem {
  constructor(scene) {
    this.scene = scene
    this.transition = new TurnTransitionSystem(scene)
  }

  finishTurn() {
    if (this.scene.turnFinished) return

    this.scene.turnFinished = true
    this.scene.roundStarted = false
    this.scene.setWitchMood('panic', 800)
    this.scene.setCatMood('sleep', 0)
    this.scene.clockEvent?.remove(false)

    const currentEntry = buildTurnResultEntry(this.scene)
    this.scene.results = [...this.scene.results, currentEntry]
    this.transition.showAndContinue()
  }
}
