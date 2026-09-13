import { BOARD_LEFT, BOARD_TOP, BOARD_W, ROW_COUNT } from '../config/alchemyConfig.js'

export default class BoardLayoutSystem {
  constructor(scene) { this.scene = scene }

  createBoardShell() {
    const cols = this.scene.balance.cols
    this.scene.cell = Math.min(126, Math.floor((BOARD_W - 46) / cols))
    this.scene.rowWidth = this.scene.cell * cols
    this.scene.rowX = BOARD_LEFT + (BOARD_W - this.scene.rowWidth) / 2
    this.scene.rowStartY = BOARD_TOP + 92
    this.scene.rowGap = 112

    this.scene.rows = Array.from({ length: ROW_COUNT }, () => (
      Array.from({ length: cols }, () => this.scene.randomBaseColor())
    ))

    this.scene.previewGraphics = this.scene.add.graphics().setDepth(18)

    for (let row = 0; row < ROW_COUNT; row += 1) {
      this.scene.createRow(row)
    }

    this.scene.target = this.scene.pickTarget()
    this.scene.ensureTargetPossible()
    this.scene.renderAllRows()
  }

  createRow(row) {
    // 各花そのものに入力を付けます。盤面はベルトではなくグリッドとして扱い、
    // 1回のドラッグで上下左右の隣接1マスとだけ入れ替えます。
    this.scene.rowViews[row] = []
  }

  cellCenter(row, col) {
    return {
      x: this.scene.rowX + col * this.scene.cell + this.scene.cell / 2,
      y: this.scene.rowStartY + row * this.scene.rowGap
    }
  }

  getView(row, col) {
    return (this.scene.rowViews[row] ?? []).find((view) => view.getData('baseIndex') === col) ?? null
  }

  resetBoardPreviewPositions() {
    for (let row = 0; row < ROW_COUNT; row += 1) {
      const views = this.scene.rowViews[row] ?? []
      views.forEach((view) => {
        const col = view.getData('baseIndex')
        const center = this.scene.cellCenter(row, col)
        view.setPosition(center.x, center.y).setDepth(6).setScale(1)
      })
    }
  }

  layoutAdjacentPreview(fromRow, fromCol, toRow, toCol) {
    this.scene.resetBoardPreviewPositions()
    if (fromRow === toRow && fromCol === toCol) return
    if (Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol) !== 1) return

    const moving = this.scene.getView(fromRow, fromCol)
    const displaced = this.scene.getView(toRow, toCol)
    if (!moving || !displaced) return

    const fromCenter = this.scene.cellCenter(fromRow, fromCol)
    const toCenter = this.scene.cellCenter(toRow, toCol)
    moving.setPosition(toCenter.x, toCenter.y).setDepth(22).setScale(1.06)
    displaced.setPosition(fromCenter.x, fromCenter.y).setDepth(12)
  }
}
