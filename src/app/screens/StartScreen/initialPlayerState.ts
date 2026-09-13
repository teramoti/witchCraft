export type InitialPlayerState = {
  count: number
  fixed: boolean
}

export function getInitialPlayerState(): InitialPlayerState {
  const raw = new URLSearchParams(window.location.search).get('playerCount')
  if (raw === null) return { count: 1, fixed: false }

  const parsed = Number(raw)
  if (!Number.isFinite(parsed) || parsed < 1) return { count: 1, fixed: false }

  return {
    count: Math.max(1, Math.min(4, Math.floor(parsed))),
    fixed: true
  }
}
