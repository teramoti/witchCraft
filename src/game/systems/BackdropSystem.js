import { BOARD_H, BOARD_LEFT, BOARD_TOP, BOARD_W, GAME_H, GAME_W, PANEL_W, PANEL_X } from '../config/alchemyConfig.js'

export default class BackdropSystem {
  constructor(scene) {
    this.scene = scene
  }

  createBackdrop() {
    this.scene.cameras.main.setBackgroundColor('#090714')

    // 夜の錬金工房。旧背景画像には依存せず、盤面とイラストが読める程度に抑えます。
    this.scene.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x090714, 1).setDepth(-40)
    this.scene.add.rectangle(GAME_W / 2, 545, GAME_W, 710, 0x120f1c, 1).setDepth(-39)

    // 窓と月
    this.scene.add.rectangle(1010, 72, 540, 126, 0x101a35, 0.90).setStrokeStyle(2, 0x7c668f, 0.36).setDepth(-38)
    this.scene.add.circle(1115, 55, 28, 0xfff2bf, 0.88).setDepth(-37)
    this.scene.add.circle(1127, 47, 28, 0x101a35, 1).setDepth(-36)
    for (let i = 0; i < 14; i += 1) {
      this.scene.add.circle(795 + this.scene.randomizer.int(0, 470), 20 + this.scene.randomizer.int(0, 92), this.scene.randomizer.int(1, 2), 0xfff1ba, 0.58).setDepth(-36)
    }

    // 左右の棚・机をシルエットで置いて、モックの錬金工房感を作ります。
    this.scene.add.rectangle(68, 455, 106, 650, 0x17101d, 0.96).setStrokeStyle(2, 0x7c5a39, 0.32).setDepth(-35)
    this.scene.add.rectangle(1552, 455, 82, 650, 0x17101d, 0.96).setStrokeStyle(2, 0x7c5a39, 0.32).setDepth(-35)
    ;[250, 430, 610].forEach((y) => {
      this.scene.add.rectangle(68, y, 96, 8, 0x5a3a2c, 0.58).setDepth(-34)
      this.scene.add.rectangle(1552, y, 72, 8, 0x5a3a2c, 0.58).setDepth(-34)
    })
    this.scene.add.rectangle(800, 838, 1600, 124, 0x271812, 0.98).setDepth(-34)
    this.scene.add.rectangle(800, 785, 1600, 16, 0x6a4229, 0.72).setDepth(-33)

    // 棚の小瓶。ゲーム用ポーションを低彩度で背景装飾にも再利用します。
    const decoPotions = ['purple', 'green', 'orange', 'sky', 'cream']
    for (let i = 0; i < 7; i += 1) {
      const sideX = i % 2 === 0 ? 66 : 1550
      const y = 185 + (i % 3) * 180 + this.scene.randomizer.int(-18, 18)
      const key = this.scene.randomVariantKey(decoPotions[i % decoPotions.length])
      this.scene.add.image(sideX, y, key).setDisplaySize(46, 46).setAlpha(0.28).setDepth(-33)
    }

    // 背景の光粒
    for (let i = 0; i < 30; i += 1) {
      const star = this.scene.add.circle(this.scene.randomizer.int(25, 1575), this.scene.randomizer.int(18, 820), this.scene.randomizer.int(1, 3), 0xffe5a2, 0.12 + this.scene.randomizer.next() * 0.20).setDepth(-32)
      this.scene.tweens.add({ targets: star, alpha: { from: star.alpha, to: 0.02 }, duration: this.scene.randomizer.int(1100, 2600), yoyo: true, repeat: -1, delay: this.scene.randomizer.int(0, 900) })
    }

    // 盤面と右パネル。金縁＋暗い木・紙色でモック寄りにします。
    this.scene.add.rectangle(BOARD_LEFT + BOARD_W / 2, BOARD_TOP + BOARD_H / 2, BOARD_W + 14, BOARD_H + 14, 0x221626, 0.98)
      .setStrokeStyle(4, 0xcaa665, 0.88).setDepth(-12)
    this.scene.add.rectangle(BOARD_LEFT + BOARD_W / 2, BOARD_TOP + BOARD_H / 2, BOARD_W, BOARD_H, 0x101a27, 0.97)
      .setStrokeStyle(1, 0xf0d08d, 0.36).setDepth(-11)

    this.scene.add.rectangle(PANEL_X + PANEL_W / 2, BOARD_TOP + BOARD_H / 2, PANEL_W + 12, BOARD_H + 14, 0x211627, 0.98)
      .setStrokeStyle(4, 0xcaa665, 0.78).setDepth(-12)

    // 左の小さな錬金プレート
    this.scene.add.rectangle(92, 335, 126, 286, 0x1b1424, 0.96).setStrokeStyle(2, 0xcaa665, 0.66).setDepth(-10)
    this.scene.add.text(92, 230, 'ALCHEMY', { fontFamily: 'Georgia', fontSize: '13px', fontStyle: 'bold', color: '#d9c08b' }).setOrigin(0.5)
    this.scene.add.text(92, 268, '3 MIX', { fontFamily: 'Georgia', fontSize: '29px', fontStyle: 'bold', color: '#fff0ba' }).setOrigin(0.5)
    this.scene.add.text(92, 320, '1 STEP', { fontFamily: 'Courier New', fontSize: '15px', fontStyle: 'bold', color: '#bdaae4' }).setOrigin(0.5)
    this.scene.add.text(92, 354, 'SLIDE', { fontFamily: 'Courier New', fontSize: '15px', fontStyle: 'bold', color: '#bdaae4' }).setOrigin(0.5)
  }
}
