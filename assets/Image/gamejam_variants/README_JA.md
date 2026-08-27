# 素材追加メモ

このフォルダの画像は「種類を増やすための見た目素材」です。
ゲームルール上は、同色の画像はすべて同じカテゴリとして扱います。

例:
- `01_red_flower_hibiscus.png`
- `11_red_flower_rose.png`
- `18_red_flower_crimson.png`

上記3つは全て `red` です。

## 素材を追加する手順
1. `flowers/` または `potions/` にPNGを追加
2. `src/scenes/Start.js` で画像をimport
3. `MATERIAL_VARIANTS` の対象配列へ登録

この方法なら、GameJam中に画像だけ増やしても混色ロジックを触る必要がありません。
