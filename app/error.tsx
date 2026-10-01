"use client"

import Link from "next/link"
import { useEffect } from "react"
import { copy } from "../lib/copy"
import { localizePath } from "../lib/i18n"
import { useLocale } from "../components/useLocale"

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = useLocale()
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <section className="state-page">
      <div className="wrap">
        <p className="eyebrow">{copy.error.eyebrow[locale]}</p>
        <h1>{copy.error.title[locale]}</h1>
        <p className="lead">{copy.error.lead[locale]}</p>
        <div className="btn-row">
          <button className="btn btn-amber" type="button" onClick={reset}>{copy.error.again[locale]}</button>
          <Link className="btn btn-line" href={localizePath("/rooms", locale)}>{copy.error.rooms[locale]}</Link>
          <Link className="btn btn-line" href={localizePath("/guide", locale)}>{copy.error.guide[locale]}</Link>
          <Link className="btn btn-line" href={localizePath("/book", locale)}>{copy.error.availability[locale]}</Link>
        </div>
      </div>
    </section>
  )
}
