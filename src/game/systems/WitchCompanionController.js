import SpriteLayoutUtility from '../utilities/SpriteLayoutUtility.js'
import TweenAnimationUtility from '../utilities/TweenAnimationUtility.js'

const WITCH_MOODS = new Set(['idle', 'success', 'fail', 'panic'])

export default class WitchCompanionController {
  constructor(scene, { panelX, panelWidth, boardTop, getSkinId, isTurnFinished, getTimeLeft }) {
    this.scene = scene
    this.layout = new SpriteLayoutUtility()
    this.motion = new TweenAnimationUtility(scene)
    this.panelX = panelX
    this.panelWidth = panelWidth
    this.boardTop = boardTop
    this.getSkinId = getSkinId
    this.isTurnFinished = isTurnFinished
    this.getTimeLeft = getTimeLeft
    this.sprite = null
    this.moodTimer = null
    this.idleTween = null
  }

  create() {
    const key = `witch-${this.getSkinId()}-idle`
    this.sprite = this.scene.add.image(this.panelX + this.panelWidth - 86, this.boardTop + 590, key).setDepth(12)
    this.setMood('idle', 0)
  }

  setMood(mood = 'idle', duration = 760) {
    if (!this.sprite?.active) return
    const normalizedMood = WITCH_MOODS.has(mood) ? mood : 'idle'
    this.clearMotion()

    this.sprite.setAngle(0).setTexture(`witch-${this.getSkinId()}-${normalizedMood}`)
    this.layout.fitSprite(this.sprite, 154, 164)
    this.layout.positionOnBaseline(this.sprite, this.panelX + this.panelWidth - 86, this.boardTop + 674)

    if (normalizedMood === 'idle') {
      this.idleTween = this.motion.idleFloat(this.sprite, { distance: 4, angle: 1, duration: 980 })
    } else if (normalizedMood === 'success') {
      this.motion.bounce(this.sprite, { scale: 1.07, rise: 9, duration: 160 })
    } else if (normalizedMood === 'fail') {
      this.motion.shakeX(this.sprite, { distance: 5, duration: 70, repeat: 3 })
    } else if (normalizedMood === 'panic') {
      this.motion.wobble(this.sprite, { angle: 2.5, duration: 100, repeat: 3 })
    }

    if (normalizedMood !== 'idle' && duration > 0) {
      this.moodTimer = this.scene.time.delayedCall(duration, () => {
        if (this.isTurnFinished() || !this.sprite?.active) return
        this.setMood(this.getTimeLeft() <= 10 ? 'panic' : 'idle', 0)
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
