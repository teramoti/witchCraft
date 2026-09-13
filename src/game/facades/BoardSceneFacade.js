export function installBoardSceneFacade(scene) {
  scene.createBoardShell = () => scene.boardViewSystem.createBoardShell()
  scene.createRow = (row) => scene.boardViewSystem.createRow(row)
  scene.renderAllRows = () => scene.boardViewSystem.renderAllRows()
  scene.renderRow = (row) => scene.boardViewSystem.renderRow(row)
  scene.cellCenter = (row, col) => scene.boardViewSystem.cellCenter(row, col)
  scene.getView = (row, col) => scene.boardViewSystem.getView(row, col)
  scene.resetBoardPreviewPositions = () => scene.boardViewSystem.resetBoardPreviewPositions()
  scene.layoutAdjacentPreview = (fromRow, fromCol, toRow, toCol) => (
    scene.boardViewSystem.layoutAdjacentPreview(fromRow, fromCol, toRow, toCol)
  )
}
