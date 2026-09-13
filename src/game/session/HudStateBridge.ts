import { applyHudUpdate } from './GameSessionActions'
import type { GameHudUpdateDetail } from './GameSessionTypes'

let activeHudTarget: EventTarget | null = null
let hudUpdateHandler: EventListener | null = null

export function attachHudStateListener(target: EventTarget): void {
  detachHudStateListener()
  activeHudTarget = target
  hudUpdateHandler = ((event: Event) => {
    const customEvent = event as CustomEvent<GameHudUpdateDetail>
    if (customEvent.detail) applyHudUpdate(customEvent.detail)
  }) as EventListener
  target.addEventListener('game-hud-update', hudUpdateHandler)
}

export function detachHudStateListener(): void {
  if (activeHudTarget && hudUpdateHandler) {
    activeHudTarget.removeEventListener('game-hud-update', hudUpdateHandler)
  }
  activeHudTarget = null
  hudUpdateHandler = null
}
