export function pickBaseColor(colors, randomizer, fallback = 'red') {
  return randomizer?.pick(colors, fallback) ?? fallback
}

export function pickTarget(targets, lastTarget, randomizer, fallback = 'purple') {
  if (!Array.isArray(targets) || targets.length === 0) return fallback
  const choices = targets.filter((key) => key !== lastTarget)
  return randomizer?.pick(choices.length > 0 ? choices : targets, fallback) ?? fallback
}
