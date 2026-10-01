'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { copy } from "../lib/copy"
import { localizeHref, stripLocale } from "../lib/i18n"
import { site } from "../lib/site"
import { Price } from "./CurrencyToggle"
import { useOverlay } from "./OverlayContext"
import { searchHref, useSearch } from "./search/SearchContext"
import { useLocale } from "./useLocale"

const barHiddenPaths = ["/book", "/faq", "/privacy", "/terms", "/cookies"]

export function StickyBookBar() {
  const path = usePathname()
  const locale = useLocale()
  const { checkIn, checkOut, guests } = useSearch()
  const { chromeHidden } = useOverlay()
  const [pastHero, setPastHero] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
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
    setPastHero(false)
    const observer = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting)
    }, { threshold: 0.08 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [path])
  useEffect(() => {
    const footer = document.getElementById("site-footer")
    if (!footer) {
      setFooterVisible(false)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting)
    }, { threshold: 0 })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [path])
  const hiddenPage = barHiddenPaths.includes(stripLocale(path))
  const visible = !hiddenPage && !chromeHidden && !footerVisible && (isMobile || pastHero)
  return (
    <div className={visible ? "sticky-book show" : "sticky-book"} aria-hidden={!visible}>
      <div className="sticky-book-inner">
        <p className="sticky-price">{copy.sticky.from[locale]} <Price usd={site.priceFrom} /> {copy.sticky.night[locale]}</p>
        <Link className="btn btn-amber sticky-cta" href={localizeHref(searchHref("/book", { checkIn, checkOut, guests }), locale)}>{copy.sticky.availability[locale]}</Link>
      </div>
    </div>
  )
}
