'use client'
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const selector = ".page-header .wrap,.guide-intro .wrap,.guide-pull,.welcome .wrap,.section-head,.rooms-grid>*,.card4,.bento .big,.bento .tile,.arch,.gi-card,.gcard,.info .it,.policy,.gallery .g,.cta .wrap,.stat,.sc,.yfit-block,.sheet .area-group"

function countUp(node: HTMLElement) {
  const target = Number(node.dataset.count)
  const suffix = node.dataset.suf || ""
  const prefix = node.dataset.pre || ""
  const duration = 1000
  const start = performance.now()
  const frame = (now: number) => {
    const progress = Math.min(1, (now - start) / duration)
    node.textContent = prefix + Math.round(target * (1 - Math.pow(1 - progress, 3))) + suffix
    if (progress < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

export function Motion() {
  const pathname = usePathname()
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    const nodes = document.querySelectorAll(selector)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("in")
        const number = entry.target.querySelector("[data-count]")
        if (number instanceof HTMLElement) countUp(number)
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.15 })
    nodes.forEach((node, index) => {
      const el = node as HTMLElement
      el.classList.add("rv")
      el.style.transitionDelay = `${(index % 4) * 70}ms`
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])
  return null
}
