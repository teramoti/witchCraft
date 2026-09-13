import pinkTitle from '../../../assets/Image/witch/pink/title.png'
import pinkIdle from '../../../assets/Image/witch/pink/idle.png'
import pinkSuccess from '../../../assets/Image/witch/pink/success.png'
import pinkFail from '../../../assets/Image/witch/pink/fail.png'
import pinkPanic from '../../../assets/Image/witch/pink/panic.png'
import pinkRank1 from '../../../assets/Image/witch/pink/rank1.png'
import pinkRank2 from '../../../assets/Image/witch/pink/rank2.png'
import pinkRank3 from '../../../assets/Image/witch/pink/rank3.png'
import pinkRank4 from '../../../assets/Image/witch/pink/rank4.png'

export const WITCH_SKIN_IDS = Object.freeze(['pink'])

const PINK_WITCH = Object.freeze({
  title: pinkTitle,
  idle: pinkIdle,
  success: pinkSuccess,
  fail: pinkFail,
  panic: pinkPanic,
  ranks: Object.freeze([pinkRank1, pinkRank2, pinkRank3, pinkRank4])
})

export const WITCH_SKINS = Object.freeze({ pink: PINK_WITCH })

export function getWitchSkin() {
  return PINK_WITCH
}

export function getRandomWitchSkinId() {
  return 'pink'
}
