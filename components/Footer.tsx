"use client"
import Link from "next/link"
import { copy } from "../lib/copy"
import { localizePath } from "../lib/i18n"
import { site } from "../lib/site"
import { useLocale } from "./useLocale"
import { InstagramIcon, MailIcon, WhatsAppIcon } from "./Icons"
import { SearchLink } from "./search/SearchLink"

export function Footer() {
  const locale = useLocale()
  const href = (path: string) => localizePath(path, locale)
  return (
    <footer className="foot" id="site-footer">
      <div className="wrap">
        <div>
          <Link className="logo" href={href("/")} style={{ display: "inline-flex" }}>
            <span className="lw">THE PAPAYA TREE</span>
            <span className="ls">AHANGAMA · SRI LANKA</span>
          </Link>
          <p style={{ maxWidth: "34ch", marginTop: 16 }}>{copy.footer.blurb[locale]}</p>
          <a className="foot-address" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
            Munidasa Mawatha, Ahangama 80650<br />Ahangama, Sri Lanka
          </a>
        </div>
        <div>
          <h4>{copy.footer.visit[locale]}</h4>
          <SearchLink href="/rooms">{copy.footer.rooms[locale]}</SearchLink>
          <Link href={href("/house")}>{copy.footer.house[locale]}</Link>
          <Link href={href("/guide")}>{copy.nav.guide[locale]}</Link>
          <Link href={href("/faq")}>{copy.nav.faq[locale]}</Link>
          <SearchLink href="/book">{copy.footer.book[locale]}</SearchLink>
        </div>
        <div>
          <h4>{copy.footer.contact[locale]}</h4>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${site.phone}`} style={{ display: "flex", alignItems: "center", gap: 10 }}><WhatsAppIcon />{site.phone}</a>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${site.instagramHandle}`} style={{ display: "flex", alignItems: "center", gap: 10 }}><InstagramIcon />{site.instagramHandle}</a>
          <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`} style={{ display: "flex", alignItems: "center", gap: 10 }}><MailIcon />{site.email}</a>
        </div>
      </div>
      <div className="wrap foot-base">
        <p className="foot-copy">© 2026 The Papaya Tree</p>
        <nav className="foot-legal" aria-label="Legal">
          <Link href={href("/privacy")}>Privacy Policy</Link>
          <span className="foot-sep" aria-hidden="true">·</span>
          <Link href={href("/cookies")}>Cookie Policy</Link>
          <span className="foot-sep" aria-hidden="true">·</span>
          <Link href={href("/return-policy")}>Return Policy</Link>
          <span className="foot-sep" aria-hidden="true">·</span>
          <Link href={href("/business-terms")}>Business Terms & Conditions</Link>
        </nav>
        <a className="foot-credit" href="https://shorelinetechstudio.se" target="_blank" rel="noopener noreferrer">Designed by Shoreline Tech Studio</a>
      </div>
    </footer>
  )
}
