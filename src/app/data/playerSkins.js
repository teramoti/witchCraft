import { WITCH_SKIN_IDS } from './witchSkins.js'

/** 1P～4Pへ重複しない衣装色をランダム割り当てします。候補は8色です。 */
export const PLAYER_SKIN_IDS = WITCH_SKIN_IDS

/** 指定人数分の固定スキン割り当てを返します。 */
export function createPlayerSkinAssignment(playerCount) {
  const normalizedCount = Math.max(1, Math.min(4, Math.floor(Number(playerCount) || 1)))
  const availableSkins = shuffleArray([...PLAYER_SKIN_IDS])
  return availableSkins.slice(0, normalizedCount)
}

function shuffleArray(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]
    result[i] = result[j]
    result[j] = temp
  }
  return result
}

/** プレイヤー番号から使用するスキンIDを返します。 */
export function getPlayerSkinId(playerNumber, assignment = PLAYER_SKIN_IDS) {
  const index = Math.max(0, Math.min(Math.max(0, assignment.length - 1), Math.floor(Number(playerNumber) || 1) - 1))
  return assignment[index] ?? PLAYER_SKIN_IDS[index % PLAYER_SKIN_IDS.length] ?? 'navy'
}
