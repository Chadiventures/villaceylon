import { copy } from "../lib/copy"
import { getLocale } from "../lib/locale"

export async function WhyBookDirect() {
  const locale = await getLocale()
  const points = [
    { label: copy.why.rate[locale] },
    { label: copy.why.flex[locale] },
    { label: copy.why.person[locale], oneLine: true },
  ]
  return (
    <section className="why-direct">
      <div className="wrap">
        <p className="eyebrow">{copy.why.eyebrow[locale]}</p>
        <ul className="why-grid">
          {points.map((point) => (
            <li key={point.label} className={point.oneLine ? "why-one-line" : undefined}>
              <span className="why-dot" aria-hidden="true" />
              <span>{point.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
