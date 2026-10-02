import type { Metadata } from "next"
import Link from "next/link"
import { Bento } from "../../components/Bento"
import { BookCta } from "../../components/BookCta"
import { Price } from "../../components/CurrencyToggle"
import { GuideBand } from "../../components/GuideCard"
import { Hero } from "../../components/Hero"
import { AcIcon, GardenIcon, ShowerIcon, WifiIcon } from "../../components/Icons"
import { Palm } from "../../components/Palm"
import { PlaceholderImage } from "../../components/PlaceholderImage"
import { Section } from "../../components/Section"
import { BookDirectStrip } from "../../components/BookDirectStrip"
import { copy } from "../../lib/copy"
import { trText } from "../../lib/image-copy"
import { localizePath } from "../../lib/i18n"
import { getResolvedImages } from "../../lib/images.server"
import { getLocale } from "../../lib/locale"
import { exampleRates } from "../../lib/prices"
import { pageMetadata } from "../../lib/seo"

const IMAGES = getResolvedImages()
const roomPreview = IMAGES.rooms.double[0]

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMetadata({
    title: copy.meta.homeTitle[locale],
    description: copy.meta.homeDescription[locale],
    path: "/",
    locale,
    absoluteTitle: true,
  })
}

export default async function HomePage() {
  const locale = await getLocale()
  return (
    <>
      <Hero />
      <Section tint id="rooms">
        <div className="rooms-grid">
          <div className="arch">
            <PlaceholderImage src={roomPreview.src} alt={trText(roomPreview.alt, locale)} sizes="(max-width: 860px) 100vw, 55vw" />
            <span className="cap">{copy.home.roomCaption[locale]}</span>
          </div>
          <div className="room-copy">
            <p className="eyebrow">{copy.home.roomsEyebrow[locale]}</p>
            <h2>{locale === "sv" ? <>Sex dubbelrum och<br />ett familjerum</> : <>Six doubles and<br />a family room</>}</h2>
            <p className="lead" style={{ fontSize: "1.1rem" }}>{copy.home.roomsLead[locale]}</p>
            <ul className="specs">
              <li><AcIcon />{copy.home.specAc[locale]}</li>
              <li><WifiIcon />{copy.home.specNet[locale]}</li>
              <li><ShowerIcon />{copy.home.specBath[locale]}</li>
              <li><GardenIcon />{copy.home.specOutdoor[locale]}</li>
            </ul>
            <p className="price">{copy.home.from[locale]} <Price usd={exampleRates.double} /> <small>{copy.home.perNightTwo[locale]}</small></p>
            <Link className="btn btn-solid" href={localizePath("/rooms", locale)}>{copy.home.seeRooms[locale]}</Link>
          </div>
        </div>
      </Section>
      <Section
        id="house"
        decor={
          <>
            <div className="blob" style={{ top: "8%", right: "-5%", width: 340, height: 340, background: "radial-gradient(circle,#E3A24C,transparent 70%)" }} />
            <Palm style={{ bottom: -30, left: -50 }} />
          </>
        }
      >
        <div className="section-head">
          <p className="eyebrow">{copy.home.onSite[locale]}</p>
          <h2>{copy.home.houseTitle[locale]}</h2>
          <p className="lead">{copy.home.houseLead[locale]}</p>
        </div>
        <Bento />
      </Section>
      <BookDirectStrip />
      <GuideBand />
      <BookCta />
    </>
  )
}
