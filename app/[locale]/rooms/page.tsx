import type { Metadata } from "next"
import Link from "next/link"
import { BookCta } from "../../../components/BookCta"
import { Breadcrumbs } from "../../../components/Breadcrumbs"
import { Building } from "../../../components/Building"
import { Price } from "../../../components/CurrencyToggle"
import { JsonLd } from "../../../components/JsonLd"
import { PolicyCard } from "../../../components/PolicyCard"
import { RoomCompare } from "../../../components/RoomCompare"
import { RoomGallery } from "../../../components/RoomGallery"
import { Section } from "../../../components/Section"
import { SearchBar } from "../../../components/search/SearchBar"
import { SearchLink } from "../../../components/search/SearchLink"
import { WhyBookDirect } from "../../../components/WhyBookDirect"
import { copy } from "../../../lib/copy"
import { trText } from "../../../lib/image-copy"
import { localizePath } from "../../../lib/i18n"
import { IMAGES } from "../../../lib/images"
import { getLocale } from "../../../lib/locale"
import { exampleRates } from "../../../lib/prices"
import { pageMetadata } from "../../../lib/seo"
import { site } from "../../../lib/site"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMetadata({
    title: copy.meta.roomsTitle[locale],
    description: copy.meta.roomsDescription[locale],
    path: "/rooms",
    locale,
  })
}

export default async function RoomsPage() {
  const locale = await getLocale()
  const roomPhotos = {
    double: IMAGES.rooms.double.map((image) => ({ src: image.src, alt: trText(image.alt, locale) })),
    family: IMAGES.rooms.family.map((image) => ({ src: image.src, alt: trText(image.alt, locale) })),
  }
  const roomSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "HotelRoom",
      name: "Deluxe Double",
      description: copy.rooms.schemaDouble[locale],
      occupancy: { "@type": "QuantitativeValue", maxValue: 2 },
      bed: { "@type": "BedDetails", typeOfBed: "King", numberOfBeds: 1 },
      floorSize: { "@type": "QuantitativeValue", value: 34, unitCode: "MTK" },
      offers: {
        "@type": "Offer",
        price: exampleRates.double,
        priceCurrency: "USD",
        url: `${site.url}${localizePath("/book?room=double", locale)}`,
      },
      potentialAction: { "@type": "ReserveAction", target: `${site.url}${localizePath("/book?room=double", locale)}` },
    },
    {
      "@context": "https://schema.org",
      "@type": "HotelRoom",
      name: "Deluxe Four-Bed",
      description: copy.rooms.schemaFamily[locale],
      occupancy: { "@type": "QuantitativeValue", maxValue: 4 },
      bed: [
        { "@type": "BedDetails", typeOfBed: "King", numberOfBeds: 1 },
        { "@type": "BedDetails", typeOfBed: "Bunk", numberOfBeds: 1 },
      ],
      floorSize: { "@type": "QuantitativeValue", value: 34, unitCode: "MTK" },
      offers: {
        "@type": "Offer",
        price: exampleRates.family,
        priceCurrency: "USD",
        url: `${site.url}${localizePath("/book?room=family", locale)}`,
      },
      potentialAction: { "@type": "ReserveAction", target: `${site.url}${localizePath("/book?room=family", locale)}` },
    },
  ]
  return (
    <>
      <JsonLd data={roomSchemas[0]} />
      <JsonLd data={roomSchemas[1]} />
      <Section id="double" top>
        <Breadcrumbs items={[{ name: "Rooms", path: "/rooms" }]} />
        <h1 className="sr-only">{copy.meta.roomsTitle[locale]}</h1>
        <div className="rooms-search-sticky">
          <SearchBar variant="page" />
        </div>
        <div className="rooms-grid">
          <RoomGallery roomId="double" caption={copy.rooms.doubleCaption[locale]} photos={roomPhotos.double} />
          <div className="room-copy">
            <p className="eyebrow">{copy.rooms.doubleEyebrow[locale]}</p>
            <p className="room-plain">{copy.rooms.doublePlain[locale]}</p>
            <h2><span className="visual">{locale === "sv" ? <>Ett rum för två,<br />uppe i ljuset</> : <>A room for two,<br />up in the light</>}</span></h2>
            <p className="rmeta">{copy.rooms.doubleMeta[locale]}</p>
            <p className="price">{copy.home.from[locale]} <Price usd={exampleRates.double} /> <small>{copy.rooms.perNightTwo[locale]}</small></p>
            <p className="rmeta">{copy.rooms.near[locale]} <Link href={localizePath("/guide", locale)}>{copy.rooms.seeGuide[locale]} ›</Link></p>
            <div className="btn-row">
              <SearchLink className="btn btn-amber" href="/book?room=double">{copy.rooms.availability[locale]}</SearchLink>
              <a className="btn btn-line" href={site.whatsapp} target="_blank" rel="noopener noreferrer">{copy.rooms.whatsapp[locale]}</a>
            </div>
          </div>
        </div>
      </Section>
      <Section tint id="family">
        <div className="rooms-grid">
          <div className="room-copy">
            <p className="eyebrow">{copy.rooms.familyEyebrow[locale]}</p>
            <p className="room-plain">{copy.rooms.familyPlain[locale]}</p>
            <h2><span className="visual">{copy.rooms.familyTitle[locale]}</span></h2>
            <p className="rmeta">{copy.rooms.familyMeta[locale]}</p>
            <p className="price">{copy.home.from[locale]} <Price usd={exampleRates.family} /> <small>{copy.rooms.perNightFour[locale]}</small></p>
            <div className="btn-row">
              <SearchLink className="btn btn-amber" href="/book?room=family">{copy.rooms.availability[locale]}</SearchLink>
              <a className="btn btn-line" href={site.whatsapp} target="_blank" rel="noopener noreferrer">{copy.rooms.whatsapp[locale]}</a>
            </div>
          </div>
          <RoomGallery roomId="family" caption={copy.rooms.familyCaption[locale]} photos={roomPhotos.family} />
        </div>
      </Section>
      <Section>
        <p className="room-includes"><strong>{copy.rooms.includesLead[locale]}</strong> {copy.rooms.includes[locale]}</p>
      </Section>
      <RoomCompare />
      <Section decor={<div className="blob" style={{ top: "10%", right: "-6%", width: 320, height: 320, background: "radial-gradient(circle,#E3A24C,transparent 70%)" }} />}>
        <Building />
      </Section>
      <Section tint>
        <PolicyCard hint />
        <p className="route-note">{copy.rooms.faqNote[locale]} <Link href={localizePath("/faq#cancellation", locale)}>{copy.rooms.cancelLink[locale]}</Link> {copy.rooms.and[locale]} <Link href={localizePath("/faq#room-cost", locale)}>{copy.rooms.priceLink[locale]}</Link>.</p>
      </Section>
      <WhyBookDirect />
      <BookCta />
    </>
  )
}
