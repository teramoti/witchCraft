import FeedbackSystem from './FeedbackSystem.js'
import TargetPanelViewSystem from './TargetPanelViewSystem.js'
import TargetRecipeSystem from './TargetRecipeSystem.js'

export default class TargetPanelSystem {
  constructor(scene) {
    this.view = new TargetPanelViewSystem(scene)
    this.recipe = new TargetRecipeSystem(scene)
    this.feedback = new FeedbackSystem(scene)
  }

  createTargetPanel() {
    this.view.create()
    this.recipe.refresh()
  }

  refreshTargetPanel() {
    return this.recipe.refresh()
  }

  setFeedback(text, color) {
    return this.feedback.set(text, color)
  }
}
