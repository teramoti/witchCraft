import { useEffect, useMemo, useRef, useState } from 'react'
import redFlower from '../../../../assets/Image/alchemy/flowers/11_red_flower_rose.png'
import blueFlower from '../../../../assets/Image/alchemy/flowers/12_blue_flower_bell.png'
import yellowFlower from '../../../../assets/Image/alchemy/flowers/13_yellow_flower_sun.png'
import whiteFlower from '../../../../assets/Image/alchemy/flowers/25_white_flower_moon.png'
import blackFlower from '../../../../assets/Image/alchemy/flowers/26_black_flower_night.png'
import purpleDye from '../../../../assets/Image/alchemy/potions/14_purple_potion_amethyst.png'
import greenDye from '../../../../assets/Image/alchemy/potions/15_green_potion_blossom.png'
import orangeDye from '../../../../assets/Image/alchemy/potions/16_orange_potion_honey.png'
import startTheme from '../../../../assets/audio/start_theme.wav'
import type { Difficulty, GameSettings } from '../../App'
import { playClickSound } from '../../audio/playClickSound'
import { getRandomWitchSkinId, getWitchSkin } from '../../data/witchSkins.js'
import { useMenuKeyboardNavigation } from '../../hooks/useMenuKeyboardNavigation'
import './StartScreen.css'

type Props = { onStart: (settings: GameSettings) => void }
type InitialPlayerState = { count: number; fixed: boolean }

type DifficultyInfo = {
  name: string
  seconds: number
  colors: number
  board: string
  belts: number
  multiplier: string
  description: string
}

function getInitialPlayerState(): InitialPlayerState {
  const raw = new URLSearchParams(window.location.search).get('playerCount')
  if (raw === null) return { count: 1, fixed: false }
  const parsed = Number(raw)
  if (!Number.isFinite(parsed) || parsed < 1) return { count: 1, fixed: false }
  return { count: Math.max(1, Math.min(4, Math.floor(parsed))), fixed: true }
}

const difficultyInfo: Record<'easy' | 'normal' | 'hard', DifficultyInfo> = {
  easy: {
    name: 'EASY', seconds: 60, colors: 3, board: '5×4', belts: 4, multiplier: '×1.00',
    description: '赤・青・黄の3色。花を横へ動かして、正しい相手にくっつける。'
  },
  normal: {
    name: 'NORMAL', seconds: 45, colors: 4, board: '6×4', belts: 4, multiplier: '×1.15',
    description: '白が追加。横幅が伸び、どの花をどこへ差し込むかの判断が増える。'
  },
  hard: {
    name: 'HARD', seconds: 30, colors: 5, board: '7×4', belts: 4, multiplier: '×1.35',
    description: '黒まで追加。7列から正しい相手を探し、短時間で並び替える。'
  }
}

const standardDifficulties: Array<'easy' | 'normal' | 'hard'> = ['easy', 'normal', 'hard']

export default function StartScreen({ onStart }: Props) {
  const initialPlayerState = useMemo(() => getInitialPlayerState(), [])
  const [playerCount, setPlayerCount] = useState(initialPlayerState.count)
  const [difficulty, setDifficulty] = useState<Difficulty>('normal')
  const [isHowToOpen, setIsHowToOpen] = useState(false)
  const [starting, setStarting] = useState(false)
  const titleSkinId = useMemo(() => getRandomWitchSkinId(), [])
  const titleWitch = useMemo(() => getWitchSkin(titleSkinId), [titleSkinId])
  const screenRef = useRef<HTMLElement | null>(null)
  useMenuKeyboardNavigation(screenRef)

  const selectedDifficulty = difficulty === 'phantom' ? 'hard' : difficulty
  const selectedInfo = difficultyInfo[selectedDifficulty]

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type !== 'SET_PLAYER_COUNT' || initialPlayerState.fixed) return
      const requestedCount = Number(event.data.playerCount)
      if (!Number.isFinite(requestedCount) || requestedCount < 1) return
      setPlayerCount(Math.max(1, Math.min(4, Math.floor(requestedCount))))
    }
    window.parent.postMessage({ type: 'READY' }, '*')
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [initialPlayerState.fixed])

  useEffect(() => {
    const audio = new Audio(startTheme)
    audio.loop = true
    audio.volume = 0.15
    const play = () => void audio.play().catch(() => undefined)
    play()
    window.addEventListener('pointerdown', play, { once: true })
    return () => {
      window.removeEventListener('pointerdown', play)
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

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

  return (
    <main className="flowerAlchemyStart" ref={screenRef}>
      <div className="flowerAlchemyGlow glowOne" aria-hidden="true" />
      <div className="flowerAlchemyGlow glowTwo" aria-hidden="true" />

      <section className="flowerAlchemyShell">
        <div className="flowerAlchemyLeft">
          <div className="flowerAlchemyBrand">
            <p>FLOWER DYE ALCHEMY LAB</p>
            <h1>花染めの<br />錬金ラボ</h1>
            <strong>花を上下左右へ1マス動かして、レシピの相手にくっつけよう！</strong>
          </div>

          <div className="flowerRecipePreview" aria-label="基本レシピ">
            <div><img src={redFlower} alt="赤い花" /><span>＋</span><img src={blueFlower} alt="青い花" /><span>＝</span><img src={purpleDye} alt="紫の染料" /></div>
            <div><img src={blueFlower} alt="青い花" /><span>＋</span><img src={yellowFlower} alt="黄色い花" /><span>＝</span><img src={greenDye} alt="緑の染料" /></div>
            <div><img src={redFlower} alt="赤い花" /><span>＋</span><img src={yellowFlower} alt="黄色い花" /><span>＝</span><img src={orangeDye} alt="橙の染料" /></div>
          </div>

          <div className="flowerLoopSummary">
            <b>お題を見る</b><span>→</span><b>花をつかむ</b><span>→</span><b>上下左右へ1マス</b><span>→</span><b>錬金</b>
          </div>

          <div className="flowerStartControls">
            <div className="flowerControlBlock">
              <label>PLAYERS</label>
              <div className="flowerPlayerButtons">
                {[1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    type="button"
                    className={playerCount === count ? 'selected' : ''}
                    disabled={initialPlayerState.fixed}
                    onClick={() => { playClickSound(); setPlayerCount(count) }}
                  >{count}P</button>
                ))}
              </div>
            </div>

            <div className="flowerControlBlock">
              <label>DIFFICULTY</label>
              <div className="flowerDifficultyButtons">
                {standardDifficulties.map((level) => {
                  const info = difficultyInfo[level]
                  return (
                    <button
                      key={level}
                      type="button"
                      className={`${selectedDifficulty === level ? 'selected ' : ''}difficulty-${level}`}
                      onClick={() => { playClickSound(); setDifficulty(level) }}
                    >
                      <b>{info.name}</b>
                      <small>{info.seconds}秒　{info.board}　{info.colors}色</small>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className={`flowerDifficultyDetail difficulty-${selectedDifficulty}`}>
              <div className="flowerDifficultyStats">
                <span><b>{selectedInfo.seconds}</b> SEC</span>
                <span><b>{selectedInfo.colors}</b> COLORS</span>
                <span><b>{selectedInfo.board}</b> BOARD</span>
                <span><b>{selectedInfo.belts}</b> ROWS</span>
                <span><b>{selectedInfo.multiplier}</b> SCORE</span>
              </div>
              <p>{selectedInfo.description}</p>
              <div className="flowerDifficultyPalette" aria-hidden="true">
                <img src={redFlower} alt="" /><img src={blueFlower} alt="" /><img src={yellowFlower} alt="" />
                {selectedInfo.colors >= 4 && <img src={whiteFlower} alt="" />}
                {selectedInfo.colors >= 5 && <img src={blackFlower} alt="" />}
              </div>
            </div>

            <div className="flowerStartActions">
              <button type="button" className="flowerHowTo" onClick={() => setIsHowToOpen(true)}>遊び方</button>
              <button type="button" className="flowerStartButton" data-menu-default onClick={beginGame} disabled={starting}>
                {starting ? '準備中…' : 'はじめる'}
              </button>
            </div>
          </div>
        </div>

        <div className="flowerAlchemyHero" aria-hidden="true">
          <div className="flowerHeroMagicRing" />
          <img className="flowerTitleWitch" src={titleWitch.title} alt="" />
          <span className="flowerHeroSpark sparkA">✦</span>
          <span className="flowerHeroSpark sparkB">✧</span>
          <span className="flowerHeroSpark sparkC">✦</span>
          <div className="flowerHeroCaption">
            <span>{selectedInfo.seconds}秒で何色作れる？</span>
            <b>{selectedInfo.board} / 1マススライド錬金</b>
          </div>
        </div>
      </section>

      {isHowToOpen && (
        <div className="flowerModal" role="dialog" aria-modal="true" aria-label="遊び方">
          <section>
            <button className="flowerModalClose" type="button" onClick={() => setIsHowToOpen(false)}>×</button>
            <p>HOW TO PLAY</p>
            <h2>花を上下左右へ1マス動かして、正しい2色を隣り合わせる</h2>
            <div className="flowerHowToSteps compact">
              <article><b>1</b><strong>お題を見る</strong><span>紫なら赤＋青。右側に今作る色とレシピが表示されます。</span></article>
              <article><b>2</b><strong>上下左右へ1マス</strong><span>ドラッグした方向の隣接1マスとだけ入れ替わります。長距離移動はできません。</span></article>
              <article><b>3</b><strong>相手にくっつけて錬金</strong><span>動かした花がレシピの相手と縦横に隣り合った時だけ成功。適当な移動では得点しません。</span></article>
            </div>
            <div className="flowerHowToNote">お題と合わない移動は連続成功が切れます。NORMAL/HARDは時間も減るので、どの花を1マス動かすか考えるのがコツです。</div>
          </section>
        </div>
      )}
    </main>
  )
}
