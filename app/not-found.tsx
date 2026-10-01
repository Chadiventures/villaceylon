import Link from "next/link"

export default function NotFound() {
  return (
    <section className="state-page">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>This path washed away</h1>
        <p className="lead">We can&apos;t find that page. It may have moved, or the tide took it.</p>
        <div className="btn-row">
          <Link className="btn btn-amber" href="/book">Check availability</Link>
          <Link className="btn btn-line" href="/rooms">See the rooms</Link>
          <Link className="btn btn-line" href="/guide">Open the guide</Link>
        </div>
      </div>
    </section>
  )
}
