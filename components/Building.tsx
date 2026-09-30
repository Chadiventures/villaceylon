import { DeskIcon, PoolIcon, SunsetIcon } from "./Icons"
import { PlaceholderImage } from "./PlaceholderImage"
import { photos } from "../lib/photos"

const groundFloorPhoto = photos.property.groundFloor
const rooftopPhoto = photos.rooms.double.balcony
const poolPhoto = photos.property.pool1

export function Building() {
  return (
    <>
      <div className="section-head">
        <p className="eyebrow">The building</p>
        <h2>More than a room</h2>
        <p className="lead">Seven rooms wrapped around a garden and a pool, with places to gather from the ground floor up to the roof.</p>
      </div>
      <div className="grid3">
        <div className="card4">
          <div className="card-photo">
            <PlaceholderImage src={groundFloorPhoto} alt="The Papaya Tree at night, ground floor lit beside the pool in Ahangama" sizes="(max-width: 720px) 100vw, 30vw" />
          </div>
          <DeskIcon />
          <h3>Ground floor</h3>
          <p>Reception, a lounge to sink into, a restaurant, a quiet workspace for the odd email, and fast wifi throughout.</p>
        </div>
        <div className="card4">
          <div className="card-photo">
            <PlaceholderImage src={rooftopPhoto} alt="A balcony looking into the garden at The Papaya Tree, Ahangama" sizes="(max-width: 720px) 100vw, 30vw" />
          </div>
          <SunsetIcon />
          <h3>Rooftop</h3>
          <p>A lounge and bar above the palms, made for a cold drink and a long look at the coast as the sun goes down.</p>
        </div>
        <div className="card4">
          <div className="card-photo">
            <PlaceholderImage src={poolPhoto} alt="Pool loungers beside the garden pool at The Papaya Tree, Ahangama" sizes="(max-width: 720px) 100vw, 30vw" />
          </div>
          <PoolIcon />
          <h3>Garden and pool</h3>
          <p>A pool ringed with papaya, banana and coconut palms, with shade for the hottest part of the day.</p>
        </div>
      </div>
    </>
  )
}
