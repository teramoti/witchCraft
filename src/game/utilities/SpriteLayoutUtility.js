export default class SpriteLayoutUtility {
  fitSprite(sprite, maxWidth, maxHeight) {
    if (!sprite?.active) return
    const sourceWidth = Math.max(1, sprite.width || sprite.frame?.realWidth || maxWidth)
    const sourceHeight = Math.max(1, sprite.height || sprite.frame?.realHeight || maxHeight)
    const scale = Math.min(maxWidth / sourceWidth, maxHeight / sourceHeight)
    sprite.setDisplaySize(sourceWidth * scale, sourceHeight * scale)
  }

  positionOnBaseline(sprite, x, bottomY) {
    if (!sprite?.active) return
    sprite.setPosition(x, bottomY - sprite.displayHeight / 2)
  }
}
