import Link from "next/link"
import { heroVideoSources, IMAGES } from "../lib/images"
import { HeroVideo } from "./HeroVideo"
import { PlaceholderImage } from "./PlaceholderImage"
import { RatingBadge } from "./RatingBadge"
import { SearchBar } from "./search/SearchBar"

const hero = IMAGES.home.hero
const heroVideo = heroVideoSources()

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <PlaceholderImage src={hero.src} alt={hero.alt} priority sizes="100vw" />
        <HeroVideo poster={hero.src} hasWebm={heroVideo.webm} hasMp4={heroVideo.mp4} />
      </div>
      <div className="hero-scrim" />
      <div className="wrap">
        <p className="eyebrow" style={{ color: "rgba(255,251,240,.85)" }}>Ahangama, Sri Lanka&apos;s south coast</p>
        <h1 style={{ marginTop: 10 }}>
          <span className="visual">Seven rooms, one garden, three minutes from the <em>surf</em></span>
          <span className="sr-only">Boutique surf hotel in Ahangama</span>
        </h1>
        <RatingBadge onDark />
        <p className="lead">A small hotel in Ahangama. Pool under the palms, a rooftop for sunset, and Ahangama&apos;s surf breaks a short walk away.</p>
        <SearchBar variant="hero" />
        <div className="btn-row" style={{ marginTop: 14 }}>
          <Link className="btn-text" href="/rooms" style={{ color: "var(--cream)" }}>See the rooms</Link>
        </div>
      </div>
    </section>
  )
}
