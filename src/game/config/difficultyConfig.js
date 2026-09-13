import { BASE_TARGETS, BLACK_TARGETS, WHITE_TARGETS } from './recipeConfig.js'

export const DIFFICULTY = Object.freeze({
  easy: Object.freeze({
    label: 'EASY',
    seconds: 60,
    cols: 5,
    colors: Object.freeze(['red', 'blue', 'yellow']),
    targets: BASE_TARGETS,
    accent: 0x69d7a4,
    accentCss: '#69d7a4',
    scoreMultiplier: 1.0,
    missPenalty: 0
  }),
  normal: Object.freeze({
    label: 'NORMAL',
    seconds: 45,
    cols: 6,
    colors: Object.freeze(['red', 'blue', 'yellow', 'white']),
    targets: Object.freeze([...BASE_TARGETS, ...WHITE_TARGETS]),
    accent: 0xb47be8,
    accentCss: '#b47be8',
    scoreMultiplier: 1.15,
    missPenalty: 1
  }),
  hard: Object.freeze({
    label: 'HARD',
    seconds: 30,
    cols: 7,
    colors: Object.freeze(['red', 'blue', 'yellow', 'white', 'black']),
    targets: Object.freeze([...BASE_TARGETS, ...WHITE_TARGETS, ...BLACK_TARGETS]),
    accent: 0xe97b6c,
    accentCss: '#e97b6c',
    scoreMultiplier: 1.35,
    missPenalty: 2
  }),
  phantom: Object.freeze({
    label: 'PHANTOM',
    seconds: 25,
    cols: 7,
    colors: Object.freeze(['red', 'blue', 'yellow', 'white', 'black']),
    targets: Object.freeze([...BASE_TARGETS, ...WHITE_TARGETS, ...BLACK_TARGETS]),
    accent: 0xd45d9b,
    accentCss: '#d45d9b',
    scoreMultiplier: 1.5,
    missPenalty: 2
  })
})
