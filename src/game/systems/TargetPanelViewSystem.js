import FeverHudView from './FeverHudView.js'
import SideStatsView from './SideStatsView.js'
import TargetRecipeCardView from './TargetRecipeCardView.js'
import TargetStatusView from './TargetStatusView.js'

export default class TargetPanelViewSystem {
  constructor(scene) {
    this.recipeCard = new TargetRecipeCardView(scene)
    this.status = new TargetStatusView(scene)
    this.fever = new FeverHudView(scene)
    this.stats = new SideStatsView(scene)
  }

  create() {
    this.recipeCard.create()
    this.status.create()
    this.fever.create()
    this.stats.create()
  }
}
