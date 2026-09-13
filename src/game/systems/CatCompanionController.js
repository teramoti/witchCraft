import SpriteLayoutUtility from '../utilities/SpriteLayoutUtility.js'
import TweenAnimationUtility from '../utilities/TweenAnimationUtility.js'

const CAT_MOODS = Object.freeze({
  idle: { key: 'cat-idle-1', maxWidth: 96, maxHeight: 116, animation: 'idle' },
  idle2: { key: 'cat-idle-2', maxWidth: 96, maxHeight: 116, animation: 'idle' },
  walk: { key: 'cat-walk', maxWidth: 122, maxHeight: 100, animation: 'idle' },
  happy: { key: 'cat-happy', maxWidth: 100, maxHeight: 120, animation: 'bounce' },
  pounce: { key: 'cat-happy', maxWidth: 100, maxHeight: 120, animation: 'bounce' },
  surprised: { key: 'cat-surprised', maxWidth: 96, maxHeight: 118, animation: 'wobble' },
  question: { key: 'cat-question', maxWidth: 96, maxHeight: 118, animation: 'wobble' },
  sleep: { key: 'cat-sleep', maxWidth: 126, maxHeight: 80, animation: 'breathe' },
  roll: { key: 'cat-roll', maxWidth: 122, maxHeight: 96, animation: 'wobble' }
})

export default class CatCompanionController {
  constructor(scene, { panelX, boardTop, isTurnFinished, isFeverActive }) {
    this.scene = scene
    this.layout = new SpriteLayoutUtility()
    this.motion = new TweenAnimationUtility(scene)
    this.panelX = panelX
    this.boardTop = boardTop
    this.isTurnFinished = isTurnFinished
    this.isFeverActive = isFeverActive
    this.sprite = null
    this.moodTimer = null
    this.idleTween = null
  }

  create() {
    this.sprite = this.scene.add.image(this.panelX + 84, this.boardTop + 596, 'cat-idle-1').setDepth(13).setAlpha(0.98)
    this.setMood('idle', 0)
  }

  setMood(mood = 'idle', duration = 0) {
    if (!this.sprite?.active) return
    const config = CAT_MOODS[mood] ?? CAT_MOODS.idle
    this.clearMotion()

    this.sprite.setAngle(0).setTexture(config.key)
    this.layout.fitSprite(this.sprite, config.maxWidth, config.maxHeight)
    this.layout.positionOnBaseline(this.sprite, this.panelX + 84, this.boardTop + 666)

    if (config.animation === 'idle') {
      this.idleTween = this.motion.idleFloat(this.sprite, { distance: 4, angle: 1.2, duration: 1120 })
    } else if (config.animation === 'bounce') {
      this.motion.bounce(this.sprite, { scale: 1.08, rise: 8, duration: 140 })
    } else if (config.animation === 'wobble') {
      this.motion.wobble(this.sprite, { angle: 2.2, duration: 90, repeat: 2 })
    } else if (config.animation === 'breathe') {
      this.motion.breathe(this.sprite, { scaleY: 0.97, duration: 780 })
    }

    if (duration > 0) {
      this.moodTimer = this.scene.time.delayedCall(duration, () => {
        if (this.isTurnFinished() || !this.sprite?.active) return
        this.setMood(this.isFeverActive() ? 'happy' : 'idle', 0)
      })
    }
  }

  clearMotion() {
    this.moodTimer?.remove(false)
    this.moodTimer = null
    this.idleTween?.remove?.()
    this.idleTween = null
    this.motion.kill(this.sprite)
  }

  destroy() {
    this.clearMotion()
    this.sprite = null
  }
}
