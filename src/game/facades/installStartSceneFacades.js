import { installBoardSceneFacade } from './BoardSceneFacade.js'
import { installCompanionSceneFacade } from './CompanionSceneFacade.js'
import { installHudSceneFacade } from './HudSceneFacade.js'
import { installInputSceneFacade } from './InputSceneFacade.js'
import { installMixSceneFacade } from './MixSceneFacade.js'
import { installPuzzleSceneFacade } from './PuzzleSceneFacade.js'
import { installRoundSceneFacade } from './RoundSceneFacade.js'
import { installTargetPanelSceneFacade } from './TargetPanelSceneFacade.js'

export function installStartSceneFacades(scene) {
  installCompanionSceneFacade(scene)
  installHudSceneFacade(scene)
  installTargetPanelSceneFacade(scene)
  installBoardSceneFacade(scene)
  installInputSceneFacade(scene)
  installPuzzleSceneFacade(scene)
  installMixSceneFacade(scene)
  installRoundSceneFacade(scene)
}
