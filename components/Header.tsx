'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { CurrencyToggle } from "./CurrencyToggle"
import { WhatsAppIcon } from "./Icons"
import { useOverlay } from "./OverlayContext"
import { searchHref, useSearch } from "./search/SearchContext"
import { site } from "../lib/site"

const links = [
  { href: "/rooms", label: "Rooms" },
  { href: "/house", label: "The House" },
  { href: "/guide", label: "Ahangama Guide" },
]

const lightPages = new Set(["/house", "/rooms", "/book", "/faq"])
function isLightPage(path: string) {
  return lightPages.has(path) || path.startsWith("/guide")
}

function focusables(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>(
    'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
  )]
}

export function Header() {
  const path = usePathname()
  const { checkIn, checkOut, guests } = useSearch()
  const { setMenuOpen } = useOverlay()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const bookHref = searchHref("/book", { checkIn, checkOut, guests })
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
        <Link className="logo" href="/">
          <span className="lw">THE PAPAYA TREE</span>
        </Link>
        <nav className="nav nav-desktop" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href === "/rooms" ? searchHref(link.href, { checkIn, checkOut, guests }) : link.href} className={path === link.href ? "on" : ""}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="head-actions">
          <CurrencyToggle className="head-currency head-currency-desktop" />
          <Link className="btn btn-amber head-book" href={bookHref}>Book now</Link>
          <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => open ? requestClose() : setOpen(true)}>
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
          aria-label="Menu"
          ref={drawerRef}
          onTouchStart={(event) => { startX.current = event.changedTouches[0].clientX }}
          onTouchEnd={(event) => {
            if (event.changedTouches[0].clientX - startX.current > 80) requestClose()
          }}
        >
          <nav className="nav-drawer-links" aria-label="Mobile">
            {links.map((link) => (
              <Link key={link.href} href={link.href === "/rooms" ? searchHref(link.href, { checkIn, checkOut, guests }) : link.href} className={path === link.href ? "on" : ""}>
                {link.label}
              </Link>
            ))}
            <Link href="/faq">FAQ</Link>
            <Link className="btn btn-amber" href={bookHref}>Book now</Link>
          </nav>
          <div className="nav-drawer-meta">
            <CurrencyToggle className="head-currency" />
            <a className="nav-drawer-wa" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              WhatsApp us
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
