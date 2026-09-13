export function playOneShot(src, volume = 0.35) {
  if (!src) return
  try {
    const audio = new Audio(src)
    audio.volume = Math.max(0, Math.min(1, Number(volume) || 0))
    void audio.play().catch(() => undefined)
  } catch {
    // ブラウザの自動再生制限や音声デバイス差異でゲーム進行を止めない。
  }
}
