export default class FeedbackSystem {
  constructor(scene) {
    this.scene = scene
  }

  set(text, color) {
    this.scene.feedbackText?.setText(text).setColor(color)
    this.scene.feedbackUntil = this.scene.time.now + 900

    this.scene.time.delayedCall(950, () => {
      if (!this.scene.feedbackText || this.scene.turnFinished) return
      if (this.scene.time.now < this.scene.feedbackUntil) return
      this.scene.feedbackText
        .setText('3つ並べて錬金！')
        .setColor('#f8f1ff')
    })
  }
}
