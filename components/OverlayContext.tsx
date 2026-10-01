'use client'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

type OverlayState = {
  sheetOpen: boolean
  menuOpen: boolean
  keyboardOpen: boolean
  chromeHidden: boolean
  setSheetOpen: (open: boolean) => void
  setMenuOpen: (open: boolean) => void
}

const OverlayCtx = createContext<OverlayState | null>(null)

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [keyboardOpen, setKeyboardOpen] = useState(false)

  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return
    const sync = () => {
      const covered = window.innerHeight - viewport.height - viewport.offsetTop
      setKeyboardOpen(covered > 80)
    }
    sync()
    viewport.addEventListener("resize", sync)
    viewport.addEventListener("scroll", sync)
    return () => {
      viewport.removeEventListener("resize", sync)
      viewport.removeEventListener("scroll", sync)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen && !sheetOpen) return
    const y = window.scrollY
    const { body, documentElement } = document
    body.style.position = "fixed"
    body.style.top = `-${y}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"
    body.style.overflow = "hidden"
    documentElement.style.overflow = "hidden"
    return () => {
      body.style.position = ""
      body.style.top = ""
      body.style.left = ""
      body.style.right = ""
      body.style.width = ""
      body.style.overflow = ""
      documentElement.style.overflow = ""
      window.scrollTo(0, y)
    }
  }, [menuOpen, sheetOpen])

  const chromeHidden = sheetOpen || menuOpen || keyboardOpen
  const value = useMemo(
    () => ({ sheetOpen, menuOpen, keyboardOpen, chromeHidden, setSheetOpen, setMenuOpen }),
    [sheetOpen, menuOpen, keyboardOpen, chromeHidden],
  )

  return <OverlayCtx.Provider value={value}>{children}</OverlayCtx.Provider>
}

export function useOverlay() {
  const ctx = useContext(OverlayCtx)
  if (!ctx) throw new Error("useOverlay must be used within OverlayProvider")
  return ctx
}
