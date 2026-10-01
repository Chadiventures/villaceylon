import { site } from "../lib/site"
import { RatingBadge } from "./RatingBadge"
import { SearchLink } from "./search/SearchLink"

export function BookCta({
  eyebrow = "Book direct",
  title = "Your room is waiting",
  lead = "Seven rooms. Three minutes to the waves. Book direct and we will look after the rest.",
}: {
  eyebrow?: string
  title?: string
  lead?: string
}) {
  return (
    <section className="cta">
      <div className="cta-card">
        <div className="cta-bg" />
        <div className="cta-sun" />
        <div className="wrap">
          <div className="cta-copy">
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            <p>{lead}</p>
            <RatingBadge onDark />
          </div>
          <div className="btn-row">
            <SearchLink className="btn btn-amber" href="/book">Check availability</SearchLink>
            <a className="btn btn-line" href={site.whatsapp} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/** @deprecated Prefer BookCta, kept so existing imports keep working. */
export { BookCta as Cta }
