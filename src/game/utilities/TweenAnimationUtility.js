import IdleMotionUtility from './IdleMotionUtility.js'
import ReactionMotionUtility from './ReactionMotionUtility.js'

export default class TweenAnimationUtility {
  constructor(scene) {
    this.scene = scene
    const kill = (target) => this.kill(target)
    this.idle = new IdleMotionUtility(scene, kill)
    this.reaction = new ReactionMotionUtility(scene, kill)
  }

  kill(target) {
    if (!target) return
    this.scene.tweens.killTweensOf(target)
  }

  idleFloat(sprite, options) {
    return this.idle.idleFloat(sprite, options)
  }

  breathe(sprite, options) {
    return this.idle.breathe(sprite, options)
  }

  bounce(sprite, options) {
    return this.reaction.bounce(sprite, options)
  }

  shakeX(sprite, options) {
    return this.reaction.shakeX(sprite, options)
  }

  wobble(sprite, options) {
    return this.reaction.wobble(sprite, options)
  }

  pulse(target, options) {
    return this.reaction.pulse(target, options)
  }
}
