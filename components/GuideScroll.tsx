'use client'
import { useEffect } from "react"
import { usePathname } from "next/navigation"

function scrollToGuide(behavior: ScrollBehavior) {
  const section = document.getElementById("guide")
  if (!section) return
  section.scrollIntoView({ behavior, block: "start" })
}

export function GuideScroll() {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname !== "/" || window.location.hash !== "#guide") return
    const timers = [0, 350, 700, 1000].map((delay, index) => window.setTimeout(() => scrollToGuide(index === 0 ? "smooth" : "auto"), delay))
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [pathname])
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a")
      if (!link) return
      const url = new URL(link.href, window.location.href)
      if (url.pathname !== "/" || url.hash !== "#guide") return
      if (window.location.pathname !== "/") return
      event.preventDefault()
      event.stopPropagation()
      if (window.location.hash !== "#guide") history.pushState(null, "", "/#guide")
      scrollToGuide("smooth")
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])
  return null
}
