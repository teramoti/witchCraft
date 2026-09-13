export function installMixSceneFacade(scene) {
  scene.findMatchAtPosition = (
    row,
    col,
    colorAt = (r, c) => scene.rows[r]?.[c]
  ) => scene.mixFlowSystem.findMatchAtPosition(row, col, colorAt)
  scene.resolveMovedFlower = (row, col) => scene.mixFlowSystem.resolveMovedFlower(row, col)
  scene.handleSuccess = (matchCells) => scene.mixFlowSystem.handleSuccess(matchCells)
  scene.startFever = () => scene.mixFlowSystem.startFever()
  scene.handleMiss = () => scene.mixFlowSystem.handleMiss()
  scene.animateMix = (matchCells, target) => scene.mixFlowSystem.animateMix(matchCells, target)
}
