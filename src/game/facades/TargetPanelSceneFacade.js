export function installTargetPanelSceneFacade(scene) {
  scene.createTargetPanel = () => scene.targetPanelSystem.createTargetPanel()
  scene.refreshTargetPanel = () => scene.targetPanelSystem.refreshTargetPanel()
  scene.setFeedback = (text, color) => scene.targetPanelSystem.setFeedback(text, color)
}
