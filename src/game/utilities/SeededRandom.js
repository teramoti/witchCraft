export default class SeededRandom {
  constructor(seed = 1) {
    this.state = Number(seed) >>> 0
  }

  next() {
    this.state = (1664525 * this.state + 1013904223) >>> 0
    return this.state / 4294967296
  }

  int(min, max) {
    if (!Number.isFinite(min) || !Number.isFinite(max)) return 0
    const lower = Math.ceil(Math.min(min, max))
    const upper = Math.floor(Math.max(min, max))
    return Math.floor(this.next() * (upper - lower + 1)) + lower
  }

  pick(items, fallback = null) {
    if (!Array.isArray(items) || items.length === 0) return fallback
    return items[this.int(0, items.length - 1)]
  }
}
