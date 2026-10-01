'use client'
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const Concierge = dynamic(() => import("./Concierge").then((mod) => ({ default: mod.Concierge })), { ssr: false })

export function LazyConcierge() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (window.matchMedia("(max-width: 760px)").matches) return
    const boot = () => setReady(true)
    const idle = window.requestIdleCallback || ((cb: IdleRequestCallback) => window.setTimeout(cb, 800))
    const id = idle(() => boot())
    const onInteract = () => setReady(true)
    window.addEventListener("pointerdown", onInteract, { once: true })
    return () => {
      window.removeEventListener("pointerdown", onInteract)
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(id as number)
      else window.clearTimeout(id as number)
    }
  }, [])
  if (!ready) return null
  return <Concierge />
}
