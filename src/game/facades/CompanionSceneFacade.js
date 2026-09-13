export function installCompanionSceneFacade(scene) {
  scene.setCatMood = (mood = 'idle', duration = 0) => scene.companions?.setCatMood(mood, duration)
  scene.setWitchMood = (mood = 'idle', duration = 760) => scene.companions?.setWitchMood(mood, duration)
}
