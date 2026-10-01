import { copy } from "../lib/copy"
import { trText } from "../lib/image-copy"
import { IMAGES } from "../lib/images"
import { getLocale } from "../lib/locale"
import { CoolIcon, ForkIcon, SurfMinIcon } from "./Icons"
import { PlaceholderImage } from "./PlaceholderImage"

const poolPhoto = IMAGES.home.pool
const surfPhoto = IMAGES.home.surf
const restaurantPhoto = IMAGES.home.restaurant
const roomPhoto = IMAGES.rooms.double[0]

export async function Bento() {
  const locale = await getLocale()
  return (
    <div className="bento">
      <div className="big">
        <PlaceholderImage src={poolPhoto.src} alt={trText(poolPhoto.alt, locale)} sizes="(max-width: 820px) 100vw, 50vw" />
        <span className="cap">{copy.bento.pool[locale]}</span>
      </div>
      <div className="tile">
        <div className="tile-photo">
          <PlaceholderImage src={surfPhoto.src} alt={trText(surfPhoto.alt, locale)} sizes="(max-width: 820px) 50vw, 25vw" />
        </div>
        <SurfMinIcon />
        <h3>{copy.bento.seaTitle[locale]}</h3>
        <p>{copy.bento.sea[locale]}</p>
      </div>
      <div className="tile">
        <div className="tile-photo">
          <PlaceholderImage src={restaurantPhoto.src} alt={trText(restaurantPhoto.alt, locale)} sizes="(max-width: 820px) 50vw, 25vw" />
        </div>
        <ForkIcon />
        <h3>{copy.bento.foodTitle[locale]}</h3>
        <p>{copy.bento.food[locale]}</p>
      </div>
      <div className="tile">
        <div className="tile-photo">
          <PlaceholderImage src={roomPhoto.src} alt={trText(roomPhoto.alt, locale)} sizes="(max-width: 820px) 50vw, 25vw" />
        </div>
        <CoolIcon />
        <h3>{copy.bento.sleepTitle[locale]}</h3>
        <p>{copy.bento.sleep[locale]}</p>
      </div>
      <div className="tile dark">
        <div className="q">{copy.bento.quote[locale]}</div>
        <div className="qs">{copy.bento.quoteBy[locale]}</div>
      </div>
    </div>
  )
}
