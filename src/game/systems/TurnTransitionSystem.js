import { GAME_H, GAME_W } from '../config/alchemyConfig.js'

export default class TurnTransitionSystem {
  constructor(scene) {
    this.scene = scene
  }

  showAndContinue() {
    const overlay = this.scene.add.rectangle(
      GAME_W / 2,
      GAME_H / 2,
      GAME_W,
      GAME_H,
      0x070510,
      0.68
    ).setDepth(120)

    const title = this.scene.add.text(GAME_W / 2, GAME_H / 2 - 28, 'TIME UP!', {
      fontFamily: 'Georgia',
      fontSize: '82px',
      fontStyle: 'bold',
      color: '#fff0a4',
      stroke: '#4b2a64',
      strokeThickness: 7
    }).setOrigin(0.5).setDepth(121)

    const sub = this.scene.add.text(
      GAME_W / 2,
      GAME_H / 2 + 58,
      `P${this.scene.playerIndex + 1}   ${this.scene.score} pt`,
      {
        fontFamily: 'Courier New',
        fontSize: '28px',
        fontStyle: 'bold',
        color: '#bfeeff'
      }
    ).setOrigin(0.5).setDepth(121)

    const nextIndex = this.scene.playerIndex + 1
    const playerCount = this.scene.settings.playerCount ?? 1

    this.scene.time.delayedCall(1200, () => {
      overlay.destroy()
      title.destroy()
      sub.destroy()

      if (nextIndex < playerCount) {
        this.scene.scene.restart({
          playerIndex: nextIndex,
          results: this.scene.results
        })
        return
      }

      const ordered = [...this.scene.results].sort(
        (a, b) => b.score - a.score || a.player - b.player
      )
      this.scene.onFinish({ results: ordered })
    })
  }
}
