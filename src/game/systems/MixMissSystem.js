export default class MixMissSystem {
  constructor(scene) {
    this.scene = scene
  }

  resolve() {
    this.scene.streak = 0
    this.scene.misses += 1

    if (!this.scene.feverActive) {
      this.scene.feverCharge = 0
      this.scene.feverBarFill?.setScale(0, 1)
    }

    this.scene.setWitchMood('fail', 900)
    if (this.scene.balance.missPenalty > 0) {
      this.scene.timeLeft = Math.max(0, this.scene.timeLeft - this.scene.balance.missPenalty)
      this.scene.setFeedback(`NO MIX\n-${this.scene.balance.missPenalty} sec`, '#ffb7c1')
    } else {
      this.scene.setFeedback('NO MIX\nもう一度！', '#ffe0aa')
    }

    this.scene.setCatMood(this.scene.misses % 2 === 0 ? 'question' : 'surprised', 700)
    this.scene.refreshTargetPanel()
    this.scene.refreshHud()
    if (this.scene.timeLeft <= 0) this.scene.finishTurn()
  }
}
