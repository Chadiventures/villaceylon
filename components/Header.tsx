'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const links = [
  { href: "/rooms", label: "Rooms" },
  { href: "/house", label: "The House" },
  { href: "/guide", label: "Ahangama guide" },
]

const lightPages = new Set(["/house", "/rooms", "/ahangama", "/eat", "/day-trips", "/guide", "/getting-here", "/book", "/faq", "/things-to-do"])

export function Header() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [path])
  return (
    <header className={["head", lightPages.has(path) ? "on-light" : "", open ? "menu-open" : ""].filter(Boolean).join(" ")}>
      <div className="wrap">
        <Link className="logo" href="/">
          <span className="lw">THE PAPAYA TREE</span>
        </Link>
        <button className="nav-toggle" type="button" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          <span />
          <span />
          <span />
        </button>
        <nav className="nav">
          {links.map((link) => (
            <Link key={link.href} href={link.href} scroll={link.href.includes("#") ? false : undefined} className={path === link.href ? "on" : ""}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-amber" href="/book">Book now</Link>
      </div>
    </header>
  )
}
