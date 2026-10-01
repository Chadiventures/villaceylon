'use client'
import { useEffect, useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { useOverlay } from "./OverlayContext"

function focusables(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>(
    'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])',
  )].filter((node) => !node.hasAttribute("disabled") && node.getAttribute("aria-hidden") !== "true")
}

export function BottomSheet({
  title,
  children,
  footer,
  onClose,
}: {
  title: string
  children: ReactNode
  footer?: ReactNode
  onClose: () => void
}) {
  const { setSheetOpen } = useOverlay()
  const panelRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const dragged = useRef(false)

  useEffect(() => {
    setSheetOpen(true)
    return () => setSheetOpen(false)
  }, [setSheetOpen])

  useEffect(() => {
    const panel = panelRef.current
    const first = panel ? focusables(panel)[0] : null
    first?.focus()
    history.pushState({ sheet: true }, "")
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        requestClose()
        return
      }
      if (event.key !== "Tab" || !panel) return
      const nodes = focusables(panel)
      if (!nodes.length) return
      const firstNode = nodes[0]
      const lastNode = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === firstNode) {
        event.preventDefault()
        lastNode.focus()
      } else if (!event.shiftKey && document.activeElement === lastNode) {
        event.preventDefault()
        firstNode.focus()
      }
    }
    function onPop() {
      onClose()
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("popstate", onPop)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("popstate", onPop)
    }
  }, [onClose])

  function requestClose() {
    if (history.state && history.state.sheet) history.back()
    else onClose()
  }

  return createPortal(
    <div className="sheet-root" role="presentation">
      <button type="button" className="sheet-backdrop" aria-label="Close" onClick={requestClose} />
      <div
        className="sheet-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={panelRef}
        onTouchStart={(event) => {
          startY.current = event.changedTouches[0].clientY
          dragged.current = event.target === event.currentTarget || (event.target as HTMLElement).classList.contains("sheet-handle")
        }}
        onTouchEnd={(event) => {
          if (!dragged.current) return
          if (event.changedTouches[0].clientY - startY.current > 72) requestClose()
        }}
      >
        <div className="sheet-handle" aria-hidden="true" />
        <div className="sheet-body">{children}</div>
        {footer ? <div className="sheet-footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  )
}
