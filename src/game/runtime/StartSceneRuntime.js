let runtimeSettings = {
  playerCount: 1,
  difficulty: 'normal',
  speedMode: false,
  playerSkins: ['pink']
}
let runtimeOnFinish = () => undefined

export function configureStartScene(settings, onFinish) {
  runtimeSettings = { ...settings }
  runtimeOnFinish = onFinish
}

export function getStartSceneRuntime() {
  return {
    settings: runtimeSettings,
    onFinish: runtimeOnFinish
  }
}

export function mergeStartSceneInitialData(initialData = {}) {
  runtimeSettings = { ...runtimeSettings, ...initialData }
}
