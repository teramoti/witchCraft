import CatCompanionController from './CatCompanionController.js'
import WitchCompanionController from './WitchCompanionController.js'

// 猫と魔女のFacade。
// 猫担当と魔女担当が別ファイルを編集できるよう、個別Controllerへ分離しています。
export default class CompanionController {
  constructor(scene, options) {
    this.cat = new CatCompanionController(scene, options)
    this.witch = new WitchCompanionController(scene, options)
  }

  create() {
    this.witch.create()
    this.cat.create()
  }

  setCatMood(mood = 'idle', duration = 0) {
    this.cat.setMood(mood, duration)
  }

  setWitchMood(mood = 'idle', duration = 760) {
    this.witch.setMood(mood, duration)
  }

  destroy() {
    this.cat.destroy()
    this.witch.destroy()
  }
}
