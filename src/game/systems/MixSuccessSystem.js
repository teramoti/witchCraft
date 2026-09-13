import { AUDIO_CLIPS } from '../config/alchemyAssets.js'
import { calculateMixScore } from '../utilities/AlchemyRules.js'
import { playOneShot } from '../utilities/AudioUtility.js'

export default class MixSuccessSystem {
  constructor(scene) {
    this.scene = scene
  }

  resolve(matchCells) {
    this.scene.streak += 1
    this.scene.maxStreak = Math.max(this.scene.maxStreak, this.scene.streak)
    this.scene.successes += 1
    this.scene.colorMixes[this.scene.target] = (this.scene.colorMixes[this.scene.target] ?? 0) + 1

    if (!this.scene.feverActive) {
      this.scene.feverCharge += 1
      if (this.scene.feverCharge >= 3) this.scene.startFever()
      else if (this.scene.feverBarFill?.active) {
        this.scene.feverBarFill.setScale(this.scene.feverCharge / 3, 1)
      }
    }

    const gained = calculateMixScore({
      target: this.scene.target,
      streak: this.scene.streak,
      feverActive: this.scene.feverActive,
      difficultyMultiplier: this.scene.balance.scoreMultiplier
    })
    this.scene.score += gained

    this.scene.animateMix(matchCells, this.scene.target)
    matchCells.forEach(({ row, col }) => {
      this.scene.rows[row][col] = this.scene.randomBaseColor()
    })

    this.scene.setFeedback(`GOOD MIX!\n+${gained} pt`, '#bfffd0')
    this.scene.setWitchMood('success', 780)
    if (!this.scene.feverActive) this.scene.setCatMood('happy', 620)
    playOneShot(AUDIO_CLIPS.collect, 0.42)

    this.scene.lastTarget = this.scene.target
    this.scene.target = this.scene.pickTarget()
    this.scene.ensureTargetPossible()
    this.scene.renderAllRows()
    this.scene.refreshTargetPanel()
    this.scene.refreshHud()
  }
}
