export default class HudHeaderView {
  constructor(scene) {
    this.scene = scene
  }

  create() {
    this.scene.add.text(112, 42, '花染めの錬金ラボ', {
      fontFamily: 'Yu Mincho, Georgia, serif',
      fontSize: '40px',
      fontStyle: 'bold',
      color: '#ffe5a6',
      stroke: '#4e2c34',
      strokeThickness: 3
    })

    this.scene.add.text(116, 88, 'FLOWER DYE ALCHEMY LAB', {
      fontFamily: 'Courier New',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#d7c4ea',
      letterSpacing: 3
    })

    this.scene.playerText = this.scene.add.text(648, 58, '', {
      fontFamily: 'Courier New',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#eadcff'
    }).setOrigin(0.5)

    this.scene.scoreText = this.scene.add.text(1015, 58, '', {
      fontFamily: 'Georgia',
      fontSize: '31px',
      fontStyle: 'bold',
      color: '#ffe59a'
    }).setOrigin(0.5)

    this.scene.timeText = this.scene.add.text(1420, 58, '', {
      fontFamily: 'Georgia',
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#ffd66b'
    }).setOrigin(0.5)
  }
}
