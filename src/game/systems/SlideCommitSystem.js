export default class SlideCommitSystem {
  constructor(scene) { this.scene = scene }

  commitAdjacentSlide(fromRow, fromCol, toRow, toCol) {
    this.scene.resetBoardPreviewPositions()
    if (fromRow === toRow && fromCol === toCol) return
    if (Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol) !== 1) return
    if (!this.scene.rows[fromRow] || !this.scene.rows[toRow]) return

    const movedColor = this.scene.rows[fromRow][fromCol]
    const displacedColor = this.scene.rows[toRow][toCol]
    if (!movedColor || !displacedColor) return

    this.scene.rows[fromRow][fromCol] = displacedColor
    this.scene.rows[toRow][toCol] = movedColor
    this.scene.moves += 1

    if (fromRow === toRow) this.scene.renderRow(fromRow)
    else {
      this.scene.renderRow(fromRow)
      this.scene.renderRow(toRow)
    }
    this.scene.resolveMovedFlower(toRow, toCol)
  }
}
