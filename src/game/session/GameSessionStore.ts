import { createInitialSessionState } from './GameSessionFactory'
import type { GameSessionState } from './GameSessionTypes'

export type { GameHudUpdateDetail, GameSessionState } from './GameSessionTypes'

const subscribers = new Set<(state: GameSessionState) => void>()
let state: GameSessionState = createInitialSessionState(1)

function snapshot(): GameSessionState {
  return {
    ...state,
    playerScores: [...state.playerScores],
    playerSkins: [...state.playerSkins],
    completedResults: [...state.completedResults]
  }
}

function publish(): void {
  const current = snapshot()
  subscribers.forEach((subscriber) => subscriber(current))
}

export function getGameSessionState(): GameSessionState {
  return snapshot()
}

export function replaceSessionState(next: GameSessionState): void {
  state = next
  publish()
}

export function updateSessionState(
  updater: (current: GameSessionState) => GameSessionState
): void {
  state = updater(state)
  publish()
}

export function subscribeGameSession(
  subscriber: (state: GameSessionState) => void
): () => void {
  subscribers.add(subscriber)
  subscriber(snapshot())
  return () => subscribers.delete(subscriber)
}

export function resetGameSession(): void {
  state = createInitialSessionState(1)
  publish()
}
