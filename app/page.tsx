import Link from "next/link"
import { Bento } from "../components/Bento"
import { Building } from "../components/Building"
import { Cta } from "../components/Cta"
import { GuideBand } from "../components/GuideCard"
import { Hero } from "../components/Hero"
import { AcIcon, GardenIcon, ShowerIcon, WifiIcon } from "../components/Icons"
import { Marquee } from "../components/Marquee"
import { Palm } from "../components/Palm"
import { PlaceholderImage } from "../components/PlaceholderImage"
import { Section } from "../components/Section"
import { Stats } from "../components/Stats"
import { photos } from "../lib/photos"

const roomPreview = photos.rooms.double.bedroom

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <section className="welcome">
        <Palm flip style={{ top: -20, right: -10 }} />
        <div className="wrap">
          <p className="eyebrow">A house, not a resort</p>
          <h2>The kind of place you book<br />for three nights and stay for ten.</h2>
          <div className="rule" />
          <p className="lead">Slow mornings, warm water, and the soft hum of Ahangama drifting in through the shutters. We keep it simple, so your days can be too.</p>
        </div>
      </section>
      <Stats />
      <Section tint id="rooms">
        <div className="rooms-grid">
          <div className="arch">
            <PlaceholderImage src={roomPreview} alt="Deluxe Double room with king bed and garden view at The Papaya Tree" sizes="(max-width: 860px) 100vw, 55vw" />
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
      <Section decor={<div className="blob" style={{ top: "10%", right: "-6%", width: 320, height: 320, background: "radial-gradient(circle,#E3A24C,transparent 70%)" }} />}>
        <Building />
      </Section>
      <GuideBand />
      <Cta />
    </>
  )
}
