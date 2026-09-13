import { useMemo, useState } from 'react'
import startTheme from '../../../../assets/audio/start_theme.wav'
import type { Difficulty, GameSettings } from '../../types/gameTypes'
import { getRandomWitchSkinId, getWitchSkin } from '../../data/witchSkins.js'
import { playClickSound } from '../../audio/playClickSound'
import { useCycledIndex } from '../../hooks/useCycledIndex'
import { useLoopingAudio } from '../../hooks/useLoopingAudio'
import { difficultyInfo, titleCatFrames, type StandardDifficulty } from './startScreenData'
import { getInitialPlayerState } from './initialPlayerState'
import { useEmbeddedPlayerCount } from './useEmbeddedPlayerCount'

export function useStartScreenState(onStart: (settings: GameSettings) => void) {
  const initialPlayerState = useMemo(() => getInitialPlayerState(), [])
  const [playerCount, setPlayerCount] = useState(initialPlayerState.count)
  const [difficulty, setDifficulty] = useState<Difficulty>('normal')
  const [isHowToOpen, setIsHowToOpen] = useState(false)
  const [starting, setStarting] = useState(false)

  const titleSkinId = useMemo(() => getRandomWitchSkinId(), [])
  const titleWitch = useMemo(() => getWitchSkin(titleSkinId), [titleSkinId])
  const titleCatIndex = useCycledIndex(titleCatFrames.length, 1500)

  useEmbeddedPlayerCount(initialPlayerState.fixed, setPlayerCount)
  useLoopingAudio(startTheme, 0.15)

  const selectedDifficulty: StandardDifficulty = difficulty === 'phantom' ? 'hard' : difficulty
  const selectedInfo = difficultyInfo[selectedDifficulty]
  const titleCat = titleCatFrames[titleCatIndex] ?? titleCatFrames[0]

  const beginGame = () => {
    if (starting) return
    playClickSound()
    setStarting(true)
    try {
      onStart({ playerCount, difficulty })
    } catch {
      setStarting(false)
    }
  }

  return {
    playerCount,
    setPlayerCount,
    difficulty,
    setDifficulty,
    isHowToOpen,
    setIsHowToOpen,
    starting,
    initialPlayerState,
    selectedDifficulty,
    selectedInfo,
    titleWitch,
    titleCat,
    beginGame
  }
}
