export function buildTurnResultEntry(scene) {
  return {
    player: scene.playerIndex + 1,
    score: scene.score,
    skin: scene.settings.playerSkins?.[scene.playerIndex],
    stats: {
      stars: scene.successes,
      normalStars: scene.successes,
      bigStars: scene.moves,
      rainbowStars: 0,
      distance: scene.moves,
      maxCombo: scene.maxStreak,
      hits: scene.misses,
      spellCasts: scene.successes,
      enemiesDefeated: 0,
      shotsFired: scene.moves,
      shotsHit: scene.successes,
      starBursts: 0,
      survivedSeconds: scene.balance.seconds,
      score: scene.score,
      feverCount: scene.feverCount,
      preparedOrders: 0,
      bloomCount: 0,
      boardRescues: 0,
      colorMixes: { ...scene.colorMixes },
      breakdown: {
        starScore: scene.score,
        distanceBonus: 0,
        comboBonus: 0,
        survivalBonus: 0,
        spellBonus: 0,
        shootingBonus: 0,
        burstBonus: 0,
        noHitBonus: 0,
        total: scene.score
      }
    }
  }
}
