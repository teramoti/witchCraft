import DragInputSystem from './DragInputSystem.js'
import SlideCommitSystem from './SlideCommitSystem.js'
import SlidePreviewSystem from './SlidePreviewSystem.js'

export default class SlideInputSystem {
  constructor(scene) {
    this.drag = new DragInputSystem(scene)
    this.preview = new SlidePreviewSystem(scene)
    this.commit = new SlideCommitSystem(scene)
  }

  createInputHandlers() { return this.drag.createInputHandlers() }
  updateAdjacentPreview(fromRow, fromCol, toRow, toCol) {
    return this.preview.updateAdjacentPreview(fromRow, fromCol, toRow, toCol)
  }
  commitAdjacentSlide(fromRow, fromCol, toRow, toCol) {
    return this.commit.commitAdjacentSlide(fromRow, fromCol, toRow, toCol)
  }
}
