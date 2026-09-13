export default class MixAnimationUtility {
  constructor(scene) {
    this.scene = scene
  }

  animateMix({ points, targetHex, potionKey, showRainbow = false }) {
    if (!Array.isArray(points) || points.length === 0) return
    const x = points.reduce((sum, point) => sum + point.x, 0) / points.length
    const y = points.reduce((sum, point) => sum + point.y, 0) / points.length

    points.forEach((point) => {
      const ring = this.scene.add.circle(point.x, point.y, 46, targetHex, 0.12)
        .setStrokeStyle(3, targetHex, 0.9)
        .setDepth(28)
      this.scene.tweens.add({
        targets: ring,
        scale: 1.18,
        alpha: 0,
        duration: 260,
        onComplete: () => ring.destroy()
      })
    })

    const flash = this.scene.add.image(x, y, 'effect-gold-burst').setDisplaySize(116, 116).setAlpha(0.9).setDepth(30)
    const generatedMix = this.scene.add.image(x, y, 'effect-generated-mix').setDisplaySize(132, 132).setAlpha(0.56).setDepth(29)
    const petals = this.scene.add.image(x, y, 'effect-generated-petals').setDisplaySize(118, 118).setAlpha(0.42).setDepth(29)
    const potion = this.scene.add.image(x, y, potionKey).setDisplaySize(74, 74).setDepth(31)
    const potionScaleX = potion.scaleX
    const potionScaleY = potion.scaleY
    potion.setScale(potionScaleX * 0.55, potionScaleY * 0.55)

    this.scene.tweens.add({ targets: flash, scale: 1.55, alpha: 0, duration: 420, onComplete: () => flash.destroy() })
    this.scene.tweens.add({ targets: generatedMix, rotation: 0.45, scale: 1.28, alpha: 0, duration: 460, onComplete: () => generatedMix.destroy() })
    this.scene.tweens.add({ targets: petals, y: y - 20, scale: 1.18, alpha: 0, duration: 500, onComplete: () => petals.destroy() })
    this.scene.tweens.add({
      targets: potion,
      scaleX: potionScaleX,
      scaleY: potionScaleY,
      y: y - 26,
      duration: 190,
      ease: 'Back.Out',
      yoyo: true,
      hold: 80,
      onComplete: () => potion.destroy()
    })

    if (showRainbow) {
      const rainbow = this.scene.add.image(x, y, 'effect-rainbow-burst').setDisplaySize(145, 145).setAlpha(0.48).setDepth(29)
      this.scene.tweens.add({
        targets: rainbow,
        rotation: 0.8,
        scale: 1.35,
        alpha: 0,
        duration: 520,
        onComplete: () => rainbow.destroy()
      })
    }
  }
}
