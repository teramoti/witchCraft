/**
 * React側から元PJの`GameManager.ts`を呼び出し、Phaser Canvasを保持します。
 */
import { useEffect, useRef } from 'react'
import type { GameResult, GameSettings } from '../../types/gameTypes'
import { destroyGame, startGame } from '../../../game/GameManager'
import './GameScreen.css'

/** GameScreenへ渡すPropsです。 */
type Props = {
  settings: GameSettings
  onFinish: (result: GameResult) => void
}

/** Phaserの起動と破棄をReactライフサイクルへ同期します。 */
export default function GameScreen({ settings, onFinish }: Props) {
  /** PhaserがCanvasを追加する描画先DOMです。 */
  const ref = useRef<HTMLDivElement | null>(null)

  /** 元PJと同じEventTarget連携を1画面につき1件だけ保持します。 */
  const hudTargetRef = useRef<EventTarget>(new EventTarget())

  /** DOM生成後に元の`startGame(parent, settings, onFinish)`形式で起動します。 */
  useEffect(() => {
    const parent = ref.current
    if (!parent) return undefined

    const startSettings: GameSettings = {
      ...settings,
      difficulty: settings.difficulty ?? 'normal',
      hudTarget: hudTargetRef.current
    }

    let cancelled = false

    startGame(parent, startSettings, (result) => {
      if (!cancelled) {
        onFinish(result)
      }
    })

    /** 画面遷移時は元PJと同じ`destroyGame()`でCanvasとイベントを破棄します。 */
    return () => {
      cancelled = true
      destroyGame()
    }
  }, [onFinish, settings])

  return (
    <main className="witchGameScreen">
      <div className="gameCanvasFrame">
        {/* この要素が`startGame`のparent引数です。 */}
        <div className="gameCanvasHost" ref={ref} />
      </div>
    </main>
  )
}
