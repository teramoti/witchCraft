import MixAnimationUtility from './MixAnimationUtility.js'
import SpriteLayoutUtility from './SpriteLayoutUtility.js'
import TweenAnimationUtility from './TweenAnimationUtility.js'

// Sceneから使う演出Facade。レイアウト、Tween、錬金演出は別Utility。
export default class AnimationUtility {
  constructor(scene) {
    this.layout = new SpriteLayoutUtility()
    this.motion = new TweenAnimationUtility(scene)
    this.mix = new MixAnimationUtility(scene)
  }

  kill(target) { return this.motion.kill(target) }
  fitSprite(sprite, maxWidth, maxHeight) { return this.layout.fitSprite(sprite, maxWidth, maxHeight) }
  positionOnBaseline(sprite, x, bottomY) { return this.layout.positionOnBaseline(sprite, x, bottomY) }
  idleFloat(sprite, options) { return this.motion.idleFloat(sprite, options) }
  bounce(sprite, options) { return this.motion.bounce(sprite, options) }
  shakeX(sprite, options) { return this.motion.shakeX(sprite, options) }
  wobble(sprite, options) { return this.motion.wobble(sprite, options) }
  breathe(sprite, options) { return this.motion.breathe(sprite, options) }
  pulse(target, options) { return this.motion.pulse(target, options) }
  animateMix(options) { return this.mix.animateMix(options) }
}
