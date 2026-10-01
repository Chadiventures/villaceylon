'use client'
import Link from "next/link"
import type { ComponentType } from "react"
import { copy, pick, tx } from "../lib/copy"
import type { ImageSlot } from "../lib/images"
import { useLocale } from "./useLocale"
import { Price } from "./CurrencyToggle"
import { BedIcon, FloorIcon, RateIcon, SizeIcon, SleepsIcon } from "./Icons"
import { PlaceholderImage } from "./PlaceholderImage"
import { SearchLink } from "./search/SearchLink"

type Icon = ComponentType

type Chip = { id: string; label: string; Icon: Icon }

type Row = { id: string; label: string; Icon: Icon; price?: number }

type RoomId = "double" | "family"

const rooms: {
  id: RoomId
  title: string
  href: string
  anchor: string
  price: number
  badge: string
  feel: string
  tone: "double" | "family"
  chips: Chip[]
  rows: Row[]
}[] = [
  {
    id: "double",
    title: "Deluxe Double",
    href: "/book?room=double",
    anchor: "#double",
    price: 65,
    badge: "6 rooms",
    feel: "Balcony over the garden and pool.",
    tone: "double",
    chips: [
      { id: "sleeps", label: "Sleeps 2", Icon: SleepsIcon },
      { id: "bed", label: "King bed", Icon: BedIcon },
      { id: "size", label: "34 m²", Icon: SizeIcon },
      { id: "floor", label: "1st and 2nd floor", Icon: FloorIcon },
    ],
    rows: [
      { id: "sleeps", label: "Sleeps 2", Icon: SleepsIcon },
      { id: "bed", label: "King bed", Icon: BedIcon },
      { id: "floor", label: "1st and 2nd floor", Icon: FloorIcon },
      { id: "size", label: "34 m²", Icon: SizeIcon },
      { id: "from", label: "From", Icon: RateIcon, price: 65 },
    ],
  },
  {
    id: "family",
    title: "Deluxe Four-Bed",
    href: "/book?room=family",
    anchor: "#family",
    price: 90,
    badge: "1 room",
    feel: "Private patio on the garden, room for the whole family.",
    tone: "family",
    chips: [
      { id: "sleeps", label: "Sleeps 4", Icon: SleepsIcon },
      { id: "bed", label: "King + bunk", Icon: BedIcon },
      { id: "size", label: "34 m²", Icon: SizeIcon },
      { id: "floor", label: "Ground floor", Icon: FloorIcon },
    ],
    rows: [
      { id: "sleeps", label: "Sleeps 4", Icon: SleepsIcon },
      { id: "bed", label: "King + bunk", Icon: BedIcon },
      { id: "floor", label: "Ground floor", Icon: FloorIcon },
      { id: "size", label: "34 m²", Icon: SizeIcon },
      { id: "from", label: "From", Icon: RateIcon, price: 90 },
    ],
  },
]

export function RoomCompare({ doubleImage, familyImage }: { doubleImage: ImageSlot; familyImage: ImageSlot }) {
  const locale = useLocale()
  const images: Record<RoomId, ImageSlot> = { double: doubleImage, family: familyImage }
  const from = copy.compare.from[locale]
  const night = copy.compare.perNight[locale]
  const chipLabel = (roomId: string, id: string, fallback: string) => {
    if (id === "sleeps") return `${copy.compare.sleeps[locale]} ${roomId === "family" ? "4" : "2"}`
    if (id === "bed") return roomId === "family" ? copy.compare.kingBunk[locale] : copy.compare.king[locale]
    if (id === "floor") return roomId === "family" ? copy.compare.ground[locale] : copy.compare.floors[locale]
    if (id === "from") return from
    if (id === "size") return "34 m²"
    return fallback
  }
  const titleFor = (roomId: string, fallback: string) => roomId === "family" ? copy.compare.family[locale] : roomId === "double" ? copy.compare.double[locale] : fallback
  return (
    <section className="room-compare-band" aria-labelledby="choose-your-room">
      <div className="wrap">
        <div className="section-head room-compare-head">
          <p className="eyebrow">{copy.compare.eyebrow[locale]}</p>
          <h2 id="choose-your-room">{copy.compare.title[locale]}</h2>
          <p className="room-compare-lead">{pick(locale, tx("Two ways to stay, both a few steps from the pool.", "Två sätt att bo, båda ett par steg från poolen."))}</p>
        </div>
        <div className="room-compare-cards">
          {rooms.map((room) => {
            const image = images[room.id]
            return (
            <article className={`room-compare-card room-compare-card-${room.tone}`} key={room.id}>
              <div className="room-compare-photo">
                <PlaceholderImage src={image.src} alt={image.alt} sizes="(max-width: 640px) 100vw, 50vw" />
                <span className="room-compare-badge">{room.badge}</span>
              </div>
              <div className="room-compare-body">
                <h3>{titleFor(room.id, room.title)}</h3>
                <p className="room-compare-price">
                  <span className="room-compare-from">{from}</span> <Price usd={room.price} /> <small>{night}</small>
                </p>
                <ul className="room-compare-chips">
                  {room.chips.map((chip) => (
                    <li key={chip.id}>
                      <span className="room-compare-chip-icon" aria-hidden="true"><chip.Icon /></span>
                      {chipLabel(room.id, chip.id, chip.label)}
                    </li>
                  ))}
                </ul>
                <p className="room-compare-feel">{room.feel}</p>
                <div className="room-compare-actions">
                  <SearchLink className="btn btn-amber room-compare-cta" href={room.href}>{copy.rooms.availability[locale]}</SearchLink>
                  <Link className="room-compare-more" href={room.anchor}>{pick(locale, tx("See the room", "Se rummet"))}</Link>
                </div>
              </div>
            </article>
            )
          })}
        </div>
        <details className="room-compare-full">
          <summary>{pick(locale, tx("See full comparison", "Se hela jämförelsen"))}</summary>
          <div className="room-compare-full-grid">
            {rooms.map((room) => (
              <div key={room.id}>
                <h3>{titleFor(room.id, room.title)}</h3>
                <ul>
                  {room.rows.map((row) => (
                    <li key={row.id}>
                      <span className="room-compare-row-icon" aria-hidden="true"><row.Icon /></span>
                      {row.price ? <span>{from} <Price usd={row.price} /> {night}</span> : <span>{chipLabel(room.id, row.id, row.label)}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  )
}
