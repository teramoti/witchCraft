export default class FeverSystem {
  constructor(scene) { this.scene = scene }

  startFever() {
    if (this.scene.feverActive || this.scene.turnFinished) return
    this.scene.feverActive = true
    this.scene.feverCount += 1
    this.scene.feverCharge = 0
    this.scene.feverTimer?.remove(false)
    this.scene.feverBarFill?.setScale(1, 1).setFillStyle(0xd978ff, 0.95)
    this.scene.feverText?.setText('FEVER!  6秒間 SCORE ×1.5').setColor('#ffd4ff')
    this.scene.setCatMood('happy', 6000)
    this.scene.setFeedback(`FEVER!\nSCORE ×1.5`, '#ffd2ff')
    if (this.scene.feverBarFill?.active) {
      this.scene.tweens.killTweensOf(this.scene.feverBarFill)
      this.scene.tweens.add({ targets: this.scene.feverBarFill, scaleX: 0, duration: 6000, ease: 'Linear' })
    }
    this.scene.feverTimer = this.scene.time.delayedCall(6000, () => {
      this.scene.feverActive = false
        if (this.scene.feverText?.active) this.scene.feverText.setText('3連続で FEVER ×1.5').setColor('#cbbbe0')
      if (this.scene.feverBarFill?.active) this.scene.feverBarFill.setScale(0, 1)
      this.scene.setCatMood('idle', 0)
    })
  }
}
