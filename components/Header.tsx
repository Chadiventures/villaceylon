'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { copy } from "../lib/copy"
import { localizeHref, samePath, stripLocale } from "../lib/i18n"
import { site } from "../lib/site"
import { CurrencyToggle } from "./CurrencyToggle"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { WhatsAppIcon } from "./Icons"
import { useOverlay } from "./OverlayContext"
import { searchHref, useSearch } from "./search/SearchContext"
import { useLocale } from "./useLocale"

const links = [
  { href: "/rooms", key: "rooms" },
  { href: "/house", key: "house" },
  { href: "/guide", key: "guide" },
] as const

const lightPages = new Set(["/house", "/rooms", "/book", "/faq"])
function isLightPage(path: string) {
  const bare = stripLocale(path)
  return lightPages.has(bare) || bare.startsWith("/guide")
}

function focusables(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>(
    'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
  )]
}

export function SkipLink() {
  const locale = useLocale()
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  return <a className="skip-link" href="#main-content">{copy.meta.skip[locale]}</a>
}

export function Header() {
  const path = usePathname()
  const locale = useLocale()
  const { checkIn, checkOut, guests } = useSearch()
  const { setMenuOpen } = useOverlay()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const bookHref = localizeHref(searchHref("/book", { checkIn, checkOut, guests }), locale)
  const hrefFor = (href: string) => href === "/rooms"
    ? localizeHref(searchHref(href, { checkIn, checkOut, guests }), locale)
    : localizeHref(href, locale)
  function requestClose() {
    if (history.state && history.state.menu) history.back()
    else setOpen(false)
  }

  useEffect(() => { setOpen(false) }, [path])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])
  useEffect(() => {
    setMenuOpen(open)
    return () => setMenuOpen(false)
  }, [open, setMenuOpen])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const drawer = drawerRef.current
    const first = drawer ? focusables(drawer)[0] : null
    first?.focus()
    history.pushState({ menu: true }, "")
    function closeMenu() {
      if (history.state && history.state.menu) history.back()
      else setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        closeMenu()
        return
      }
      if (event.key !== "Tab" || !drawer) return
      const nodes = focusables(drawer)
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
      setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("popstate", onPop)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("popstate", onPop)
    }
  }, [open])

  return (
    <header className={["head", isLightPage(path) ? "on-light" : "", open ? "menu-open" : "", scrolled ? "head-scrolled" : ""].filter(Boolean).join(" ")}>
      <div className="wrap">
        <Link className="logo" href={localizeHref("/", locale)}>
          <span className="lw">THE PAPAYA TREE</span>
        </Link>
        <nav className="nav nav-desktop" aria-label={copy.nav.primary[locale]}>
          {links.map((link) => (
            <Link key={link.href} href={hrefFor(link.href)} className={samePath(path, link.href) ? "on" : ""}>
              {copy.nav[link.key][locale]}
            </Link>
          ))}
        </nav>
        <div className="head-actions">
          <LanguageSwitcher />
          <CurrencyToggle className="head-currency head-currency-desktop" />
          <Link className="btn btn-amber head-book" href={bookHref}>{copy.nav.book[locale]}</Link>
          <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="site-menu" aria-label={open ? copy.nav.close[locale] : copy.nav.open[locale]} onClick={() => open ? requestClose() : setOpen(true)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {open ? (
        <div
          className="nav-drawer"
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label={copy.nav.menu[locale]}
          ref={drawerRef}
          onTouchStart={(event) => { startX.current = event.changedTouches[0].clientX }}
          onTouchEnd={(event) => {
            if (event.changedTouches[0].clientX - startX.current > 80) requestClose()
          }}
        >
          <nav className="nav-drawer-links" aria-label={copy.nav.mobile[locale]}>
            {links.map((link) => (
              <Link key={link.href} href={hrefFor(link.href)} className={samePath(path, link.href) ? "on" : ""}>
                {copy.nav[link.key][locale]}
              </Link>
            ))}
            <Link href={localizeHref("/faq", locale)}>{copy.nav.faq[locale]}</Link>
            <Link className="btn btn-amber" href={bookHref}>{copy.nav.book[locale]}</Link>
          </nav>
          <div className="nav-drawer-meta">
            <LanguageSwitcher labelled />
            <CurrencyToggle className="head-currency" />
            <a className="nav-drawer-wa" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {copy.nav.whatsapp[locale]}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
