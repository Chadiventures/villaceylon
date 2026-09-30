import type { ReactNode } from "react"
import { photos } from "../lib/photos"
import { PlaceholderImage } from "./PlaceholderImage"

export function PageHero({ eyebrow, title, lead, image, imageAlt, oneLine, className }: { eyebrow: string; title: ReactNode; lead: ReactNode; image?: string; imageAlt?: string; oneLine?: boolean; className?: string }) {
  return (
    <section className={className ? `phero ${className}` : "phero"}>
      <div className="phero-bg">
        <PlaceholderImage src={image ?? photos.hero2} alt={imageAlt ?? "Sunset over the beach near The Papaya Tree in Ahangama"} sizes="100vw" />
      </div>
      <div className="hero-scrim" />
      <div className="wrap">
        <p className="eyebrow" style={{ color: "rgba(255,251,240,.85)" }}>{eyebrow}</p>
        <h1 className={oneLine ? "one" : undefined} style={{ marginTop: 14, maxWidth: oneLine ? "none" : undefined }}>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  )
}
