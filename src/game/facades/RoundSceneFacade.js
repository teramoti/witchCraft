export function installRoundSceneFacade(scene) {
  scene.startCountdown = () => scene.roundFlowSystem.startCountdown()
  scene.tickClock = () => scene.roundFlowSystem.tickClock()
  scene.finishTurn = () => scene.roundFlowSystem.finishTurn()
}
