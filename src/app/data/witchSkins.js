import burgundyTitle from '../../../assets/Image/witch/burgundy/title.png'
import burgundyIdle from '../../../assets/Image/witch/burgundy/idle.png'
import burgundySuccess from '../../../assets/Image/witch/burgundy/success.png'
import burgundyFail from '../../../assets/Image/witch/burgundy/fail.png'
import burgundyPanic from '../../../assets/Image/witch/burgundy/panic.png'
import burgundyRank1 from '../../../assets/Image/witch/burgundy/rank1.png'
import burgundyRank2 from '../../../assets/Image/witch/burgundy/rank2.png'
import burgundyRank3 from '../../../assets/Image/witch/burgundy/rank3.png'
import burgundyRank4 from '../../../assets/Image/witch/burgundy/rank4.png'

import emeraldTitle from '../../../assets/Image/witch/emerald/title.png'
import emeraldIdle from '../../../assets/Image/witch/emerald/idle.png'
import emeraldSuccess from '../../../assets/Image/witch/emerald/success.png'
import emeraldFail from '../../../assets/Image/witch/emerald/fail.png'
import emeraldPanic from '../../../assets/Image/witch/emerald/panic.png'
import emeraldRank1 from '../../../assets/Image/witch/emerald/rank1.png'
import emeraldRank2 from '../../../assets/Image/witch/emerald/rank2.png'
import emeraldRank3 from '../../../assets/Image/witch/emerald/rank3.png'
import emeraldRank4 from '../../../assets/Image/witch/emerald/rank4.png'

import royalblueTitle from '../../../assets/Image/witch/royalblue/title.png'
import royalblueIdle from '../../../assets/Image/witch/royalblue/idle.png'
import royalblueSuccess from '../../../assets/Image/witch/royalblue/success.png'
import royalblueFail from '../../../assets/Image/witch/royalblue/fail.png'
import royalbluePanic from '../../../assets/Image/witch/royalblue/panic.png'
import royalblueRank1 from '../../../assets/Image/witch/royalblue/rank1.png'
import royalblueRank2 from '../../../assets/Image/witch/royalblue/rank2.png'
import royalblueRank3 from '../../../assets/Image/witch/royalblue/rank3.png'
import royalblueRank4 from '../../../assets/Image/witch/royalblue/rank4.png'

import purpleTitle from '../../../assets/Image/witch/purple/title.png'
import purpleIdle from '../../../assets/Image/witch/purple/idle.png'
import purpleSuccess from '../../../assets/Image/witch/purple/success.png'
import purpleFail from '../../../assets/Image/witch/purple/fail.png'
import purplePanic from '../../../assets/Image/witch/purple/panic.png'
import purpleRank1 from '../../../assets/Image/witch/purple/rank1.png'
import purpleRank2 from '../../../assets/Image/witch/purple/rank2.png'
import purpleRank3 from '../../../assets/Image/witch/purple/rank3.png'
import purpleRank4 from '../../../assets/Image/witch/purple/rank4.png'

import sunflowerTitle from '../../../assets/Image/witch/sunflower/title.png'
import sunflowerIdle from '../../../assets/Image/witch/sunflower/idle.png'
import sunflowerSuccess from '../../../assets/Image/witch/sunflower/success.png'
import sunflowerFail from '../../../assets/Image/witch/sunflower/fail.png'
import sunflowerPanic from '../../../assets/Image/witch/sunflower/panic.png'
import sunflowerRank1 from '../../../assets/Image/witch/sunflower/rank1.png'
import sunflowerRank2 from '../../../assets/Image/witch/sunflower/rank2.png'
import sunflowerRank3 from '../../../assets/Image/witch/sunflower/rank3.png'
import sunflowerRank4 from '../../../assets/Image/witch/sunflower/rank4.png'

import pinkTitle from '../../../assets/Image/witch/pink/title.png'
import pinkIdle from '../../../assets/Image/witch/pink/idle.png'
import pinkSuccess from '../../../assets/Image/witch/pink/success.png'
import pinkFail from '../../../assets/Image/witch/pink/fail.png'
import pinkPanic from '../../../assets/Image/witch/pink/panic.png'
import pinkRank1 from '../../../assets/Image/witch/pink/rank1.png'
import pinkRank2 from '../../../assets/Image/witch/pink/rank2.png'
import pinkRank3 from '../../../assets/Image/witch/pink/rank3.png'
import pinkRank4 from '../../../assets/Image/witch/pink/rank4.png'

import mintTitle from '../../../assets/Image/witch/mint/title.png'
import mintIdle from '../../../assets/Image/witch/mint/idle.png'
import mintSuccess from '../../../assets/Image/witch/mint/success.png'
import mintFail from '../../../assets/Image/witch/mint/fail.png'
import mintPanic from '../../../assets/Image/witch/mint/panic.png'
import mintRank1 from '../../../assets/Image/witch/mint/rank1.png'
import mintRank2 from '../../../assets/Image/witch/mint/rank2.png'
import mintRank3 from '../../../assets/Image/witch/mint/rank3.png'
import mintRank4 from '../../../assets/Image/witch/mint/rank4.png'

import navyTitle from '../../../assets/Image/witch/navy/title.png'
import navyIdle from '../../../assets/Image/witch/navy/idle.png'
import navySuccess from '../../../assets/Image/witch/navy/success.png'
import navyFail from '../../../assets/Image/witch/navy/fail.png'
import navyPanic from '../../../assets/Image/witch/navy/panic.png'
import navyRank1 from '../../../assets/Image/witch/navy/rank1.png'
import navyRank2 from '../../../assets/Image/witch/navy/rank2.png'
import navyRank3 from '../../../assets/Image/witch/navy/rank3.png'
import navyRank4 from '../../../assets/Image/witch/navy/rank4.png'

export const WITCH_SKIN_IDS = Object.freeze([
  'burgundy', 'emerald', 'royalblue', 'purple', 'sunflower', 'pink', 'mint', 'navy'
])

function makeSkin(title, idle, success, fail, panic, rank1, rank2, rank3, rank4) {
  return { title, idle, success, fail, panic, ranks: [rank1, rank2, rank3, rank4] }
}

export const WITCH_SKINS = Object.freeze({
  burgundy: makeSkin(burgundyTitle, burgundyIdle, burgundySuccess, burgundyFail, burgundyPanic, burgundyRank1, burgundyRank2, burgundyRank3, burgundyRank4),
  emerald: makeSkin(emeraldTitle, emeraldIdle, emeraldSuccess, emeraldFail, emeraldPanic, emeraldRank1, emeraldRank2, emeraldRank3, emeraldRank4),
  royalblue: makeSkin(royalblueTitle, royalblueIdle, royalblueSuccess, royalblueFail, royalbluePanic, royalblueRank1, royalblueRank2, royalblueRank3, royalblueRank4),
  purple: makeSkin(purpleTitle, purpleIdle, purpleSuccess, purpleFail, purplePanic, purpleRank1, purpleRank2, purpleRank3, purpleRank4),
  sunflower: makeSkin(sunflowerTitle, sunflowerIdle, sunflowerSuccess, sunflowerFail, sunflowerPanic, sunflowerRank1, sunflowerRank2, sunflowerRank3, sunflowerRank4),
  pink: makeSkin(pinkTitle, pinkIdle, pinkSuccess, pinkFail, pinkPanic, pinkRank1, pinkRank2, pinkRank3, pinkRank4),
  mint: makeSkin(mintTitle, mintIdle, mintSuccess, mintFail, mintPanic, mintRank1, mintRank2, mintRank3, mintRank4),
  navy: makeSkin(navyTitle, navyIdle, navySuccess, navyFail, navyPanic, navyRank1, navyRank2, navyRank3, navyRank4)
})

export function getWitchSkin(id) {
  return WITCH_SKINS[id] ?? WITCH_SKINS.navy
}

export function getRandomWitchSkinId() {
  return WITCH_SKIN_IDS[Math.floor(Math.random() * WITCH_SKIN_IDS.length)]
}
