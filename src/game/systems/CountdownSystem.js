import { GAME_H, GAME_W } from '../config/alchemyConfig.js'
import { AUDIO_CLIPS } from '../config/alchemyAssets.js'
import { playOneShot } from '../utilities/AudioUtility.js'

export default class CountdownSystem {
  constructor(scene) { this.scene = scene }

  startCountdown() {
    const veil = this.scene.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x080615, 0.48).setDepth(100)
    const count = this.scene.add.text(GAME_W / 2, GAME_H / 2, '3', {
      fontFamily: 'Georgia', fontSize: '132px', fontStyle: 'bold', color: '#fff1aa', stroke: '#4a2b65', strokeThickness: 8
    }).setOrigin(0.5).setDepth(101)

    let value = 3
    this.scene.time.addEvent({
      delay: 650,
      repeat: 3,
      callback: () => {
        if (value > 1) {
          value -= 1
          count.setText(String(value))
          this.scene.animation.pulse(count, { scale: 1.18, duration: 180 })
          return
        }
        if (value === 1) {
          value = 0
          count.setText('START!').setFontSize(78)
          playOneShot(AUDIO_CLIPS.start, 0.45)
          return
        }
        veil.destroy()
        count.destroy()
        this.scene.roundStarted = true
        this.scene.clockEvent = this.scene.time.addEvent({ delay: 1000, loop: true, callback: () => this.scene.tickClock() })
      }
    })
  }

  tickClock() {
    if (!this.scene.roundStarted || this.scene.turnFinished) return
    this.scene.timeLeft = Math.max(0, this.scene.timeLeft - 1)
    this.scene.refreshHud()
    if (this.scene.timeLeft === 10) this.scene.setWitchMood('panic', 1100)
    if (this.scene.timeLeft <= 0) this.scene.finishTurn()
  }
}
