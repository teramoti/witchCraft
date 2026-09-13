import HudCreateSystem from './HudCreateSystem.js'
import HudRefreshSystem from './HudRefreshSystem.js'

export default class HudSystem {
  constructor(scene) {
    this.createSystem = new HudCreateSystem(scene)
    this.refreshSystem = new HudRefreshSystem(scene)
  }

  createHud() {
    this.createSystem.create()
    this.refreshSystem.refresh()
  }

  refreshHud() {
    return this.refreshSystem.refresh()
  }
}
