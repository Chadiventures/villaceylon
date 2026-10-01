import { IMAGES } from "../lib/images"
import { CoolIcon, ForkIcon, SurfMinIcon } from "./Icons"
import { PlaceholderImage } from "./PlaceholderImage"

const poolPhoto = IMAGES.home.pool
const surfPhoto = IMAGES.home.surf
const restaurantPhoto = IMAGES.home.restaurant
const roomPhoto = IMAGES.rooms.double[0]

export function Bento() {
  return (
    <div className="bento">
      <div className="big">
        <PlaceholderImage src={poolPhoto.src} alt={poolPhoto.alt} sizes="(max-width: 820px) 100vw, 50vw" />
        <span className="cap">The pool, ringed with green</span>
      </div>
      <div className="tile">
        <div className="tile-photo">
          <PlaceholderImage src={surfPhoto.src} alt={surfPhoto.alt} sizes="(max-width: 820px) 50vw, 25vw" />
        </div>
        <SurfMinIcon />
        <h3>The sea, three minutes on</h3>
        <p>The waves and the little town both a barefoot walk or a short tuk-tuk from the gate.</p>
      </div>
      <div className="tile">
        <div className="tile-photo">
          <PlaceholderImage src={restaurantPhoto.src} alt={restaurantPhoto.alt} sizes="(max-width: 820px) 50vw, 25vw" />
        </div>
        <ForkIcon />
        <h3>Restaurant and rooftop bar</h3>
        <p>Lazy breakfasts on the ground floor, and a cold drink on the roof as the sun drops into the sea.</p>
      </div>
      <div className="tile">
        <div className="tile-photo">
          <PlaceholderImage src={roomPhoto.src} alt={roomPhoto.alt} sizes="(max-width: 820px) 50vw, 25vw" />
        </div>
        <CoolIcon />
        <h3>Sleep well</h3>
        <p>Air conditioning, fresh linen and cold filtered water.</p>
      </div>
      <div className="tile dark">
        <div className="q">Wake, swim, wander down to the waves, and let the day find its own slow shape.</div>
        <div className="qs">A day at the Papaya Tree</div>
      </div>
    </div>
  )
}
