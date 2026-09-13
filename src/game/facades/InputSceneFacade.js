export function installInputSceneFacade(scene) {
  scene.createInputHandlers = () => scene.slideInputSystem.createInputHandlers()
  scene.updateAdjacentPreview = (fromRow, fromCol, toRow, toCol) => (
    scene.slideInputSystem.updateAdjacentPreview(fromRow, fromCol, toRow, toCol)
  )
  scene.commitAdjacentSlide = (fromRow, fromCol, toRow, toCol) => (
    scene.slideInputSystem.commitAdjacentSlide(fromRow, fromCol, toRow, toCol)
  )
}
