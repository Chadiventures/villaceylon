import { copy } from "../lib/copy"
import { getLocale } from "../lib/locale"
import { site } from "../lib/site"
import { RatingBadge } from "./RatingBadge"
import { SearchLink } from "./search/SearchLink"

export async function BookCta({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string
  title?: string
  lead?: string
} = {}) {
  const locale = await getLocale()
  return (
    <section className="cta">
      <div className="cta-card">
        <div className="cta-bg" />
        <div className="cta-sun" />
        <div className="wrap">
          <div className="cta-copy">
            <p className="eyebrow">{eyebrow ?? copy.cta.eyebrow[locale]}</p>
            <h2>{title ?? copy.cta.title[locale]}</h2>
            <p>{lead ?? copy.cta.lead[locale]}</p>
            <RatingBadge onDark />
          </div>
          <div className="btn-row">
            <SearchLink className="btn btn-amber" href="/book">{copy.cta.availability[locale]}</SearchLink>
            <a className="btn btn-line" href={site.whatsapp} target="_blank" rel="noopener noreferrer">{copy.cta.whatsapp[locale]}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/** @deprecated Prefer BookCta, kept so existing imports keep working. */
export { BookCta as Cta }
