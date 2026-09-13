export function installHudSceneFacade(scene) {
  scene.createHud = () => scene.hudSystem.createHud()
  scene.refreshHud = () => scene.hudSystem.refreshHud()
}
