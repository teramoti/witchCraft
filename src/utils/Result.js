/**
 * ゲーム終了時の得点計算と順位決定をまとめたJavaScriptユーティリティです。
 *
 * `getRanksFromScores`は元PJの親連携で使用する関数です。
 * ランナー固有の比較関数を追加しても、親PJへ送る順位はこの関数で計算します。
 */

/**
 * 元PJと同じ形式で、プレイヤー番号順のscore配列から競技順位を返します。
 *
 * 例: [100, 80, 80, 40] -> [1, 2, 2, 4]
 */
export function getRanksFromScores(scores) {
    if (!Array.isArray(scores)) {
        throw new TypeError('scores must be an array');
    }

    const indexedScores = scores.map((score, index) => {
        if (typeof score !== 'number' || Number.isNaN(score)) {
            throw new TypeError('scores must contain only numbers');
        }

        return { index, score };
    });

    indexedScores.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }

        return a.index - b.index;
    });

    const ranks = new Array(scores.length);
    let currentRank = 0;
    let previousScore = null;

    indexedScores.forEach((entry, sortedIndex) => {
        if (previousScore === null || entry.score !== previousScore) {
            currentRank = sortedIndex + 1;
            previousScore = entry.score;
        }

        ranks[entry.index] = currentRank;
    });

    return ranks;
}

/** 現在のコンボ数から星取得倍率を返します。 */
export function getComboMultiplier(combo) {
    const step = Math.floor(Math.max(0, combo - 1) / 5);
    return Math.min(3, 1 + step * 0.25);
}

/** ラウンド終了時の総合得点と内訳を返します。 */
export function calculateScore(input) {
    const distanceBonus = Math.max(0, Math.floor(input.distance * 0.6));
    const comboBonus = Math.max(0, input.maxCombo * 30);
    const survivalBonus = Math.max(0, Math.floor(input.survivedSeconds) * 20);
    const spellBonus = Math.max(0, input.spellCasts * 500);
    const shotAccuracy = input.shotsFired > 0
        ? Math.min(1, input.shotsHit / input.shotsFired)
        : 0;
    const shootingBonus = Math.max(
        0,
        input.enemiesDefeated * 350 + Math.floor(input.shotsHit * 80 * shotAccuracy)
    );
    const burstBonus = Math.max(0, input.starBursts * 600);
    const noHitBonus = input.hits === 0 ? 1000 : 0;
    const total = input.starScore
        + distanceBonus
        + comboBonus
        + survivalBonus
        + spellBonus
        + shootingBonus
        + burstBonus
        + noHitBonus;

    return {
        starScore: input.starScore,
        distanceBonus,
        comboBonus,
        survivalBonus,
        spellBonus,
        shootingBonus,
        burstBonus,
        noHitBonus,
        total
    };
}

/** ゲーム内リザルト表示用に、得点・星・距離・番号の順で比較します。 */
export function comparePlayerResults(a, b) {
    if (b.score !== a.score)
        return b.score - a.score;
    if ((b.stats?.stars ?? 0) !== (a.stats?.stars ?? 0))
        return (b.stats?.stars ?? 0) - (a.stats?.stars ?? 0);
    if ((b.stats?.distance ?? 0) !== (a.stats?.distance ?? 0))
        return (b.stats?.distance ?? 0) - (a.stats?.distance ?? 0);
    return a.player - b.player;
}

/** 並び替え済み結果からリザルト画面用の競技順位を作成します。 */
export function createCompetitionRanks(results) {
    let previousScore = null;
    let previousStars = null;
    let previousDistance = null;
    let rank = 0;

    return results.map((entry, index) => {
        const stars = entry.stats?.stars ?? 0;
        const distance = entry.stats?.distance ?? 0;
        const isSame = previousScore === entry.score
            && previousStars === stars
            && previousDistance === distance;

        if (!isSame)
            rank = index + 1;

        previousScore = entry.score;
        previousStars = stars;
        previousDistance = distance;
        return rank;
    });
}
