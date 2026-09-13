import { WITCH_SKINS } from '../../app/data/witchSkins.js'
import { FLOWER_VARIANTS } from '../assets/flowerAssetCatalog.js'
import { POTION_VARIANTS } from '../assets/potionAssetCatalog.js'
import { CAT_TEXTURES } from '../assets/companionAssetCatalog.js'
import { EFFECT_TEXTURES } from '../assets/effectAssetCatalog.js'
import { AUDIO_CLIPS } from '../assets/audioAssetCatalog.js'

export const MATERIAL_VARIANTS = Object.freeze({
  ...FLOWER_VARIANTS,
  ...POTION_VARIANTS
})

export { CAT_TEXTURES, EFFECT_TEXTURES, AUDIO_CLIPS }

export function pickMaterialVariantKey(colorKey, randomizer) {
  const variants = MATERIAL_VARIANTS[colorKey]
  const fallback = MATERIAL_VARIANTS.red[0].key
  if (!variants || variants.length === 0) return fallback
  if (!randomizer?.pick) return variants[0].key
  return randomizer.pick(variants, variants[0]).key
}

export function preloadAlchemyAssets(scene) {
  Object.values(MATERIAL_VARIANTS).flat().forEach(({ key, src }) => {
    if (!scene.textures.exists(key)) scene.load.image(key, src)
  })
  Object.entries(EFFECT_TEXTURES).forEach(([key, src]) => {
    if (!scene.textures.exists(key)) scene.load.image(key, src)
  })
  Object.entries(CAT_TEXTURES).forEach(([key, src]) => {
    if (!scene.textures.exists(key)) scene.load.image(key, src)
  })
  Object.entries(WITCH_SKINS).forEach(([skinId, assets]) => {
    ;['idle', 'success', 'fail', 'panic'].forEach((mood) => {
      const key = `witch-${skinId}-${mood}`
      if (!scene.textures.exists(key)) scene.load.image(key, assets[mood])
    })
  })
}
