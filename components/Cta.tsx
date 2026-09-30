import Link from "next/link"

const whatsappLink = "https://wa.me/94787163242"

export function Cta() {
  return (
    <section className="cta">
      <div className="cta-card">
        <div className="cta-bg" />
        <div className="cta-sun" />
        <div className="wrap">
          <div className="cta-copy">
            <p className="eyebrow">Book direct</p>
            <h2>Seven rooms, they go quickly in surf season</h2>
            <p>The best weeks slip away early. Book direct for the kindest rate, with free cancellation up to five days before you arrive.</p>
          </div>
          <div className="btn-row">
            <Link className="btn btn-amber" href="/book">Check availability</Link>
            <a className="btn btn-line" href={whatsappLink} target="_blank" rel="noopener">Message on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}
