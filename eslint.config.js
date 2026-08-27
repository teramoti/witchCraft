/**
 * TypeScript・React向けの静的解析設定です。
 * 生成物と外部ライブラリは解析対象から除外します。
 */
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // ビルド成果物、Phaser配布ファイル、依存関係は自作コードではないため除外します。
  globalIgnores(['dist', 'phaser.js', 'node_modules']),
  {
    // 元PJどおりJavaScriptで保持するゲーム本体・ギミック・データへ基本ルールを適用します。
    files: ['src/scenes/**/*.js', 'src/entities/**/*.js', 'src/gimmicks/**/*.js', 'src/systems/**/*.js', 'src/ui/**/*.js', 'src/effects/**/*.js', 'src/utils/**/*.js', 'src/app/data/**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      // Phaser Sceneはブラウザ上で動作するためDOM関連のグローバルを許可します。
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    // Reactを含むTypeScriptソースへ推奨ルールを適用します。
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      // ブラウザAPIを利用するPJなのでwindowやdocumentを許可します。
      globals: globals.browser,
    },
  },
])
