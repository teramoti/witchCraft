import { COLORS, ROW_COUNT } from '../config/alchemyConfig.js'
import { AUDIO_CLIPS } from '../config/alchemyAssets.js'
import { playOneShot } from '../utilities/AudioUtility.js'

export default class BoardRenderSystem {
  constructor(scene) { this.scene = scene }

  renderAllRows() {
    for (let row = 0; row < ROW_COUNT; row += 1) this.scene.renderRow(row)
  }

  renderRow(row) {
    this.scene.rowViews[row]?.forEach((view) => view.destroy())
    this.scene.rowViews[row] = []

    const y = this.scene.rowStartY + row * this.scene.rowGap
    this.scene.rows[row].forEach((colorKey, index) => {
      const x = this.scene.rowX + index * this.scene.cell + this.scene.cell / 2
      const group = this.scene.add.container(x, y).setDepth(6)
      const tileSize = Math.min(104, this.scene.cell - 8)

      const shadow = this.scene.add.rectangle(3, 5, tileSize, tileSize, 0x000000, 0.22)
      const tile = this.scene.add.rectangle(0, 0, tileSize, tileSize, 0x15202d, 0.98)
        .setStrokeStyle(1, 0xd6bd86, 0.28)
      const inner = this.scene.add.rectangle(0, 0, tileSize - 8, tileSize - 8, 0x0d1824, 0.35)
        .setStrokeStyle(1, COLORS[colorKey].hex, 0.20)
      const flower = this.scene.add.image(0, -4, this.scene.randomVariantKey(colorKey)).setDisplaySize(tileSize - 18, tileSize - 18)
      const badge = this.scene.add.text(0, tileSize / 2 - 11, COLORS[colorKey].name, {
        fontFamily: 'Yu Gothic, sans-serif', fontSize: '11px', fontStyle: 'bold', color: '#fff8e6',
        backgroundColor: '#171225cc', padding: { x: 6, y: 1 }
      }).setOrigin(0.5)

      group.add([shadow, tile, inner, flower, badge])
      group.setData('baseIndex', index)
      group.setData('row', row)
      group.setData('color', colorKey)
      group.setSize(tileSize, tileSize).setInteractive({ useHandCursor: true })
      group.on('pointerdown', (pointer) => {
        if (!this.scene.roundStarted || this.scene.turnFinished || this.scene.dragState) return
        this.scene.dragState = { fromRow: row, fromCol: index, toRow: row, toCol: index, startX: pointer.x, startY: pointer.y }
        group.setDepth(22)
        playOneShot(AUDIO_CLIPS.click, 0.14)
        this.scene.tweens.add({ targets: group, scale: 1.055, duration: 80 })
      })
      this.scene.rowViews[row].push(group)
    })
  }
}
