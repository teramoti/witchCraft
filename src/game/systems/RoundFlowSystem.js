import CountdownSystem from './CountdownSystem.js'
import TurnResultSystem from './TurnResultSystem.js'

export default class RoundFlowSystem {
  constructor(scene) {
    this.countdown = new CountdownSystem(scene)
    this.result = new TurnResultSystem(scene)
  }

  startCountdown() { return this.countdown.startCountdown() }
  tickClock() { return this.countdown.tickClock() }
  finishTurn() { return this.result.finishTurn() }
}
