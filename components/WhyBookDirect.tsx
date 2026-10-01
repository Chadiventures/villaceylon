'use client'
import { useEffect, useRef } from "react"
import { copy, pick, tx } from "../lib/copy"
import { site } from "../lib/site"
import { SearchLink } from "./search/SearchLink"
import { useLocale } from "./useLocale"
import "./why-book.css"

type BenefitIcon = "tag" | "calendar" | "chat"

function Mark({ icon }: { icon: BenefitIcon | "leaf" }) {
  if (icon === "tag") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="7.6" cy="8" r="2.35" />
        <circle cx="16.4" cy="16" r="2.35" />
        <path d="M18 6.4 6 17.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (icon === "calendar") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M8 3.5v3M16 3.5v3M3.5 10h17" strokeLinecap="round" />
        <path d="M8.2 15.1 10.6 17.4 15.8 12.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (icon === "chat") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M5 6.5h14A1.5 1.5 0 0 1 20.5 8v7a1.5 1.5 0 0 1-1.5 1.5H10l-4.2 3v-3H5A1.5 1.5 0 0 1 3.5 15V8A1.5 1.5 0 0 1 5 6.5Z" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21C12 13 7.2 7.2 3 5.2 5.2 12 8 17 12 21Z" strokeLinejoin="round" />
      <path d="M12 21c0-8 4.8-13.8 9-15.8C18.8 12 16 17 12 21Z" strokeLinejoin="round" />
      <path d="M12 21V8.5" strokeLinecap="round" />
    </svg>
  )
}

function LeafArt() {
  return (
    <svg className="why-direct-leaf" viewBox="0 0 320 320" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M168 292c-8-48-6-92 8-132" />
        <path d="M176 168c-28-18-62-24-104-18 28 18 58 28 104 18Z" />
        <path d="M178 158c-18-36-22-74-8-112 22 28 26 68 8 112Z" />
        <path d="M180 164c22-34 58-52 108-58-18 36-52 56-108 58Z" />
        <path d="M174 188c-36 4-74 22-104 58 38-8 72-22 104-58Z" />
        <path d="M182 176c18-8 48-8 86 4-28 16-58 16-86-4Z" />
        <path d="M176 150c8-40 28-72 58-98" />
        <path d="M170 176c-22-8-52-6-84 8" />
        <path d="M184 196c20 16 34 40 40 74" />
      </g>
    </svg>
  )
}

export function WhyBookDirect({ variant = "full" }: { variant?: "full" | "compact" }) {
  const locale = useLocale()
  const benefits: { title: string; text: string; icon: BenefitIcon; whatsapp?: boolean }[] = [
    { title: copy.why.rate[locale], text: pick(locale, tx("The lowest price we offer is on this site.", "Det lägsta priset vi erbjuder är på den här sidan.")), icon: "tag" },
    { title: copy.why.flex[locale], text: pick(locale, tx("Free cancellation up to 5 days before check-in.", "Fri avbokning upp till 5 dagar före incheckning.")), icon: "calendar" },
    { title: copy.why.person[locale], text: pick(locale, tx("Message us anytime, we reply ourselves.", "Skriv när du vill, vi svarar själva.")), icon: "chat", whatsapp: true },
  ]
  const listRef = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const cards = Array.from(list.querySelectorAll<HTMLElement>(".why-direct-card"))
    list.classList.add("is-ready")
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      cards.forEach((card) => card.classList.add("is-in"))
      observer.disconnect()
    }, { threshold: 0.18 })
    observer.observe(list)
    return () => observer.disconnect()
  }, [variant])
  const compact = variant === "compact"
  return (
    <section className={compact ? "why-direct why-direct-compact" : "why-direct"} aria-label={copy.why.eyebrow[locale]}>
      <div className="why-direct-wrap">
        <div className="why-direct-panel">
          <LeafArt />
          {compact ? (
            <ul className="why-direct-chips">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="why-direct-chip">
                  <span className="why-direct-icon" aria-hidden="true"><Mark icon={benefit.icon} /></span>
                  <span>{benefit.title}</span>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <div className="why-direct-head">
                <div className="why-direct-copy">
                  <p className="why-direct-kicker">{copy.why.eyebrow[locale]}</p>
                  <h2>{pick(locale, tx("Book with us, keep the good bits", "Boka hos oss, behåll det bra"))}</h2>
                  <p className="why-direct-lead">{pick(locale, tx("No middleman, no surprises. Just us.", "Ingen mellanhand, inga överraskningar. Bara vi."))}</p>
                </div>
                <p className="why-direct-badge">
                  <Mark icon="leaf" />
                  {pick(locale, tx("Direct only", "Bara direkt"))}
                </p>
              </div>
              <ul className="why-direct-cards" ref={listRef}>
                {benefits.map((benefit) => (
                  <li key={benefit.title} className="why-direct-card">
                    <span className="why-direct-icon" aria-hidden="true"><Mark icon={benefit.icon} /></span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                    {benefit.whatsapp ? (
                      <a className="why-direct-link" href={site.whatsapp} target="_blank" rel="noopener noreferrer">{pick(locale, tx("Message us", "Skriv till oss"))}</a>
                    ) : null}
                  </li>
                ))}
              </ul>
              <div className="why-direct-foot">
                <SearchLink className="btn btn-amber why-direct-cta" href="/book">{copy.rooms.availability[locale]}</SearchLink>
                <p className="why-direct-note">{pick(locale, tx("Free cancellation up to 5 days before check-in", "Fri avbokning upp till 5 dagar före incheckning"))}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
