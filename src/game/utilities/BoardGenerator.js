import { TARGET_RECIPES } from '../config/recipeConfig.js'
import { recipeMatches } from './RecipeRuleUtility.js'
import { pickBaseColor } from './PuzzlePicker.js'

function pickSafeFiller(colors, recipe, target, randomizer) {
  const safeColors = colors.filter((color) => !recipeMatches([recipe[0], recipe[1], color], target) && !recipe.includes(color))
  return pickBaseColor(safeColors.length > 0 ? safeColors : colors, randomizer)
}

export function ensureSolvableTarget({ rows, target, balance, rowCount, randomizer }) {
  const cols = Math.max(1, Number(balance?.cols) || 1)
  const fallbackTarget = balance?.targets?.[0] ?? 'purple'
  const candidateTarget = TARGET_RECIPES[target] ? target : fallbackTarget
  const activeTarget = TARGET_RECIPES[candidateTarget] ? candidateTarget : 'purple'
  const recipe = TARGET_RECIPES[activeTarget]
  const normalizedRows = Array.isArray(rows) ? rows : []

  for (let row = 0; row < rowCount; row += 1) {
    if (!Array.isArray(normalizedRows[row])) normalizedRows[row] = []
    while (normalizedRows[row].length < cols) {
      normalizedRows[row].push(pickBaseColor(balance.colors, randomizer))
    }
    if (normalizedRows[row].length > cols) normalizedRows[row].length = cols
  }

  const counts = recipe.reduce((map, color) => {
    map[color] = (map[color] ?? 0) + 1
    return map
  }, {})
  const duplicated = Object.keys(counts).find((color) => counts[color] >= 2) ?? recipe[0]
  const single = recipe.find((color) => color !== duplicated) ?? recipe[2] ?? duplicated
  const filler = pickSafeFiller(balance.colors, recipe, activeTarget, randomizer)

  if (cols >= 4) {
    const row = randomizer.int(0, rowCount - 1)
    const col = randomizer.int(0, cols - 4)
    normalizedRows[row][col] = duplicated
    normalizedRows[row][col + 1] = duplicated
    normalizedRows[row][col + 2] = filler
    normalizedRows[row][col + 3] = single
  } else {
    normalizedRows[0][0] = recipe[0]
    if (cols > 1) normalizedRows[0][1] = recipe[1]
    if (cols > 2) normalizedRows[0][2] = recipe[2]
  }

  return { rows: normalizedRows, target: activeTarget }
}
