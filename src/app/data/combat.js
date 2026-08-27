/** シューティング要素で共有する調整値です。 */
export const COMBAT_DATA_KEYS = {
    /** 魔法弾で破壊できる対象かを表します。 */
    shootable: 'shootable',
    /** 対象の残り耐久値です。 */
    hitPoints: 'hitPoints',
    /** 対象の最大耐久値です。命中表示に使用します。 */
    maxHitPoints: 'maxHitPoints',
    /** 通常撃破時に得られる点数です。 */
    defeatPoints: 'defeatPoints',
    /** 敵画像や演出を識別する種類です。 */
    enemyType: 'enemyType',
    /** 魔法弾を自動破棄するPhaser時刻です。 */
    projectileExpiresAt: 'projectileExpiresAt',
    /** 直進弾または追尾弾を識別する種類です。 */
    projectileMode: 'projectileMode',
    /** 発射時の進行方向です。追尾弾が後方へ急旋回するのを防ぎます。 */
    projectileDirection: 'projectileDirection',
    /** 発射時に確定した弾速です。 */
    projectileSpeed: 'projectileSpeed'
};

/** 通常の魔法弾に関する調整値です。 */
export const SHOOTING_BALANCE = {
    /** XまたはJキー長押し中に次弾を撃てるまでの間隔です。 */
    fireCooldownMs: 240,
    /** ラウンド開始時と最大回復時に保持できる弾数です。 */
    maxAmmo: 5,
    /** 弾を1発回復するまでに必要なゲーム進行時間です。 */
    ammoRechargeMs: 950,
    /** 魔法弾の基本速度です。 */
    projectileSpeed: 1200,
    /** SPEED MODEで発射時のプレイヤー速度へ加える値です。 */
    speedModeProjectileLeadSpeed: 240,
    /** 画面外付近まで届くようにした弾の寿命です。 */
    projectileLifetimeMs: 1350,
    /** 見た目より少し広く取る命中判定の横幅です。 */
    projectileBodyWidth: 28,
    /** 見た目より少し広く取る命中判定の高さです。 */
    projectileBodyHeight: 14,
    /** 浮遊中の追尾対象を検索する距離です。 */
    homingRangePx: 780,
    /** 追尾弾が1秒あたりに曲がれる量です。 */
    homingTurnRate: 8.5,
    /** 通常姿勢の発射位置を前へずらす量です。 */
    muzzleOffsetX: 52,
    /** 通常姿勢の発射位置を上へずらす量です。 */
    muzzleOffsetY: -10,
    /** 浮遊姿勢の発射位置を調整する量です。 */
    floatMuzzleOffsetY: 4,
    /** 1体撃破時の基準得点です。 */
    defaultDefeatPoints: 260,
    /** 命中エフェクトを表示する基準時間です。 */
    impactDurationMs: 260
};

/** 射撃をゲーム進行へつなげる「スターバースト」の調整値です。 */
export const STAR_BURST_BALANCE = {
    /** バースト発動に必要な魔力です。 */
    requiredCharge: 4,
    /** 耐久値が残る命中で得られる魔力です。 */
    chargePerHit: 1,
    /** 敵を撃破した際に得られる魔力です。 */
    chargePerDefeat: 2,
    /** 発動時に自動消去する前方敵の最大数です。 */
    maxTargets: 4,
    /** 発動対象を検索する前方距離です。 */
    rangePx: 1300,
    /** 発動そのものに与える基礎得点です。 */
    basePoints: 450,
    /** 自動消去した敵1体ごとの追加得点です。 */
    pointsPerTarget: 180,
    /** 発動時に回復する残り時間です。 */
    timeRewardSeconds: 2,
    /** 大きな発動表示を維持する時間です。 */
    popupDurationMs: 900
};
