import Link from "next/link"
import { copy } from "../lib/copy"
import { localizePath } from "../lib/i18n"
import { getLocale } from "../lib/locale"

export default async function NotFound() {
  const locale = await getLocale()
  return (
    <section className="state-page">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>{copy.notFound.title[locale]}</h1>
        <p className="lead">{copy.notFound.lead[locale]}</p>
        <div className="btn-row">
          <Link className="btn btn-amber" href={localizePath("/book", locale)}>{copy.notFound.availability[locale]}</Link>
          <Link className="btn btn-line" href={localizePath("/rooms", locale)}>{copy.notFound.rooms[locale]}</Link>
          <Link className="btn btn-line" href={localizePath("/guide", locale)}>{copy.notFound.guide[locale]}</Link>
        </div>
      </div>
    </section>
  )
}
