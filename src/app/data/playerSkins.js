import { WITCH_SKIN_IDS } from './witchSkins.js'

/** 現在の魔女素材はピンク1種類です。1P～4Pすべて同じ素材を使用します。 */
export const PLAYER_SKIN_IDS = WITCH_SKIN_IDS

/** 指定人数分のスキン割り当てを返します。 */
export function createPlayerSkinAssignment(playerCount) {
  const normalizedCount = Math.max(1, Math.min(4, Math.floor(Number(playerCount) || 1)))
  return Array.from({ length: normalizedCount }, () => 'pink')
}

/** プレイヤー番号から使用するスキンIDを返します。 */
export function getPlayerSkinId(playerNumber, assignment = PLAYER_SKIN_IDS) {
  const index = Math.max(0, Math.floor(Number(playerNumber) || 1) - 1)
  return assignment[index] ?? 'pink'
}
