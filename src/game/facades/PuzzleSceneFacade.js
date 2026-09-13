export function installPuzzleSceneFacade(scene) {
  scene.ensureTargetPossible = () => scene.puzzleStateSystem.ensureTargetPossible()
  scene.pickTarget = () => scene.puzzleStateSystem.pickTarget()
  scene.randomBaseColor = () => scene.puzzleStateSystem.randomBaseColor()
  scene.randomVariantKey = (colorKey) => scene.puzzleStateSystem.randomVariantKey(colorKey)
}
