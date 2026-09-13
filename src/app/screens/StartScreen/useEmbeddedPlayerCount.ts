import { useEffect } from 'react'

export function useEmbeddedPlayerCount(
  fixed: boolean,
  setPlayerCount: (count: number) => void
): void {
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type !== 'SET_PLAYER_COUNT' || fixed) return
      const requestedCount = Number(event.data.playerCount)
      if (!Number.isFinite(requestedCount) || requestedCount < 1) return
      setPlayerCount(Math.max(1, Math.min(4, Math.floor(requestedCount))))
    }

    window.parent.postMessage({ type: 'READY' }, '*')
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [fixed, setPlayerCount])
}
