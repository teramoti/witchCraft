export type WitchSkinId = 'pink'
export type WitchSkinAssets = {
  title: string
  idle: string
  success: string
  fail: string
  panic: string
  ranks: readonly [string, string, string, string]
}
export const WITCH_SKIN_IDS: readonly WitchSkinId[]
export const WITCH_SKINS: Readonly<Record<WitchSkinId, WitchSkinAssets>>
export function getWitchSkin(id?: string): WitchSkinAssets
export function getRandomWitchSkinId(): WitchSkinId
