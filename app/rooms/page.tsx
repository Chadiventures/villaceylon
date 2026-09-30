import Link from "next/link"
import { Building } from "../../components/Building"
import { Cta } from "../../components/Cta"
import { AcIcon, GardenIcon, ShowerIcon, WifiIcon } from "../../components/Icons"
import { PolicyCard } from "../../components/PolicyCard"
import { RoomGallery } from "../../components/RoomGallery"
import { Section } from "../../components/Section"
import { roomPhotos } from "../../lib/photos"

export default function RoomsPage() {
  return (
    <>
      <Section id="double" top>
        <div className="rooms-grid">
          <RoomGallery roomId="double" caption="Deluxe double room" photos={roomPhotos.double} />
          <div className="room-copy">
            <p className="eyebrow">Deluxe double</p>
            <h2>A room for two,<br />up in the light</h2>
            <p className="lead" style={{ fontSize: "1.08rem" }}>Thirty four square metres with a king size bed and a private balcony over the garden and the pool. Cool, quiet and simple, the kind of room you sink into after a long day in the water.</p>
            <p className="rmeta">34 m² · King bed · Sleeps 2 · Six rooms, first and second floors</p>
            <ul className="specs">
              <li><AcIcon />Air conditioning</li>
              <li><WifiIcon />Wired internet and wifi</li>
              <li><ShowerIcon />Ensuite bathroom</li>
              <li><GardenIcon />Private balcony, garden and pool view</li>
            </ul>
            <p className="price">from $65 <small>/ night, two guests</small></p>
            <Link className="btn btn-solid" href="/book">Book this room</Link>
          </div>
        </div>
      </Section>
      <Section tint id="family">
        <div className="rooms-grid">
          <div className="room-copy">
            <p className="eyebrow">Deluxe four-bed</p>
            <h2>Room for the whole crew</h2>
            <p className="lead" style={{ fontSize: "1.08rem" }}>Our ground floor family room, thirty four square metres with a king size bed and a bunk, opening straight onto a private patio and the garden. Made for families and travelling friends who want to stay together.</p>
            <p className="rmeta">34 m² · King + bunk bed · Sleeps 4 · One room, ground floor</p>
            <ul className="specs">
              <li><AcIcon />Air conditioning</li>
              <li><WifiIcon />Wired internet and wifi</li>
              <li><ShowerIcon />Ensuite bathroom</li>
              <li><GardenIcon />Private patio, garden view</li>
            </ul>
            <p className="price">Family rate on request</p>
            <Link className="btn btn-solid" href="/book">Ask about this room</Link>
          </div>
          <RoomGallery roomId="family" caption="Deluxe four-bed room" photos={roomPhotos.family} />
        </div>
      </Section>
      <Section decor={<div className="blob" style={{ top: "10%", right: "-6%", width: 320, height: 320, background: "radial-gradient(circle,#E3A24C,transparent 70%)" }} />}>
        <Building />
      </Section>
      <Section tint>
        <PolicyCard hint />
      </Section>
      <Cta />
    </>
  )
}
