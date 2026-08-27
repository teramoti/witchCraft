import { useEffect, type RefObject } from 'react'

type ButtonCenter = {
  button: HTMLButtonElement
  x: number
  y: number
}

const ARROW_DIRECTIONS: Record<string, { x: number; y: number }> = {
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 }
}

function getEnabledButtons(scope: ParentNode): HTMLButtonElement[] {
  return Array.from(scope.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'))
    .filter((button) => button.getClientRects().length > 0)
}

function getCenter(button: HTMLButtonElement): ButtonCenter {
  const rect = button.getBoundingClientRect()
  return {
    button,
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  }
}

/**
 * Enables spatial arrow-key navigation for a menu made from native buttons.
 * Enter keeps the browser's normal button behavior; when nothing is focused,
 * it activates the button marked with data-menu-default.
 */
export function useMenuKeyboardNavigation(
  containerRef: RefObject<HTMLElement | null>
): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const container = containerRef.current
      if (!container) return

      const dialog = container.querySelector<HTMLElement>('[role="dialog"]')
      const scope = dialog ?? container
      const buttons = getEnabledButtons(scope)
      if (buttons.length === 0) return

      const activeButton = document.activeElement instanceof HTMLButtonElement
        && scope.contains(document.activeElement)
        ? document.activeElement
        : null
      const defaultButton = scope.querySelector<HTMLButtonElement>('[data-menu-default]')
        ?? buttons[0]

      if (event.key === 'Escape' && dialog) {
        event.preventDefault()
        defaultButton.click()
        return
      }

      if (event.key === 'Enter' && !activeButton) {
        event.preventDefault()
        defaultButton.focus()
        defaultButton.click()
        return
      }

      const direction = ARROW_DIRECTIONS[event.key]
      if (!direction) return

      event.preventDefault()

      // 隠しコマンドなど、特定方向の入力を現在のボタンで受け続ける項目です。
      // stopPropagationは使わず、同じキー入力を画面側の処理にも渡します。
      if (
        (activeButton?.dataset.lockArrowRight === 'true' && event.key === 'ArrowRight')
        || (activeButton?.dataset.lockArrowLeft === 'true' && event.key === 'ArrowLeft')
      )
        return

      if (!activeButton) {
        defaultButton.focus()
        return
      }

      const current = getCenter(activeButton)
      const next = buttons
        .filter((button) => button !== activeButton)
        .map(getCenter)
        .map((candidate) => {
          const deltaX = candidate.x - current.x
          const deltaY = candidate.y - current.y
          const primaryDistance = deltaX * direction.x + deltaY * direction.y
          const secondaryDistance = Math.abs(deltaX * direction.y - deltaY * direction.x)

          return { ...candidate, primaryDistance, secondaryDistance }
        })
        .filter((candidate) => candidate.primaryDistance > 0)
        .sort((a, b) => {
          const aScore = a.primaryDistance + a.secondaryDistance * 2
          const bScore = b.primaryDistance + b.secondaryDistance * 2
          return aScore - bScore
        })[0]

      next?.button.focus()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [containerRef])
}
