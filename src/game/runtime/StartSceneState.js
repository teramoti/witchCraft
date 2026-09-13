import { DIFFICULTY } from '../config/alchemyConfig.js'
import AnimationUtility from '../utilities/AnimationUtility.js'
import SeededRandom from '../utilities/SeededRandom.js'

export function initializeStartSceneState(scene, data, runtime) {
  scene.settings = runtime.settings
  scene.onFinish = runtime.onFinish
  scene.playerIndex = data.playerIndex ?? 0
  scene.results = Array.isArray(data.results) ? [...data.results] : []
  scene.difficulty = scene.settings?.difficulty ?? 'normal'
  scene.balance = DIFFICULTY[scene.difficulty] ?? DIFFICULTY.normal

  scene.score = 0
  scene.timeLeft = scene.balance.seconds
  scene.turnFinished = false
  scene.roundStarted = false
  scene.moves = 0
  scene.successes = 0
  scene.misses = 0
  scene.streak = 0
  scene.maxStreak = 0
  scene.target = null
  scene.lastTarget = null
  scene.rows = []
  scene.rowViews = []
  scene.companions = null
  scene.animation = new AnimationUtility(scene)
  scene.feverActive = false
  scene.feverTimer = null
  scene.feverCount = 0
  scene.feverCharge = 0
  scene.feverBarFill = null
  scene.feverText = null
  scene.previewGraphics = null
  scene.dragState = null
  scene.feedbackUntil = 0

  // scene.restart() は Scene インスタンスを再利用するため、
  // 前プレイヤーで破棄済みの GameObject 参照を持ち越さない。
  scene.playerText = null
  scene.scoreText = null
  scene.timeText = null
  scene.targetCard = null
  scene.targetPotion = null
  scene.targetTitle = null
  scene.recipeContainer = null
  scene.feedbackText = null
  scene.streakText = null
  scene.statsText = null
  scene.clockEvent = null

  scene.colorMixes = {
    purple: 0,
    green: 0,
    orange: 0,
    pink: 0,
    sky: 0,
    cream: 0,
    maroon: 0,
    navy: 0,
    olive: 0,
    mud: 0
  }

  scene.randomizer = new SeededRandom((0x34a91 + scene.playerIndex * 991 + scene.balance.cols * 71) >>> 0)
}
