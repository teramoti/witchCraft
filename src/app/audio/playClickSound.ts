/** UIボタン共通のクリック音を再生します。 */
import clickSound from '../../../assets/audio/click.mp3'

/**
 * クリック音を1回だけ再生します。
 * ブラウザの自動再生制限により失敗しても操作自体は継続します。
 */
export function playClickSound(): void {
  // 操作ごとに短いAudioインスタンスを生成します。
  const audio = new Audio(clickSound)

  // クリック音はループさせません。
  audio.loop = false

  // 再生拒否はUI操作を止める理由にならないため握りつぶします。
  void audio.play().catch(() => {
    // 音声再生不可の環境でも画面遷移を継続します。
  })
}
