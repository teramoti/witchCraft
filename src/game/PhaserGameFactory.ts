import Phaser from 'phaser'

export function createPhaserGame(parent: HTMLElement, scene: Phaser.Scene): Phaser.Game {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    parent,
    backgroundColor: '#100b2d',
    pixelArt: false,
    roundPixels: false,
    render: {
      antialias: true,
      antialiasGL: true,
      roundPixels: false
    },
    scene
  })
}
