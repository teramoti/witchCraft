export default class HudRefreshSystem {
  constructor(scene) {
    this.scene = scene
  }

  refresh() {
    const playerCount = this.scene.settings.playerCount ?? 1

    if (this.scene.playerText?.active) {
      this.scene.playerText.setText(
        `PLAYER ${this.scene.playerIndex + 1}/${playerCount}   ${this.scene.balance.label}`
      )
    }
    if (this.scene.scoreText?.active) {
      this.scene.scoreText.setText(`SCORE ${this.scene.score}`)
    }
    if (this.scene.timeText?.active) {
      this.scene.timeText.setText(`TIME ${this.scene.timeLeft}`)
      this.scene.timeText.setColor(this.scene.timeLeft <= 10 ? '#ff7b85' : '#ffd66b')
    }
    if (this.scene.statsText?.active) {
      this.scene.statsText.setText(
        `MIX ${this.scene.successes}   MOVE ${this.scene.moves}\n` +
        `MISS ${this.scene.misses}   FEVER ${this.scene.feverCount}`
      )
    }
    if (this.scene.streakText?.active) {
      this.scene.streakText.setText(`STREAK ${this.scene.streak}`)
      this.scene.streakText.setColor(this.scene.streak >= 3 ? '#fff08c' : '#ffd87a')
    }

    const hudTarget = this.scene.settings?.hudTarget
    if (!hudTarget?.dispatchEvent) return

    hudTarget.dispatchEvent(new CustomEvent('game-hud-update', {
      detail: {
        player: this.scene.playerIndex + 1,
        playerCount,
        score: this.scene.score,
        stars: this.scene.successes,
        distance: this.scene.moves,
        timeLeft: this.scene.timeLeft,
        ammo: this.scene.streak,
        maxAmmo: Math.max(1, this.scene.maxStreak)
      }
    }))
  }
}
