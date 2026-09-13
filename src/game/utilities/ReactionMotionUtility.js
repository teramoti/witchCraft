export default class ReactionMotionUtility {
  constructor(scene, kill) {
    this.scene = scene
    this.kill = kill
  }

  bounce(sprite, { scale = 1.07, rise = 9, duration = 160 } = {}) {
    if (!sprite?.active) return null
    this.kill(sprite)
    const baseScaleX = sprite.scaleX
    const baseScaleY = sprite.scaleY
    return this.scene.tweens.add({
      targets: sprite,
      scaleX: baseScaleX * scale,
      scaleY: baseScaleY * scale,
      y: sprite.y - rise,
      duration,
      yoyo: true,
      ease: 'Back.Out'
    })
  }

  shakeX(sprite, { distance = 5, duration = 70, repeat = 3 } = {}) {
    if (!sprite?.active) return null
    this.kill(sprite)
    return this.scene.tweens.add({
      targets: sprite,
      x: sprite.x - distance,
      duration,
      yoyo: true,
      repeat
    })
  }

  wobble(sprite, { angle = 2.5, duration = 100, repeat = 3 } = {}) {
    if (!sprite?.active) return null
    this.kill(sprite)
    return this.scene.tweens.add({
      targets: sprite,
      angle: { from: -angle, to: angle },
      duration,
      yoyo: true,
      repeat
    })
  }

  pulse(target, { scale = 1.18, duration = 180 } = {}) {
    if (!target?.active) return null
    target.setScale(scale)
    return this.scene.tweens.add({
      targets: target,
      scale: 1,
      duration
    })
  }
}
