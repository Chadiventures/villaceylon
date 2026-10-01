'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Price } from "./CurrencyToggle"
import { useOverlay } from "./OverlayContext"
import { searchHref, useSearch } from "./search/SearchContext"
import { site } from "../lib/site"

export function StickyBookBar() {
  const path = usePathname()
  const { checkIn, checkOut, guests } = useSearch()
  const { chromeHidden } = useOverlay()
  const [pastHero, setPastHero] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const media = window.matchMedia("(max-width: 820px)")
    const sync = () => setIsMobile(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])
  useEffect(() => {
    const hero = document.querySelector(".hero, .page-header, .guide-intro, .surf-hero")
    if (!hero) {
      setPastHero(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting)
    }, { threshold: 0.08 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [path])
  const onBook = path === "/book"
  const visible = !onBook && !chromeHidden && (isMobile || pastHero)
  return (
    <div className={visible ? "sticky-book show" : "sticky-book"} aria-hidden={!visible}>
      <div className="sticky-book-inner">
        <p className="sticky-price">From <Price usd={site.priceFrom} /> / night</p>
        <Link className="btn btn-amber sticky-cta" href={searchHref("/book", { checkIn, checkOut, guests })}>Check availability</Link>
      </div>
    </div>
  )
}
