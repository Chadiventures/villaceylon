import Link from "next/link"
import { copy } from "../lib/copy"
import { trText } from "../lib/image-copy"
import { localizePath } from "../lib/i18n"
import { heroVideoSources, IMAGES } from "../lib/images"
import { getLocale } from "../lib/locale"
import { HeroVideo } from "./HeroVideo"
import { PlaceholderImage } from "./PlaceholderImage"
import { RatingBadge } from "./RatingBadge"
import { SearchBar } from "./search/SearchBar"

const hero = IMAGES.home.hero
const heroVideo = heroVideoSources()
const hasHeroVideo = heroVideo.webm || heroVideo.mp4

export async function Hero() {
  const locale = await getLocale()
  return (
    <section className="hero">
      <div className="hero-bg">
        {hasHeroVideo ? (
          <HeroVideo poster={hero.src} alt={trText(hero.alt, locale)} hasWebm={heroVideo.webm} hasMp4={heroVideo.mp4} />
        ) : (
          <PlaceholderImage src={hero.src} alt={trText(hero.alt, locale)} priority sizes="100vw" />
        )}
      </div>
      <div className="hero-scrim" />
      <div className="wrap">
        <p className="eyebrow" style={{ color: "rgba(255,251,240,.85)" }}>{copy.home.eyebrow[locale]}</p>
        <h1 style={{ marginTop: 10 }}>
          <span className="visual">{copy.home.title[locale]} <em>{copy.home.titleEm[locale]}</em></span>
          <span className="sr-only">{copy.home.seoTitle[locale]}</span>
        </h1>
        <RatingBadge onDark />
        <p className="lead">{copy.home.lead[locale]}</p>
        <SearchBar variant="hero" />
        <div className="btn-row" style={{ marginTop: 14 }}>
          <Link className="btn-text" href={localizePath("/rooms", locale)} style={{ color: "var(--cream)" }}>{copy.home.seeRooms[locale]}</Link>
        </div>
      </div>
    </section>
  )
}
