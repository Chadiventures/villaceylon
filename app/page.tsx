import Link from "next/link"
import { Bento } from "../components/Bento"
import { BookCta } from "../components/BookCta"
import { GuideBand } from "../components/GuideCard"
import { Hero } from "../components/Hero"
import { AcIcon, GardenIcon, ShowerIcon, WifiIcon } from "../components/Icons"
import { Palm } from "../components/Palm"
import { PlaceholderImage } from "../components/PlaceholderImage"
import { Section } from "../components/Section"
import { WhyBookDirect } from "../components/WhyBookDirect"
import { IMAGES } from "../lib/images"

const roomPreview = IMAGES.rooms.double[0]

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section tint id="rooms">
        <div className="rooms-grid">
          <div className="arch">
            <PlaceholderImage src={roomPreview.src} alt={roomPreview.alt} sizes="(max-width: 860px) 100vw, 55vw" />
            <span className="cap">The room, opening to the garden</span>
          </div>
          <div className="room-copy">
            <p className="eyebrow">The rooms</p>
            <h2>Six doubles and<br />a family room</h2>
            <p className="lead" style={{ fontSize: "1.1rem" }}>Seven rooms around the garden and pool. Six deluxe doubles upstairs, each thirty four square metres with a king bed and a private balcony, and one four-bed family room on the ground floor.</p>
            <ul className="specs">
              <li><AcIcon />Air conditioning</li>
              <li><WifiIcon />Wired internet and wifi</li>
              <li><ShowerIcon />Ensuite bathroom</li>
              <li><GardenIcon />Private balcony, garden and pool view</li>
            </ul>
            <p className="price">from $65 <small>/ night, two guests</small></p>
            <Link className="btn btn-solid" href="/rooms">See the rooms</Link>
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
          <p className="eyebrow">On site</p>
          <h2>Your home under the palms</h2>
          <p className="lead">Brand new AC rooms to slip into after the sun, a pool ringed with green, and the sea just past the gate. Everything you need, and nothing you have to think about.</p>
        </div>
        <Bento />
      </Section>
      <WhyBookDirect />
      <GuideBand />
      <BookCta />
    </>
  )
}
