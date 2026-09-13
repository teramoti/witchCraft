import { useRef } from 'react'
import type { GameSettings } from '../../types/gameTypes'
import { useMenuKeyboardNavigation } from '../../hooks/useMenuKeyboardNavigation'
import DifficultySelector from './components/DifficultySelector'
import HowToModal from './components/HowToModal'
import PlayerSelector from './components/PlayerSelector'
import RecipePreview from './components/RecipePreview'
import TitleHero from './components/TitleHero'
import { useStartScreenState } from './useStartScreenState'
import './StartScreen.css'
import './components/Controls.css'

type Props = {
  onStart: (settings: GameSettings) => void
}

export default function StartScreen({ onStart }: Props) {
  const screenRef = useRef<HTMLElement | null>(null)
  useMenuKeyboardNavigation(screenRef)

  const state = useStartScreenState(onStart)

  return (
    <main className="flowerAlchemyStart" ref={screenRef}>
      <div className="flowerAlchemyGlow glowOne" aria-hidden="true" />
      <div className="flowerAlchemyGlow glowTwo" aria-hidden="true" />

      <section className="flowerAlchemyShell">
        <div className="flowerAlchemyLeft">
          <div className="flowerAlchemyBrand">
            <p>FLOWER DYE ALCHEMY LAB</p>
            <h1>花染めの<br />錬金ラボ</h1>
            <strong>花を上下左右へ1マス動かして、3つの色を錬金レシピ通りにそろえよう！</strong>
          </div>

          <RecipePreview />

          <div className="flowerLoopSummary">
            <b>レシピを見る</b><span>→</span><b>花をつかむ</b><span>→</span>
            <b>1マス入れ替え</b><span>→</span><b>3つで錬金</b>
          </div>

          <div className="flowerStartControls">
            <PlayerSelector
              playerCount={state.playerCount}
              fixed={state.initialPlayerState.fixed}
              onChange={state.setPlayerCount}
            />
            <DifficultySelector
              selectedDifficulty={state.selectedDifficulty}
              selectedInfo={state.selectedInfo}
              onChange={state.setDifficulty}
            />

            <div className="flowerStartActions">
              <button type="button" className="flowerHowTo" onClick={() => state.setIsHowToOpen(true)}>
                遊び方
              </button>
              <button
                type="button"
                className="flowerStartButton"
                data-menu-default
                onClick={state.beginGame}
                disabled={state.starting}
              >
                {state.starting ? '準備中…' : 'はじめる'}
              </button>
            </div>
          </div>
        </div>

        <TitleHero
          selectedInfo={state.selectedInfo}
          witchSrc={state.titleWitch.title}
          cat={state.titleCat}
        />
      </section>

      {state.isHowToOpen && <HowToModal onClose={() => state.setIsHowToOpen(false)} />}
    </main>
  )
}
