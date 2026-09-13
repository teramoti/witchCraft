import { useEffect } from 'react'

export function useLoopingAudio(src: string, volume: number): void {
  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = volume

    const play = () => void audio.play().catch(() => undefined)
    play()
    window.addEventListener('pointerdown', play, { once: true })

    return () => {
      window.removeEventListener('pointerdown', play)
      audio.pause()
      audio.currentTime = 0
    }
  }, [src, volume])
}
