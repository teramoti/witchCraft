export default class SideStatsView {
  constructor(scene) {
    this.scene = scene
  }

  create() {
    this.scene.statsText = this.scene.add.text(92, 414, '', {
      fontFamily: 'Courier New',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#c3edff',
      align: 'center',
      lineSpacing: 7
    }).setOrigin(0.5)
  }
}
