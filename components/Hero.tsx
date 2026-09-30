import Link from "next/link"
import { photos } from "../lib/photos"
import { PlaceholderImage } from "./PlaceholderImage"

const heroPoster = photos.ahangama.beach
const heroVideo = photos.heroVideo

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <PlaceholderImage src={heroPoster} alt="Ahangama beach on Sri Lanka's south coast, near The Papaya Tree" priority sizes="100vw" />
        <video className="hero-video" autoPlay muted loop playsInline poster={heroPoster}>
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>
      <div className="hero-scrim" />
      <p className="hero-badge"><span>★★★★★</span>Book direct, no fees</p>
      <div className="wrap">
        <p className="eyebrow" style={{ color: "rgba(255,251,240,.85)" }}>Ahangama, Sri Lanka&apos;s south coast</p>
        <h1 style={{ marginTop: 10 }}>Seven rooms<br />under the <em>papaya trees</em></h1>
        <p className="lead">A small garden house where the days smell of frangipani and sea salt.<br />Brand new AC rooms, a pool beneath the palms, and the waves a barefoot walk past the gate.</p>
        <div className="btn-row">
          <Link className="btn btn-amber" href="/book">Check availability</Link>
          <Link className="btn btn-line" href="/rooms" style={{ color: "var(--cream)" }}>See the room</Link>
        </div>
      </div>
    </section>
  )
}
