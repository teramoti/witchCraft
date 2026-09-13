import Phaser from 'phaser'
import { preloadAlchemyAssets } from '../game/config/alchemyAssets.js'
import { createStartSceneView } from '../game/runtime/StartSceneCreate.js'
import {
  configureStartScene,
  getStartSceneRuntime,
  mergeStartSceneInitialData
} from '../game/runtime/StartSceneRuntime.js'
import { initializeStartSceneState } from '../game/runtime/StartSceneState.js'
import { createStartSceneSystems } from '../game/runtime/StartSceneSystems.js'

export { configureStartScene }

// Scene本体はPhaser lifecycleだけ。
// 機能実装は runtime / facades / systems / utilities へ分離する。
export default class Start extends Phaser.Scene {
  constructor(initialData = {}) {
    super({ key: 'Start' })
    mergeStartSceneInitialData(initialData)
  }

  init(data) {
    initializeStartSceneState(this, data, getStartSceneRuntime())
    createStartSceneSystems(this)
  }

  preload() {
    preloadAlchemyAssets(this)
  }

  create() {
    createStartSceneView(this)
  }
}
