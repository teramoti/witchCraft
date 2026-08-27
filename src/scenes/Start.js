import Phaser from 'phaser'

// =============================================================================
// 花染めの錬金ラボ / One-Step Slide Color Puzzle
// -----------------------------------------------------------------------------
// 調整時の要点
// 1) 4段の花パズルから1個をつかみ、上下左右の隣接1マスへだけ動かす
// 2) 移動先の花とは入れ替わる。長距離移動や複数マス移動はしない
// 3) 動かした花がお題レシピの相手と縦横に接した時だけ錬金成功
// 4) EASY/NORMAL/HARDは時間・横幅・使用色数で判断量が変わる
//
// 花画像を増やす: MATERIAL_VARIANTS の同じ色配列へ追加
// レシピを増やす: MIX_TABLE / TARGET_RECIPES を追加
// 難易度を調整: DIFFICULTY の seconds / cols / targets を変更
// =============================================================================
import redFlowerA from '../../assets/Image/alchemy/flowers/01_red_flower_hibiscus.png'
import redFlowerB from '../../assets/Image/alchemy/flowers/11_red_flower_rose.png'
import redFlowerC from '../../assets/Image/alchemy/flowers/18_red_flower_crimson.png'
import blueFlowerA from '../../assets/Image/alchemy/flowers/02_blue_flower_glow.png'
import blueFlowerB from '../../assets/Image/alchemy/flowers/12_blue_flower_bell.png'
import blueFlowerC from '../../assets/Image/alchemy/flowers/19_blue_flower_azure.png'
import yellowFlowerA from '../../assets/Image/alchemy/flowers/03_yellow_flower_basic.png'
import yellowFlowerB from '../../assets/Image/alchemy/flowers/13_yellow_flower_sun.png'
import yellowFlowerC from '../../assets/Image/alchemy/flowers/20_yellow_flower_chrysanthemum.png'
import whiteFlower from '../../assets/Image/alchemy/flowers/25_white_flower_moon.png'
import blackFlower from '../../assets/Image/alchemy/flowers/26_black_flower_night.png'

import purplePotionA from '../../assets/Image/alchemy/potions/04_purple_potion_basic.png'
import purplePotionB from '../../assets/Image/alchemy/potions/14_purple_potion_amethyst.png'
import greenPotionA from '../../assets/Image/alchemy/potions/05_green_potion_basic.png'
import greenPotionB from '../../assets/Image/alchemy/potions/15_green_potion_blossom.png'
import orangePotionA from '../../assets/Image/alchemy/potions/06_orange_potion_basic.png'
import orangePotionB from '../../assets/Image/alchemy/potions/16_orange_potion_honey.png'
import pinkPotion from '../../assets/Image/alchemy/potions/27_pink_potion_rose.png'
import skyPotion from '../../assets/Image/alchemy/potions/28_sky_potion_mist.png'
import creamPotion from '../../assets/Image/alchemy/potions/29_cream_potion_moon.png'
import maroonPotion from '../../assets/Image/alchemy/potions/30_maroon_potion_ember.png'
import navyPotion from '../../assets/Image/alchemy/potions/31_navy_potion_deep.png'
import olivePotion from '../../assets/Image/alchemy/potions/32_olive_potion_moss.png'

import goldBurst from '../../assets/Image/alchemy/effects/09_gold_burst.png'
import rainbowBurst from '../../assets/Image/alchemy/effects/10_rainbow_swirl_burst.png'
import collectSound from '../../assets/audio/collect.wav'
import clickSound from '../../assets/audio/click.mp3'
import startSound from '../../assets/audio/start.wav'
import { WITCH_SKINS } from '../app/data/witchSkins.js'

let runtimeSettings = {
  playerCount: 1,
  difficulty: 'normal',
  speedMode: false,
  playerSkins: ['navy']
}
let runtimeOnFinish = () => undefined

export function configureStartScene(settings, onFinish) {
  runtimeSettings = { ...settings }
  runtimeOnFinish = onFinish
}

const GAME_W = 1600
const GAME_H = 900
const BOARD_LEFT = 90
const BOARD_TOP = 212
const BOARD_W = 1060
const BOARD_H = 590
const PANEL_X = 1190
const PANEL_W = 330
const ROW_COUNT = 4

const COLORS = {
  red: { hex: 0xf0505f, css: '#f0505f', name: '赤' },
  blue: { hex: 0x4c9cff, css: '#4c9cff', name: '青' },
  yellow: { hex: 0xffd84a, css: '#ffd84a', name: '黄' },
  white: { hex: 0xf5f1e8, css: '#f5f1e8', name: '白' },
  black: { hex: 0x4f4758, css: '#4f4758', name: '黒' },
  purple: { hex: 0xa969ff, css: '#a969ff', name: '紫' },
  green: { hex: 0x55d77d, css: '#55d77d', name: '緑' },
  orange: { hex: 0xff963e, css: '#ff963e', name: '橙' },
  pink: { hex: 0xff79ad, css: '#ff79ad', name: '桃' },
  sky: { hex: 0x72d9ff, css: '#72d9ff', name: '水色' },
  cream: { hex: 0xffe6a3, css: '#ffe6a3', name: '淡黄' },
  maroon: { hex: 0x8e3047, css: '#8e3047', name: '深紅' },
  navy: { hex: 0x314a8f, css: '#314a8f', name: '紺' },
  olive: { hex: 0x71843a, css: '#71843a', name: '苔' },
  mud: { hex: 0x6d5a63, css: '#6d5a63', name: '濁り' }
}

const MATERIAL_VARIANTS = {
  red: [
    { key: 'flower-red-a', src: redFlowerA },
    { key: 'flower-red-b', src: redFlowerB },
    { key: 'flower-red-c', src: redFlowerC }
  ],
  blue: [
    { key: 'flower-blue-a', src: blueFlowerA },
    { key: 'flower-blue-b', src: blueFlowerB },
    { key: 'flower-blue-c', src: blueFlowerC }
  ],
  yellow: [
    { key: 'flower-yellow-a', src: yellowFlowerA },
    { key: 'flower-yellow-b', src: yellowFlowerB },
    { key: 'flower-yellow-c', src: yellowFlowerC }
  ],
  white: [{ key: 'flower-white-a', src: whiteFlower }],
  black: [{ key: 'flower-black-a', src: blackFlower }],
  purple: [{ key: 'potion-purple-a', src: purplePotionA }, { key: 'potion-purple-b', src: purplePotionB }],
  green: [{ key: 'potion-green-a', src: greenPotionA }, { key: 'potion-green-b', src: greenPotionB }],
  orange: [{ key: 'potion-orange-a', src: orangePotionA }, { key: 'potion-orange-b', src: orangePotionB }],
  pink: [{ key: 'potion-pink-a', src: pinkPotion }],
  sky: [{ key: 'potion-sky-a', src: skyPotion }],
  cream: [{ key: 'potion-cream-a', src: creamPotion }],
  maroon: [{ key: 'potion-maroon-a', src: maroonPotion }],
  navy: [{ key: 'potion-navy-a', src: navyPotion }],
  olive: [{ key: 'potion-olive-a', src: olivePotion }]
}

const MIX_TABLE = {
  'blue+red': 'purple',
  'blue+yellow': 'green',
  'red+yellow': 'orange',
  'red+white': 'pink',
  'blue+white': 'sky',
  'white+yellow': 'cream',
  'black+red': 'maroon',
  'black+blue': 'navy',
  'black+yellow': 'olive'
}

const TARGET_RECIPES = {
  purple: ['red', 'blue'],
  green: ['blue', 'yellow'],
  orange: ['red', 'yellow'],
  pink: ['red', 'white'],
  sky: ['blue', 'white'],
  cream: ['yellow', 'white'],
  maroon: ['red', 'black'],
  navy: ['blue', 'black'],
  olive: ['yellow', 'black']
}

const BASE_TARGETS = ['purple', 'green', 'orange']
const WHITE_TARGETS = ['pink', 'sky', 'cream']
const BLACK_TARGETS = ['maroon', 'navy', 'olive']

// 難易度は「時間・横幅・色数・ミス時の重さ」だけで差を付けます。
// ルールそのものは全難易度で同じなので、初見でも理解しやすい構成です。
const DIFFICULTY = {
  easy: {
    label: 'EASY', seconds: 60, cols: 5, colors: ['red', 'blue', 'yellow'], targets: BASE_TARGETS,
    accent: 0x69d7a4, accentCss: '#69d7a4', scoreMultiplier: 1.0, missPenalty: 0
  },
  normal: {
    label: 'NORMAL', seconds: 45, cols: 6, colors: ['red', 'blue', 'yellow', 'white'], targets: [...BASE_TARGETS, ...WHITE_TARGETS],
    accent: 0xb47be8, accentCss: '#b47be8', scoreMultiplier: 1.15, missPenalty: 1
  },
  hard: {
    label: 'HARD', seconds: 30, cols: 7, colors: ['red', 'blue', 'yellow', 'white', 'black'], targets: [...BASE_TARGETS, ...WHITE_TARGETS, ...BLACK_TARGETS],
    accent: 0xe97b6c, accentCss: '#e97b6c', scoreMultiplier: 1.35, missPenalty: 2
  },
  phantom: {
    label: 'PHANTOM', seconds: 25, cols: 7, colors: ['red', 'blue', 'yellow', 'white', 'black'], targets: [...BASE_TARGETS, ...WHITE_TARGETS, ...BLACK_TARGETS],
    accent: 0xd45d9b, accentCss: '#d45d9b', scoreMultiplier: 1.5, missPenalty: 2
  }
}

function pairKey(a, b) {
  return [a, b].sort().join('+')
}

function mixColors(a, b) {
  return MIX_TABLE[pairKey(a, b)] ?? null
}

function targetBaseScore(target) {
  if (BLACK_TARGETS.includes(target)) return 170
  if (WHITE_TARGETS.includes(target)) return 135
  return 100
}


export default class Start extends Phaser.Scene {
  constructor(initialData = {}) {
    super({ key: 'Start' })
    runtimeSettings = { ...runtimeSettings, ...initialData }
  }

  init(data) {
    this.settings = runtimeSettings
    this.onFinish = runtimeOnFinish
    this.playerIndex = data.playerIndex ?? 0
    this.results = Array.isArray(data.results) ? [...data.results] : []
    this.difficulty = this.settings?.difficulty ?? 'normal'
    this.balance = DIFFICULTY[this.difficulty] ?? DIFFICULTY.normal

    this.score = 0
    this.timeLeft = this.balance.seconds
    this.turnFinished = false
    this.roundStarted = false
    this.moves = 0
    this.successes = 0
    this.misses = 0
    this.streak = 0
    this.maxStreak = 0
    this.target = null
    this.lastTarget = null
    this.rows = []
    this.rowViews = []
    this.rowZones = []
    this.witchSprite = null
    this.witchIdleTween = null
    this.witchMoodTimer = null
    this.previewGraphics = null
    this.dragState = null
    this.feedbackUntil = 0

    // Phaser の scene.restart() は Scene インスタンスを再利用します。
    // 1P で破棄された Text / Image 参照を残すと、2P 開始時の setText() などで
    // Texture が null の GameObject を触ってクラッシュするため、UI参照を毎ターン初期化します。
    this.playerText = null
    this.scoreText = null
    this.timeText = null
    this.targetCard = null
    this.targetPotion = null
    this.targetTitle = null
    this.recipeContainer = null
    this.feedbackText = null
    this.streakText = null
    this.statsText = null
    this.clockEvent = null

    this.colorMixes = {
      purple: 0, green: 0, orange: 0, pink: 0, sky: 0, cream: 0,
      maroon: 0, navy: 0, olive: 0, mud: 0
    }

    this.rngState = (0x34a91 + this.playerIndex * 991 + this.balance.cols * 71) >>> 0
  }

  preload() {
    Object.values(MATERIAL_VARIANTS).flat().forEach(({ key, src }) => {
      if (!this.textures.exists(key)) this.load.image(key, src)
    })
    this.load.image('effect-gold-burst', goldBurst)
    this.load.image('effect-rainbow-burst', rainbowBurst)
    Object.entries(WITCH_SKINS).forEach(([skinId, assets]) => {
      ;['idle', 'success', 'fail', 'panic'].forEach((mood) => {
        const key = `witch-${skinId}-${mood}`
        if (!this.textures.exists(key)) this.load.image(key, assets[mood])
      })
    })
  }

  create() {
    this.createBackdrop()
    this.createHud()
    this.createBoardShell()
    this.createTargetPanel()
    this.createWitchCompanion()
    this.createInputHandlers()
    this.startCountdown()
  }

  createBackdrop() {
    this.cameras.main.setBackgroundColor('#0b0719')

    // 旧ゲーム画像を使わず、UIと花素材だけで世界観を統一します。
    this.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x0b0719, 1).setDepth(-30)
    this.add.circle(1380, 190, 360, this.balance.accent, 0.07).setDepth(-29)
    this.add.circle(190, 760, 330, 0xff76b1, 0.06).setDepth(-29)

    for (let i = 0; i < 42; i += 1) {
      const star = this.add.circle(this.randInt(30, 1570), this.randInt(30, 870), this.randInt(1, 3), 0xffe8a3, 0.18 + this.random() * 0.28).setDepth(-28)
      this.tweens.add({
        targets: star,
        alpha: { from: star.alpha, to: 0.04 },
        duration: this.randInt(900, 2300),
        yoyo: true,
        repeat: -1,
        delay: this.randInt(0, 900)
      })
    }

    this.add.rectangle(800, 72, 1480, 104, 0x15112d, 0.96).setStrokeStyle(2, 0x7a5f9d, 0.8)
    this.add.rectangle(BOARD_LEFT + BOARD_W / 2, BOARD_TOP + BOARD_H / 2, BOARD_W, BOARD_H, 0x10152d, 0.96)
      .setStrokeStyle(3, this.balance.accent, 0.72)
    this.add.rectangle(PANEL_X + PANEL_W / 2, BOARD_TOP + BOARD_H / 2, PANEL_W, BOARD_H, 0x15112d, 0.96)
      .setStrokeStyle(3, 0x8d72b7, 0.72)
  }

  createHud() {
    this.add.text(68, 38, '花染めの錬金ラボ', {
      fontFamily: 'Yu Gothic, sans-serif', fontSize: '32px', fontStyle: 'bold', color: '#fff1b6'
    })
    this.add.text(69, 74, 'FLOWER DYE ALCHEMY LAB', {
      fontFamily: 'Courier New', fontSize: '12px', fontStyle: 'bold', color: '#bdaae4', letterSpacing: 3
    })

    this.playerText = this.add.text(620, 49, '', {
      fontFamily: 'Courier New', fontSize: '20px', fontStyle: 'bold', color: '#eadcff'
    }).setOrigin(0.5)
    this.scoreText = this.add.text(1038, 47, '', {
      fontFamily: 'Courier New', fontSize: '28px', fontStyle: 'bold', color: '#9ce9ff'
    }).setOrigin(0.5)
    this.timeText = this.add.text(1425, 47, '', {
      fontFamily: 'Courier New', fontSize: '30px', fontStyle: 'bold', color: '#ffd66b'
    }).setOrigin(0.5)

    this.add.text(BOARD_LEFT + 30, 142, '花を上下左右へ1マス動かして、レシピの相手にくっつける', {
      fontFamily: 'Yu Gothic, sans-serif', fontSize: '24px', fontStyle: 'bold', color: '#f7f2ff'
    })
    this.add.text(BOARD_LEFT + 30, 176, '1回の操作は1マスだけ。動かした花が正しい相手と隣り合えば錬金成功！', {
      fontFamily: 'Yu Gothic, sans-serif', fontSize: '16px', color: '#bdaed8'
    })

    this.refreshHud()
  }

  createBoardShell() {
    const cols = this.balance.cols
    this.cell = Math.min(130, Math.floor(850 / cols))
    this.rowWidth = this.cell * cols
    this.rowX = BOARD_LEFT + (BOARD_W - this.rowWidth) / 2 + 10
    this.rowStartY = BOARD_TOP + 92
    this.rowGap = 118

    this.rows = Array.from({ length: ROW_COUNT }, () => (
      Array.from({ length: cols }, () => this.randomBaseColor())
    ))

    this.previewGraphics = this.add.graphics().setDepth(18)

    for (let row = 0; row < ROW_COUNT; row += 1) {
      const y = this.rowStartY + row * this.rowGap
      this.add.rectangle(BOARD_LEFT + BOARD_W / 2, y, BOARD_W - 70, 103, row % 2 === 0 ? 0x1b1938 : 0x17162f, 0.72)
        .setStrokeStyle(1, this.balance.accent, 0.20)
      this.add.text(this.rowX - 24, y, `${row + 1}`, {
        fontFamily: 'Georgia', fontSize: '18px', fontStyle: 'bold', color: this.balance.accentCss
      }).setOrigin(0.5)
      this.createRow(row)
    }

    this.target = this.pickTarget()
    this.ensureTargetPossible()
    this.renderAllRows()
  }

  createRow(row) {
    // 各花そのものに入力を付けます。盤面はベルトではなくグリッドとして扱い、
    // 1回のドラッグで上下左右の隣接1マスとだけ入れ替えます。
    this.rowViews[row] = []
  }

  createTargetPanel() {
    this.add.text(PANEL_X + PANEL_W / 2, BOARD_TOP + 32, 'TODAY’S COLOR', {
      fontFamily: 'Courier New', fontSize: '15px', fontStyle: 'bold', color: '#cbb9ed'
    }).setOrigin(0.5)

    this.targetCard = this.add.rectangle(PANEL_X + PANEL_W / 2, BOARD_TOP + 172, PANEL_W - 50, 232, 0x231a3a, 0.92)
      .setStrokeStyle(2, this.balance.accent, 0.78)

    this.targetPotion = this.add.image(PANEL_X + PANEL_W / 2, BOARD_TOP + 116, this.randomVariantKey('purple'))
      .setDisplaySize(82, 82)

    this.targetTitle = this.add.text(PANEL_X + PANEL_W / 2, BOARD_TOP + 196, '', {
      fontFamily: 'Yu Gothic, sans-serif', fontSize: '32px', fontStyle: 'bold', color: '#ffffff', align: 'center'
    }).setOrigin(0.5)

    this.recipeContainer = this.add.container(PANEL_X + PANEL_W / 2, BOARD_TOP + 258)

    this.add.text(PANEL_X + PANEL_W / 2, BOARD_TOP + 326, 'SLIDE RESULT', {
      fontFamily: 'Courier New', fontSize: '13px', fontStyle: 'bold', color: '#9c89b9'
    }).setOrigin(0.5)

    this.feedbackText = this.add.text(PANEL_X + PANEL_W / 2, BOARD_TOP + 366, '上下左右へ1マス！', {
      fontFamily: 'Yu Gothic, sans-serif', fontSize: '22px', fontStyle: 'bold', color: '#f8f1ff', align: 'center',
      wordWrap: { width: PANEL_W - 54 }
    }).setOrigin(0.5)

    this.streakText = this.add.text(PANEL_X + PANEL_W / 2, BOARD_TOP + 395, 'STREAK 0', {
      fontFamily: 'Courier New', fontSize: '24px', fontStyle: 'bold', color: '#ffd87a'
    }).setOrigin(0.5)

    this.statsText = this.add.text(PANEL_X + PANEL_W / 2, BOARD_TOP + 548, '', {
      fontFamily: 'Courier New', fontSize: '14px', fontStyle: 'bold', color: '#aeecff', align: 'center', lineSpacing: 8
    }).setOrigin(0.5)

    this.refreshTargetPanel()
  }

  createInputHandlers() {
    this.input.on('pointermove', (pointer) => {
      if (!this.dragState || !pointer.isDown || this.turnFinished) return

      const { fromRow, fromCol, startX, startY } = this.dragState
      const dx = pointer.x - startX
      const dy = pointer.y - startY
      const threshold = Math.max(18, this.cell * 0.22)

      let toRow = fromRow
      let toCol = fromCol
      if (Math.max(Math.abs(dx), Math.abs(dy)) >= threshold) {
        if (Math.abs(dx) >= Math.abs(dy)) toCol += dx >= 0 ? 1 : -1
        else toRow += dy >= 0 ? 1 : -1
      }

      toRow = Phaser.Math.Clamp(toRow, 0, ROW_COUNT - 1)
      toCol = Phaser.Math.Clamp(toCol, 0, this.balance.cols - 1)
      this.dragState.toRow = toRow
      this.dragState.toCol = toCol

      this.layoutAdjacentPreview(fromRow, fromCol, toRow, toCol)
      this.updateAdjacentPreview(fromRow, fromCol, toRow, toCol)
    })

    this.input.on('pointerup', () => {
      if (!this.dragState || this.turnFinished) return
      const { fromRow, fromCol, toRow, toCol } = this.dragState
      this.dragState = null
      this.previewGraphics?.clear()
      this.commitAdjacentSlide(fromRow, fromCol, toRow, toCol)
    })
  }

  createWitchCompanion() {
    const skinId = this.settings.playerSkins?.[this.playerIndex] ?? 'navy'
    const key = `witch-${skinId}-idle`
    this.witchSprite = this.add.image(PANEL_X + PANEL_W / 2, BOARD_TOP + 480, key)
      .setDisplaySize(126, 126)
      .setDepth(12)
    this.witchIdleTween = this.tweens.add({
      targets: this.witchSprite,
      y: this.witchSprite.y - 5,
      angle: { from: -1, to: 1 },
      duration: 950,
      ease: 'Sine.InOut',
      yoyo: true,
      repeat: -1
    })
  }

  setWitchMood(mood, duration = 760) {
    if (!this.witchSprite?.active) return
    const skinId = this.settings.playerSkins?.[this.playerIndex] ?? 'navy'
    const normalizedMood = ['idle', 'success', 'fail', 'panic'].includes(mood) ? mood : 'idle'
    this.witchSprite.setTexture(`witch-${skinId}-${normalizedMood}`).setDisplaySize(126, 126)
    this.witchMoodTimer?.remove(false)

    if (normalizedMood === 'success') {
      const baseScaleX = this.witchSprite.scaleX
      const baseScaleY = this.witchSprite.scaleY
      this.tweens.add({
        targets: this.witchSprite,
        scaleX: baseScaleX * 1.08,
        scaleY: baseScaleY * 1.08,
        y: this.witchSprite.y - 10,
        duration: 150,
        yoyo: true,
        ease: 'Back.Out'
      })
    } else if (normalizedMood === 'fail') {
      this.tweens.add({ targets: this.witchSprite, x: this.witchSprite.x - 6, duration: 65, yoyo: true, repeat: 3 })
    } else if (normalizedMood === 'panic') {
      this.tweens.add({ targets: this.witchSprite, angle: { from: -3, to: 3 }, duration: 95, yoyo: true, repeat: 3 })
    }

    if (normalizedMood !== 'idle') {
      this.witchMoodTimer = this.time.delayedCall(duration, () => {
        if (this.turnFinished || !this.witchSprite?.active) return
        const fallback = this.timeLeft <= 10 ? 'panic' : 'idle'
        this.witchSprite.setTexture(`witch-${skinId}-${fallback}`).setDisplaySize(126, 126)
      })
    }
  }

  startCountdown() {
    const veil = this.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x080615, 0.48).setDepth(100)
    const count = this.add.text(GAME_W / 2, GAME_H / 2, '3', {
      fontFamily: 'Georgia', fontSize: '132px', fontStyle: 'bold', color: '#fff1aa', stroke: '#4a2b65', strokeThickness: 8
    }).setOrigin(0.5).setDepth(101)

    let value = 3
    this.time.addEvent({
      delay: 650,
      repeat: 3,
      callback: () => {
        if (value > 1) {
          value -= 1
          count.setText(String(value)).setScale(1.18)
          this.tweens.add({ targets: count, scale: 1, duration: 180 })
          return
        }
        if (value === 1) {
          value = 0
          count.setText('START!').setFontSize(78)
          this.playOneShot(startSound, 0.45)
          return
        }
        veil.destroy()
        count.destroy()
        this.roundStarted = true
        this.clockEvent = this.time.addEvent({ delay: 1000, loop: true, callback: () => this.tickClock() })
      }
    })
  }

  tickClock() {
    if (!this.roundStarted || this.turnFinished) return
    this.timeLeft = Math.max(0, this.timeLeft - 1)
    this.refreshHud()
    if (this.timeLeft === 10) this.setWitchMood('panic', 1100)
    if (this.timeLeft <= 0) this.finishTurn()
  }

  renderAllRows() {
    for (let row = 0; row < ROW_COUNT; row += 1) this.renderRow(row)
  }

  renderRow(row) {
    this.rowViews[row]?.forEach((view) => view.destroy())
    this.rowViews[row] = []

    const y = this.rowStartY + row * this.rowGap
    this.rows[row].forEach((colorKey, index) => {
      const x = this.rowX + index * this.cell + this.cell / 2
      const group = this.add.container(x, y).setDepth(6)

      const shadow = this.add.ellipse(0, 34, 76, 20, 0x000000, 0.22)
      const plate = this.add.circle(0, 0, 44, 0x211a38, 0.90).setStrokeStyle(2, COLORS[colorKey].hex, 0.42)
      const flower = this.add.image(0, -3, this.randomVariantKey(colorKey)).setDisplaySize(78, 78)
      const badge = this.add.text(0, 37, COLORS[colorKey].name, {
        fontFamily: 'Yu Gothic, sans-serif', fontSize: '12px', fontStyle: 'bold', color: '#f7f2ff',
        backgroundColor: '#171225', padding: { x: 7, y: 2 }
      }).setOrigin(0.5)

      group.add([shadow, plate, flower, badge])
      group.setData('baseIndex', index)
      group.setData('row', row)
      group.setData('color', colorKey)
      group.setSize(this.cell - 8, 100).setInteractive({ useHandCursor: true })
      group.on('pointerdown', (pointer) => {
        if (!this.roundStarted || this.turnFinished || this.dragState) return
        this.dragState = {
          fromRow: row,
          fromCol: index,
          toRow: row,
          toCol: index,
          startX: pointer.x,
          startY: pointer.y
        }
        group.setDepth(22)
        this.playOneShot(clickSound, 0.14)
        this.tweens.add({ targets: group, scale: 1.08, duration: 90 })
      })
      this.rowViews[row].push(group)
    })
  }

  cellCenter(row, col) {
    return {
      x: this.rowX + col * this.cell + this.cell / 2,
      y: this.rowStartY + row * this.rowGap
    }
  }

  getView(row, col) {
    return (this.rowViews[row] ?? []).find((view) => view.getData('baseIndex') === col) ?? null
  }

  resetBoardPreviewPositions() {
    for (let row = 0; row < ROW_COUNT; row += 1) {
      const views = this.rowViews[row] ?? []
      views.forEach((view) => {
        const col = view.getData('baseIndex')
        const center = this.cellCenter(row, col)
        view.setPosition(center.x, center.y).setDepth(6).setScale(1)
      })
    }
  }

  layoutAdjacentPreview(fromRow, fromCol, toRow, toCol) {
    this.resetBoardPreviewPositions()
    if (fromRow === toRow && fromCol === toCol) return
    if (Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol) !== 1) return

    const moving = this.getView(fromRow, fromCol)
    const displaced = this.getView(toRow, toCol)
    if (!moving || !displaced) return

    const fromCenter = this.cellCenter(fromRow, fromCol)
    const toCenter = this.cellCenter(toRow, toCol)
    moving.setPosition(toCenter.x, toCenter.y).setDepth(22).setScale(1.06)
    displaced.setPosition(fromCenter.x, fromCenter.y).setDepth(12)
  }

  getNeighborPositions(row, col) {
    const result = []
    if (col > 0) result.push({ row, col: col - 1 })
    if (col < this.balance.cols - 1) result.push({ row, col: col + 1 })
    if (row > 0) result.push({ row: row - 1, col })
    if (row < ROW_COUNT - 1) result.push({ row: row + 1, col })
    return result
  }

  updateAdjacentPreview(fromRow, fromCol, toRow, toCol) {
    if (!this.previewGraphics || !this.target) return
    this.previewGraphics.clear()
    if (fromRow === toRow && fromCol === toCol) return
    if (Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol) !== 1) return

    const movedColor = this.rows[fromRow]?.[fromCol]
    const displacedColor = this.rows[toRow]?.[toCol]
    if (!movedColor || !displacedColor) return

    const previewColorAt = (row, col) => {
      if (row === toRow && col === toCol) return movedColor
      if (row === fromRow && col === fromCol) return displacedColor
      return this.rows[row]?.[col]
    }

    const match = this.getNeighborPositions(toRow, toCol).find((pos) => {
      const neighborColor = previewColorAt(pos.row, pos.col)
      return neighborColor && mixColors(movedColor, neighborColor) === this.target
    })
    if (!match) return

    const a = this.cellCenter(toRow, toCol)
    const b = this.cellCenter(match.row, match.col)
    this.previewGraphics.fillStyle(COLORS[this.target].hex, 0.12)
    this.previewGraphics.lineStyle(4, COLORS[this.target].hex, 0.95)
    this.previewGraphics.fillCircle(a.x, a.y, 50)
    this.previewGraphics.fillCircle(b.x, b.y, 50)
    this.previewGraphics.strokeCircle(a.x, a.y, 50)
    this.previewGraphics.strokeCircle(b.x, b.y, 50)
    this.previewGraphics.lineBetween(a.x, a.y, b.x, b.y)
  }

  commitAdjacentSlide(fromRow, fromCol, toRow, toCol) {
    this.resetBoardPreviewPositions()
    if (fromRow === toRow && fromCol === toCol) return
    if (Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol) !== 1) return
    if (!this.rows[fromRow] || !this.rows[toRow]) return

    const movedColor = this.rows[fromRow][fromCol]
    const displacedColor = this.rows[toRow][toCol]
    if (!movedColor || !displacedColor) return

    this.rows[fromRow][fromCol] = displacedColor
    this.rows[toRow][toCol] = movedColor
    this.moves += 1

    if (fromRow === toRow) this.renderRow(fromRow)
    else {
      this.renderRow(fromRow)
      this.renderRow(toRow)
    }
    this.resolveMovedFlower(toRow, toCol)
  }

  resolveMovedFlower(row, col) {
    const movedColor = this.rows[row]?.[col]
    if (!movedColor) return
    const match = this.getNeighborPositions(row, col).find((pos) => {
      const neighborColor = this.rows[pos.row]?.[pos.col]
      return neighborColor && mixColors(movedColor, neighborColor) === this.target
    })

    if (match) this.handleSuccess(row, col, match.row, match.col)
    else this.handleMiss()
  }

  handleSuccess(rowA, colA, rowB, colB) {
    this.streak += 1
    this.maxStreak = Math.max(this.maxStreak, this.streak)
    this.successes += 1
    this.colorMixes[this.target] = (this.colorMixes[this.target] ?? 0) + 1

    const base = targetBaseScore(this.target)
    const streakBonus = 1 + Math.min(4, this.streak - 1) * 0.12
    const gained = Math.round(base * streakBonus * this.balance.scoreMultiplier)
    this.score += gained

    this.animateMix(rowA, colA, rowB, colB, this.target)
    this.rows[rowA][colA] = this.randomBaseColor()
    this.rows[rowB][colB] = this.randomBaseColor()

    this.setFeedback(`GOOD MIX!
+${gained} pt`, '#bfffd0')
    this.setWitchMood('success', 780)
    this.playOneShot(collectSound, 0.42)

    this.lastTarget = this.target
    this.target = this.pickTarget()
    this.ensureTargetPossible()
    this.renderAllRows()
    this.refreshTargetPanel()
    this.refreshHud()
  }

  handleMiss() {
    this.streak = 0
    this.misses += 1
    this.setWitchMood('fail', 900)
    if (this.balance.missPenalty > 0) {
      this.timeLeft = Math.max(0, this.timeLeft - this.balance.missPenalty)
      this.setFeedback(`NO MIX\n-${this.balance.missPenalty} sec`, '#ffb7c1')
    } else {
      this.setFeedback('NO MIX\nもう一度！', '#ffe0aa')
    }
    this.refreshTargetPanel()
    this.refreshHud()
    if (this.timeLeft <= 0) this.finishTurn()
  }

  animateMix(rowA, colA, rowB, colB, target) {
    const first = this.cellCenter(rowA, colA)
    const second = this.cellCenter(rowB, colB)
    const x = (first.x + second.x) / 2
    const y = (first.y + second.y) / 2

    const flash = this.add.image(x, y, 'effect-gold-burst').setDisplaySize(104, 104).setAlpha(0.9).setDepth(30)
    const potion = this.add.image(x, y, this.randomVariantKey(target)).setDisplaySize(74, 74).setDepth(31)
    const potionScaleX = potion.scaleX
    const potionScaleY = potion.scaleY
    potion.setScale(potionScaleX * 0.55, potionScaleY * 0.55)
    this.tweens.add({ targets: flash, scale: 1.55, alpha: 0, duration: 420, onComplete: () => flash.destroy() })
    this.tweens.add({
      targets: potion,
      scaleX: potionScaleX,
      scaleY: potionScaleY,
      y: y - 26,
      duration: 190,
      ease: 'Back.Out',
      yoyo: true,
      hold: 80,
      onComplete: () => potion.destroy()
    })

    if (this.streak >= 4 || this.successes % 8 === 0) {
      const rainbow = this.add.image(x, y, 'effect-rainbow-burst').setDisplaySize(145, 145).setAlpha(0.48).setDepth(29)
      this.tweens.add({ targets: rainbow, rotation: 0.8, scale: 1.35, alpha: 0, duration: 520, onComplete: () => rainbow.destroy() })
    }
  }

  setFeedback(text, color) {
    this.feedbackText?.setText(text).setColor(color)
    this.feedbackUntil = this.time.now + 900
    this.time.delayedCall(950, () => {
      if (!this.feedbackText || this.turnFinished) return
      if (this.time.now >= this.feedbackUntil) this.feedbackText.setText('上下左右へ1マス！').setColor('#f8f1ff')
    })
  }

  refreshHud() {
    const playerCount = this.settings.playerCount ?? 1
    if (this.playerText?.active) this.playerText.setText(`PLAYER ${this.playerIndex + 1}/${playerCount}   ${this.balance.label}`)
    if (this.scoreText?.active) this.scoreText.setText(`SCORE ${this.score}`)
    if (this.timeText?.active) {
      this.timeText.setText(`TIME ${this.timeLeft}`)
      this.timeText.setColor(this.timeLeft <= 10 ? '#ff7b85' : '#ffd66b')
    }

    if (this.statsText?.active) {
      this.statsText.setText(`MIX ${this.successes}   MOVE ${this.moves}\nMISS ${this.misses}`)
    }
    if (this.streakText?.active) {
      this.streakText.setText(`STREAK ${this.streak}`)
      this.streakText.setColor(this.streak >= 3 ? '#fff08c' : '#ffd87a')
    }

    const hudTarget = this.settings?.hudTarget
    if (hudTarget?.dispatchEvent) {
      hudTarget.dispatchEvent(new CustomEvent('game-hud-update', {
        detail: {
          player: this.playerIndex + 1,
          playerCount,
          score: this.score,
          stars: this.successes,
          distance: this.moves,
          timeLeft: this.timeLeft,
          ammo: this.streak,
          maxAmmo: Math.max(1, this.maxStreak)
        }
      }))
    }
  }

  refreshTargetPanel() {
    if (!this.target) return
    const targetInfo = COLORS[this.target]
    const recipe = TARGET_RECIPES[this.target]
    if (this.targetPotion?.active) this.targetPotion.setTexture(this.randomVariantKey(this.target)).setDisplaySize(82, 82)
    if (this.targetTitle?.active) this.targetTitle.setText(`${targetInfo.name}を作れ！`).setColor('#ffffff')
    if (this.targetCard?.active) this.targetCard.setStrokeStyle(2, targetInfo.hex, 0.92)

    if (!this.recipeContainer?.active) return
    this.recipeContainer.removeAll(true)
    const [a, b] = recipe
    const flowerA = this.add.image(-82, 0, this.randomVariantKey(a)).setDisplaySize(54, 54)
    const plus = this.add.text(-30, 0, '+', { fontFamily: 'Georgia', fontSize: '28px', fontStyle: 'bold', color: '#ffe99c' }).setOrigin(0.5)
    const flowerB = this.add.image(24, 0, this.randomVariantKey(b)).setDisplaySize(54, 54)
    const equal = this.add.text(72, 0, '=', { fontFamily: 'Georgia', fontSize: '24px', fontStyle: 'bold', color: '#ffe99c' }).setOrigin(0.5)
    const dot = this.add.circle(112, 0, 18, targetInfo.hex, 1).setStrokeStyle(2, 0xffffff, 0.45)
    this.recipeContainer?.add([flowerA, plus, flowerB, equal, dot])

    this.refreshHud()
  }

  ensureTargetPossible() {
    const recipe = TARGET_RECIPES[this.target]
    if (!Array.isArray(recipe) || recipe.length < 2) this.target = this.balance.targets[0] ?? 'purple'

    const [needA, needB] = TARGET_RECIPES[this.target] ?? TARGET_RECIPES.purple
    const cols = Math.max(1, Number(this.balance?.cols) || 1)

    if (!Array.isArray(this.rows)) this.rows = []
    for (let row = 0; row < ROW_COUNT; row += 1) {
      if (!Array.isArray(this.rows[row])) this.rows[row] = []
      while (this.rows[row].length < cols) this.rows[row].push(this.randomBaseColor())
      if (this.rows[row].length > cols) this.rows[row].length = cols
    }

    // 1マス移動だけでも必ず解ける仕込みを1箇所作ります。
    // A _ B の形にして、Aを中央へ1マス動かせばレシピが成立します。
    const useVertical = ROW_COUNT >= 3 && this.random() < 0.35
    if (useVertical) {
      const row = this.randInt(0, ROW_COUNT - 3)
      const col = this.randInt(0, cols - 1)
      this.rows[row][col] = needA
      this.rows[row + 2][col] = needB
      this.rows[row + 1][col] = this.randomNonRecipePartner(needA, needB)
      return
    }

    if (cols >= 3) {
      const row = this.randInt(0, ROW_COUNT - 1)
      const col = this.randInt(0, cols - 3)
      this.rows[row][col] = needA
      this.rows[row][col + 2] = needB
      this.rows[row][col + 1] = this.randomNonRecipePartner(needA, needB)
      return
    }

    // 将来盤面幅を2以下にした場合の安全策。
    this.rows[0][0] = needA
    if (cols > 1) this.rows[0][1] = needB
  }

  randomNonRecipePartner(movedColor, recipePartner) {
    const safeColors = this.balance.colors.filter((color) => color !== recipePartner && mixColors(movedColor, color) !== this.target)
    if (safeColors.length === 0) return this.randomBaseColor()
    return safeColors[this.randInt(0, safeColors.length - 1)]
  }

  pickTarget() {
    const choices = this.balance.targets.filter((key) => key !== this.lastTarget)
    const pool = choices.length > 0 ? choices : this.balance.targets
    return pool[this.randInt(0, pool.length - 1)]
  }

  randomBaseColor() {
    return this.balance.colors[this.randInt(0, this.balance.colors.length - 1)]
  }

  randomVariantKey(colorKey) {
    const variants = MATERIAL_VARIANTS[colorKey]
    if (!variants || variants.length === 0) return MATERIAL_VARIANTS.red[0].key
    return variants[this.randInt(0, variants.length - 1)].key
  }

  finishTurn() {
    if (this.turnFinished) return
    this.turnFinished = true
    this.roundStarted = false
    this.setWitchMood('panic', 800)
    if (this.clockEvent) this.clockEvent.remove(false)

    const overlay = this.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x070510, 0.68).setDepth(120)
    const title = this.add.text(GAME_W / 2, GAME_H / 2 - 28, 'TIME UP!', {
      fontFamily: 'Georgia', fontSize: '82px', fontStyle: 'bold', color: '#fff0a4', stroke: '#4b2a64', strokeThickness: 7
    }).setOrigin(0.5).setDepth(121)
    const sub = this.add.text(GAME_W / 2, GAME_H / 2 + 58, `P${this.playerIndex + 1}   ${this.score} pt`, {
      fontFamily: 'Courier New', fontSize: '28px', fontStyle: 'bold', color: '#bfeeff'
    }).setOrigin(0.5).setDepth(121)

    const currentEntry = {
      player: this.playerIndex + 1,
      score: this.score,
      skin: this.settings.playerSkins?.[this.playerIndex],
      stats: {
        stars: this.successes,
        normalStars: this.successes,
        bigStars: this.moves,
        rainbowStars: 0,
        distance: this.moves,
        maxCombo: this.maxStreak,
        hits: this.misses,
        spellCasts: this.successes,
        enemiesDefeated: 0,
        shotsFired: this.moves,
        shotsHit: this.successes,
        starBursts: 0,
        survivedSeconds: this.balance.seconds,
        score: this.score,
        feverCount: 0,
        preparedOrders: 0,
        bloomCount: 0,
        boardRescues: 0,
        colorMixes: { ...this.colorMixes },
        breakdown: {
          starScore: this.score,
          distanceBonus: 0,
          comboBonus: 0,
          survivalBonus: 0,
          spellBonus: 0,
          shootingBonus: 0,
          burstBonus: 0,
          noHitBonus: 0,
          total: this.score
        }
      }
    }

    this.results = [...this.results, currentEntry]
    const nextIndex = this.playerIndex + 1
    const playerCount = this.settings.playerCount ?? 1

    this.time.delayedCall(1200, () => {
      overlay.destroy(); title.destroy(); sub.destroy()
      if (nextIndex < playerCount) {
        this.scene.restart({ playerIndex: nextIndex, results: this.results })
        return
      }
      const ordered = [...this.results].sort((a, b) => b.score - a.score || a.player - b.player)
      this.onFinish({ results: ordered })
    })
  }

  random() {
    this.rngState = (1664525 * this.rngState + 1013904223) >>> 0
    return this.rngState / 4294967296
  }

  randInt(min, max) {
    return Math.floor(this.random() * (max - min + 1)) + min
  }

  playOneShot(src, volume = 0.35) {
    try {
      const audio = new Audio(src)
      audio.volume = volume
      void audio.play().catch(() => undefined)
    } catch {
      // 音声権限やブラウザ差異でゲーム処理を止めないため無視します。
    }
  }
}
