import BoardLayoutSystem from './BoardLayoutSystem.js'
import BoardRenderSystem from './BoardRenderSystem.js'

export default class BoardViewSystem {
  constructor(scene) {
    this.layout = new BoardLayoutSystem(scene)
    this.render = new BoardRenderSystem(scene)
  }

  createBoardShell() { return this.layout.createBoardShell() }
  createRow(row) { return this.layout.createRow(row) }
  renderAllRows() { return this.render.renderAllRows() }
  renderRow(row) { return this.render.renderRow(row) }
  cellCenter(row, col) { return this.layout.cellCenter(row, col) }
  getView(row, col) { return this.layout.getView(row, col) }
  resetBoardPreviewPositions() { return this.layout.resetBoardPreviewPositions() }
  layoutAdjacentPreview(fromRow, fromCol, toRow, toCol) {
    return this.layout.layoutAdjacentPreview(fromRow, fromCol, toRow, toCol)
  }
}
