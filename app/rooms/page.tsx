import type { Metadata } from "next"
import Link from "next/link"
import { BookCta } from "../../components/BookCta"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { Building } from "../../components/Building"
import { Price } from "../../components/CurrencyToggle"
import { JsonLd } from "../../components/JsonLd"
import { PolicyCard } from "../../components/PolicyCard"
import { RoomCompare } from "../../components/RoomCompare"
import { RoomGallery } from "../../components/RoomGallery"
import { Section } from "../../components/Section"
import { SearchBar } from "../../components/search/SearchBar"
import { SearchLink } from "../../components/search/SearchLink"
import { WhyBookDirect } from "../../components/WhyBookDirect"
import { IMAGES } from "../../lib/images"

const roomPhotos = {
  double: IMAGES.rooms.double.map((image) => ({ src: image.src, alt: image.alt })),
  family: IMAGES.rooms.family.map((image) => ({ src: image.src, alt: image.alt })),
}
import { pageMetadata } from "../../lib/seo"
import { site } from "../../lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Rooms from $65 a Night in Ahangama",
  description: "Six deluxe doubles and one family room at The Papaya Tree. Cool AC rooms from $65 a night, three minutes from Kabalana surf. Book direct.",
  path: "/rooms",
})

const roomSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: "Deluxe Double",
    description: "A double room 34 m2 with a king bed and a private balcony over the garden, from $65 a night.",
    occupancy: { "@type": "QuantitativeValue", maxValue: 2 },
    bed: { "@type": "BedDetails", typeOfBed: "King", numberOfBeds: 1 },
    floorSize: { "@type": "QuantitativeValue", value: 34, unitCode: "MTK" },
    offers: {
      "@type": "Offer",
      price: site.priceFrom,
      priceCurrency: "USD",
      url: `${site.url}/book?room=double`,
    },
    potentialAction: { "@type": "ReserveAction", target: `${site.url}/book?room=double` },
  },
  {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: "Deluxe Four-Bed",
    description: "A ground-floor family room 34 m2 with a king bed and a bunk, opening onto a private patio, sleeps 4.",
    occupancy: { "@type": "QuantitativeValue", maxValue: 4 },
    bed: [
      { "@type": "BedDetails", typeOfBed: "King", numberOfBeds: 1 },
      { "@type": "BedDetails", typeOfBed: "Bunk", numberOfBeds: 1 },
    ],
    floorSize: { "@type": "QuantitativeValue", value: 34, unitCode: "MTK" },
    potentialAction: { "@type": "ReserveAction", target: `${site.url}/book?room=family` },
  },
]

export default function RoomsPage() {
  return (
    <>
      <JsonLd data={roomSchemas[0]} />
      <JsonLd data={roomSchemas[1]} />
      <Section id="double" top>
        <Breadcrumbs items={[{ name: "Rooms", path: "/rooms" }]} />
        <h1 className="sr-only">Rooms from $65 a Night in Ahangama</h1>
        <div className="rooms-search-sticky">
          <SearchBar variant="page" />
        </div>
        <div className="rooms-grid">
          <RoomGallery roomId="double" caption="Deluxe double" photos={roomPhotos.double} />
          <div className="room-copy">
            <p className="eyebrow">Deluxe double</p>
            <p className="room-plain">A double room 34 m² with a king bed and a private balcony over the garden, from $65 a night.</p>
            <h2><span className="visual">A room for two,<br />up in the light</span></h2>
            <p className="rmeta">Sleeps 2 · King bed · First and second floors</p>
            <p className="price">from <Price usd={65} /> <small>/ night, two guests</small></p>
            <p className="rmeta">Surf two minutes away. Restaurants nearby. <Link href="/guide">See the Ahangama guide ›</Link></p>
            <div className="btn-row">
              <SearchLink className="btn btn-amber" href="/book?room=double">Check availability</SearchLink>
              <a className="btn btn-line" href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </Section>
      <Section tint id="family">
        <div className="rooms-grid">
          <div className="room-copy">
            <p className="eyebrow">Deluxe four-bed</p>
            <p className="room-plain">A ground-floor family room 34 m² with a king bed and a bunk, opening onto a private patio, sleeps 4.</p>
            <h2><span className="visual">Room for the whole crew</span></h2>
            <p className="rmeta">Sleeps 4 · King + bunk · Ground floor</p>
            <p className="price">from <Price usd={90} /> <small>/ night, four guests</small></p>
            <div className="btn-row">
              <SearchLink className="btn btn-amber" href="/book?room=family">Check availability</SearchLink>
              <a className="btn btn-line" href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
          <RoomGallery roomId="family" caption="Deluxe four-bed" photos={roomPhotos.family} />
        </div>
      </Section>
      <Section>
        <p className="room-includes"><strong>Every room includes</strong> air conditioning, an ensuite bathroom, WiFi, filtered water, a private balcony or patio, and garden and pool access.</p>
      </Section>
      <RoomCompare />
      <Section decor={<div className="blob" style={{ top: "10%", right: "-6%", width: 320, height: 320, background: "radial-gradient(circle,#E3A24C,transparent 70%)" }} />}>
        <Building />
      </Section>
      <Section tint>
        <PolicyCard hint />
        <p className="route-note">See the FAQ for our <Link href="/faq#cancellation">cancellation policy</Link> and <Link href="/faq#room-cost">room prices</Link>.</p>
      </Section>
      <WhyBookDirect />
      <BookCta />
    </>
  )
}
