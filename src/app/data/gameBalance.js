/**
 * React側が開始前に表示する予備時間です。
 * 実際のゲームルールは src/scenes/Start.js の DIFFICULTY が正本です。
 */
export const ROUND_TIME_SECONDS = 60;

/** 旧PJとのimport互換のため残す未使用値です。 */
export const WORLD_WIDTH = 1600;
export const GROUND_TOP = 900;
export const CHUNK_WIDTH = 1600;
export const STAR_BASE_POINTS = { normal: 100 };
export const SPEED_MODE_BALANCE = {
  speedRampPerSecond: 0,
  openingBoostDurationSeconds: 0,
  openingSpeedBonus: 0,
  worldWidth: 1600
};

/** GameManagerの開始時HUD時間だけStart.jsと揃えます。 */
export const DIFFICULTY_BALANCE = {
  easy: { roundTimeSeconds: 60, baseSpeed: 0, maxSpeed: 0, speedRampPerSecond: 0, hitPenaltySeconds: 0, floatDurationMs: 0, comboWindowMs: 0 },
  normal: { roundTimeSeconds: 45, baseSpeed: 0, maxSpeed: 0, speedRampPerSecond: 0, hitPenaltySeconds: 1, floatDurationMs: 0, comboWindowMs: 0 },
  hard: { roundTimeSeconds: 30, baseSpeed: 0, maxSpeed: 0, speedRampPerSecond: 0, hitPenaltySeconds: 2, floatDurationMs: 0, comboWindowMs: 0 },
  phantom: { roundTimeSeconds: 25, baseSpeed: 0, maxSpeed: 0, speedRampPerSecond: 0, hitPenaltySeconds: 2, floatDurationMs: 0, comboWindowMs: 0 }
};
