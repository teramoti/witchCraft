import BackdropSystem from '../systems/BackdropSystem.js'
import BoardViewSystem from '../systems/BoardViewSystem.js'
import HudSystem from '../systems/HudSystem.js'
import MixFlowSystem from '../systems/MixFlowSystem.js'
import PuzzleStateSystem from '../systems/PuzzleStateSystem.js'
import RoundFlowSystem from '../systems/RoundFlowSystem.js'
import SlideInputSystem from '../systems/SlideInputSystem.js'
import TargetPanelSystem from '../systems/TargetPanelSystem.js'
import { installStartSceneFacades } from '../facades/installStartSceneFacades.js'

export function createStartSceneSystems(scene) {
  scene.backdropSystem = new BackdropSystem(scene)
  scene.hudSystem = new HudSystem(scene)
  scene.targetPanelSystem = new TargetPanelSystem(scene)
  scene.boardViewSystem = new BoardViewSystem(scene)
  scene.slideInputSystem = new SlideInputSystem(scene)
  scene.mixFlowSystem = new MixFlowSystem(scene)
  scene.puzzleStateSystem = new PuzzleStateSystem(scene)
  scene.roundFlowSystem = new RoundFlowSystem(scene)
  installStartSceneFacades(scene)
}
