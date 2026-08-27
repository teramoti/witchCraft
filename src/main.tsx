/** Reactアプリケーションのエントリーポイントです。 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import './main.css'

// index.htmlのroot要素へReactアプリケーションを描画します。
createRoot(document.getElementById('root')!).render(
  // 開発時に副作用の問題を検出するためStrictModeを維持します。
  <StrictMode>
    <App />
  </StrictMode>,
)
