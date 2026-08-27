import type { WitchSkinId } from './witchSkins.js'
export type PlayerSkinId = WitchSkinId
export function createPlayerSkinAssignment(playerCount: number): PlayerSkinId[]
export function getPlayerSkinId(playerNumber: number, assignment?: readonly PlayerSkinId[]): PlayerSkinId
export const PLAYER_SKIN_IDS: readonly PlayerSkinId[]
