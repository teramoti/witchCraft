import Phaser from 'phaser'
import { ROW_COUNT } from '../config/alchemyConfig.js'

export default class DragInputSystem {
  constructor(scene) { this.scene = scene }

  createInputHandlers() {
    this.scene.input.on('pointermove', (pointer) => {
      if (!this.scene.dragState || !pointer.isDown || this.scene.turnFinished) return

      const { fromRow, fromCol, startX, startY } = this.scene.dragState
      const dx = pointer.x - startX
      const dy = pointer.y - startY
      const threshold = Math.max(18, this.scene.cell * 0.22)

      let toRow = fromRow
      let toCol = fromCol
      if (Math.max(Math.abs(dx), Math.abs(dy)) >= threshold) {
        if (Math.abs(dx) >= Math.abs(dy)) toCol += dx >= 0 ? 1 : -1
        else toRow += dy >= 0 ? 1 : -1
      }

      toRow = Phaser.Math.Clamp(toRow, 0, ROW_COUNT - 1)
      toCol = Phaser.Math.Clamp(toCol, 0, this.scene.balance.cols - 1)
      this.scene.dragState.toRow = toRow
      this.scene.dragState.toCol = toCol

      this.scene.layoutAdjacentPreview(fromRow, fromCol, toRow, toCol)
      this.scene.updateAdjacentPreview(fromRow, fromCol, toRow, toCol)
    })

    this.scene.input.on('pointerup', () => {
      if (!this.scene.dragState || this.scene.turnFinished) return
      const { fromRow, fromCol, toRow, toCol } = this.scene.dragState
      this.scene.dragState = null
      this.scene.previewGraphics?.clear()
      this.scene.commitAdjacentSlide(fromRow, fromCol, toRow, toCol)
    })
  }
}
