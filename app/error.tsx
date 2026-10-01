'use client'
import Link from "next/link"
import { useEffect } from "react"

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log client-side only, no personal data.
    console.error(error)
  }, [error])
  return (
    <section className="state-page">
      <div className="wrap">
        <p className="eyebrow">Something went wrong</p>
        <h1>A small wave knocked us over</h1>
        <p className="lead">Try again in a moment, or go back to somewhere steadier.</p>
        <div className="btn-row">
          <button className="btn btn-amber" type="button" onClick={reset}>Try again</button>
          <Link className="btn btn-line" href="/rooms">See the rooms</Link>
          <Link className="btn btn-line" href="/guide">Open the guide</Link>
          <Link className="btn btn-line" href="/book">Check availability</Link>
        </div>
      </div>
    </section>
  )
}
