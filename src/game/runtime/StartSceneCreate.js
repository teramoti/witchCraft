import Phaser from 'phaser'
import { BOARD_TOP, PANEL_W, PANEL_X } from '../config/alchemyConfig.js'
import CompanionController from '../systems/CompanionController.js'

export function createStartSceneView(scene) {
  scene.createBackdrop()
  scene.createHud()
  scene.createBoardShell()
  scene.createTargetPanel()

  scene.companions = new CompanionController(scene, {
    panelX: PANEL_X,
    panelWidth: PANEL_W,
    boardTop: BOARD_TOP,
    getSkinId: () => scene.settings.playerSkins?.[scene.playerIndex] ?? 'pink',
    isTurnFinished: () => scene.turnFinished,
    isFeverActive: () => scene.feverActive,
    getTimeLeft: () => scene.timeLeft
  })
  scene.companions.create()
  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => scene.companions?.destroy())

  scene.createInputHandlers()
  scene.startCountdown()
}
