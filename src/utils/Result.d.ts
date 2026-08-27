/** JavaScriptで実装した得点・順位処理をTypeScript側から参照する宣言です。 */
import type { PlayerResult, ScoreBreakdown } from '../app/App'

/** Player番号順のscore配列から、同点を含む競技順位を返します。 */
export function getRanksFromScores(scores: number[]): number[]

/** 現在のコンボ数から星取得時の倍率を返します。 */
export function getComboMultiplier(combo: number): number

/** ラウンド統計から総合得点と内訳を計算します。 */
export function calculateScore(input: {
  starScore: number
  distance: number
  maxCombo: number
  survivedSeconds: number
  spellCasts: number
  enemiesDefeated: number
  shotsFired: number
  shotsHit: number
  starBursts: number
  hits: number
}): ScoreBreakdown

/** ゲーム内Result表示用に2件の結果を比較します。 */
export function comparePlayerResults(a: PlayerResult, b: PlayerResult): number

/** 並び替え済み結果から同点を含む競技順位を返します。 */
export function createCompetitionRanks(results: PlayerResult[]): number[]
