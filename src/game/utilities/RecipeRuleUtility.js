import { TARGET_RECIPES } from '../config/recipeConfig.js'

export function recipeSignature(ingredients) {
  return [...ingredients].sort().join('+')
}

export function recipeMatches(colors, target) {
  const recipe = TARGET_RECIPES[target]
  if (!recipe || !Array.isArray(colors) || colors.length !== recipe.length) return false
  return recipeSignature(colors) === recipeSignature(recipe)
}

export function findRecipeMatchAtPosition({ row, col, cols, rowCount, target, colorAt }) {
  const windows = []
  for (let startCol = Math.max(0, col - 2); startCol <= Math.min(col, cols - 3); startCol += 1) {
    windows.push([
      { row, col: startCol },
      { row, col: startCol + 1 },
      { row, col: startCol + 2 }
    ])
  }
  for (let startRow = Math.max(0, row - 2); startRow <= Math.min(row, rowCount - 3); startRow += 1) {
    windows.push([
      { row: startRow, col },
      { row: startRow + 1, col },
      { row: startRow + 2, col }
    ])
  }
  for (const cells of windows) {
    const colors = cells.map((cell) => colorAt(cell.row, cell.col)).filter(Boolean)
    if (colors.length === 3 && recipeMatches(colors, target)) return cells
  }
  return null
}
