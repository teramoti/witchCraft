import type { GameResult } from '../../types/gameTypes'

const MIX_COLORS = {
  purple: '#a86cff',
  green: '#52d47b',
  orange: '#ff963e',
  pink: '#ff77ad',
  sky: '#72d9ff',
  cream: '#ffe6a3',
  maroon: '#8e3047',
  navy: '#314a8f',
  olive: '#71843a',
  mud: '#665a63'
} as const

const COLOR_TITLES = {
  purple: '妖精の夜色',
  green: '森の錬金色',
  orange: '夕焼け色',
  pink: '花霞の桃色',
  sky: '朝空のしずく色',
  cream: '月蜜の淡黄色',
  maroon: '深紅の秘薬色',
  navy: '深海の紺色',
  olive: '古森の苔色',
  mud: '禁断のにごり色'
} as const

type MixKey = keyof typeof MIX_COLORS
export type PlayerResult = GameResult['results'][number]

function getMixEntries(result: PlayerResult): Array<[MixKey, number]> {
  const mixes = result.stats?.colorMixes
  if (!mixes) return []
  return (Object.keys(MIX_COLORS) as MixKey[]).map((key) => [key, Number(mixes[key] ?? 0)])
}

export function getMixGradient(result: PlayerResult): string {
  const entries = getMixEntries(result).filter(([, value]) => value > 0)
  const total = entries.reduce((sum, [, value]) => sum + value, 0)
  if (total <= 0) return 'linear-gradient(90deg,#a86cff,#52d47b,#ff963e)'

  let cursor = 0
  const stops = entries.map(([key, value]) => {
    const start = cursor
    cursor += (value / total) * 100
    return `${MIX_COLORS[key]} ${start.toFixed(1)}%, ${MIX_COLORS[key]} ${cursor.toFixed(1)}%`
  })
  return `linear-gradient(90deg,${stops.join(',')})`
}

export function getColorTitle(result: PlayerResult): string {
  const entries = getMixEntries(result)
  const total = entries.reduce((sum, [, value]) => sum + value, 0)
  if (total <= 0) return 'まだ見ぬ錬金色'

  const nonMud = entries.filter(([key]) => key !== 'mud')
  const usedColors = nonMud.filter(([, value]) => value > 0)
  const strongest = Math.max(...usedColors.map(([, value]) => value), 0)
  if (usedColors.length >= 4 && strongest / total < 0.38) return '虹色アルケミスト'

  const sorted = [...entries].sort((a, b) => b[1] - a[1])
  return COLOR_TITLES[sorted[0]?.[0] ?? 'purple']
}
