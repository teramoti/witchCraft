import { BOARD_TOP, PANEL_W, PANEL_X } from '../config/alchemyConfig.js'

export default class TargetStatusView {
  constructor(scene) {
    this.scene = scene
  }

  create() {
    const cx = PANEL_X + PANEL_W / 2

    this.scene.add.text(PANEL_X + 24, BOARD_TOP + 303, 'SLIDE RESULT', {
      fontFamily: 'Courier New',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#ad96c0'
    })

    this.scene.feedbackText = this.scene.add.text(cx, BOARD_TOP + 342, '3つ並べて錬金！', {
      fontFamily: 'Yu Gothic, sans-serif',
      fontSize: '21px',
      fontStyle: 'bold',
      color: '#fff7e0',
      align: 'center',
      wordWrap: { width: PANEL_W - 60 }
    }).setOrigin(0.5)

    this.scene.streakText = this.scene.add.text(cx, BOARD_TOP + 387, 'STREAK 0', {
      fontFamily: 'Georgia',
      fontSize: '23px',
      fontStyle: 'bold',
      color: '#ffd87a'
    }).setOrigin(0.5)
  }
}
