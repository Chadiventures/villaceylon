import { CalendarCheckIcon, PercentIcon } from "./Icons"
import { pick, tx } from "../lib/copy"
import { getLocale } from "../lib/locale"
import "./why-book.css"

export async function BookDirectStrip() {
  const locale = await getLocale()
  return (
    <section className="book-direct" aria-label={pick(locale, tx("Why book direct", "Varför boka direkt"))}>
      <div className="wrap">
        <ul className="book-direct-list">
          <li>
            <PercentIcon />
            <span>{pick(locale, tx("Best rate, only on this site", "Bästa priset, bara på den här sidan"))}</span>
          </li>
          <li>
            <CalendarCheckIcon />
            <span>{pick(locale, tx("Free cancellation up to 5 days before check-in", "Fri avbokning upp till 5 dagar före incheckning"))}</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
