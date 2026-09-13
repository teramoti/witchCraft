import { COLORS } from '../config/alchemyConfig.js'

export default class SlidePreviewSystem {
  constructor(scene) { this.scene = scene }

  updateAdjacentPreview(fromRow, fromCol, toRow, toCol) {
    if (!this.scene.previewGraphics || !this.scene.target) return
    this.scene.previewGraphics.clear()
    if (fromRow === toRow && fromCol === toCol) return
    if (Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol) !== 1) return

    const movedColor = this.scene.rows[fromRow]?.[fromCol]
    const displacedColor = this.scene.rows[toRow]?.[toCol]
    if (!movedColor || !displacedColor) return

    const previewColorAt = (row, col) => {
      if (row === toRow && col === toCol) return movedColor
      if (row === fromRow && col === fromCol) return displacedColor
      return this.scene.rows[row]?.[col]
    }

    const matchCells = this.scene.findMatchAtPosition(toRow, toCol, (row, col) => previewColorAt(row, col))
    if (!matchCells) return

    this.scene.previewGraphics.fillStyle(COLORS[this.scene.target].hex, 0.12)
    this.scene.previewGraphics.lineStyle(4, COLORS[this.scene.target].hex, 0.95)
    matchCells.forEach((cell) => {
      const point = this.scene.cellCenter(cell.row, cell.col)
      this.scene.previewGraphics.fillCircle(point.x, point.y, 50)
      this.scene.previewGraphics.strokeCircle(point.x, point.y, 50)
    })
    for (let index = 0; index < matchCells.length - 1; index += 1) {
      const a = this.scene.cellCenter(matchCells[index].row, matchCells[index].col)
      const b = this.scene.cellCenter(matchCells[index + 1].row, matchCells[index + 1].col)
      this.scene.previewGraphics.lineBetween(a.x, a.y, b.x, b.y)
    }
  }
}
