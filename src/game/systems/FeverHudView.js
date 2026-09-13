import { BOARD_TOP, PANEL_W, PANEL_X } from '../config/alchemyConfig.js'

export default class FeverHudView {
  constructor(scene) {
    this.scene = scene
  }

  create() {
    const cx = PANEL_X + PANEL_W / 2

    this.scene.add.text(PANEL_X + 26, BOARD_TOP + 430, 'FEVER', {
      fontFamily: 'Courier New',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#bca5ce'
    })

    this.scene.add.rectangle(
      cx,
      BOARD_TOP + 459,
      PANEL_W - 54,
      16,
      0x0c0a16,
      0.92
    ).setStrokeStyle(1, 0xcaa665, 0.48)

    this.scene.feverBarFill = this.scene.add.rectangle(
      PANEL_X + 27,
      BOARD_TOP + 459,
      PANEL_W - 54,
      12,
      0xd978ff,
      0.92
    ).setOrigin(0, 0.5).setScale(0, 1)

    this.scene.feverText = this.scene.add.text(cx, BOARD_TOP + 484, '3連続で FEVER ×1.5', {
      fontFamily: 'Yu Gothic, sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#cbbbe0'
    }).setOrigin(0.5)
  }
}
