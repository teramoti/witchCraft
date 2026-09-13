export default class IdleMotionUtility {
  constructor(scene, kill) {
    this.scene = scene
    this.kill = kill
  }

  idleFloat(sprite, { distance = 4, angle = 1, duration = 1000 } = {}) {
    if (!sprite?.active) return null
    this.kill(sprite)
    const baseY = sprite.y
    return this.scene.tweens.add({
      targets: sprite,
      y: baseY - distance,
      angle: { from: -angle, to: angle },
      duration,
      ease: 'Sine.InOut',
      yoyo: true,
      repeat: -1
    })
  }

  breathe(sprite, { scaleY = 0.97, duration = 780 } = {}) {
    if (!sprite?.active) return null
    this.kill(sprite)
    return this.scene.tweens.add({
      targets: sprite,
      scaleY: sprite.scaleY * scaleY,
      duration,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.InOut'
    })
  }
}
