import { copy } from "../lib/copy"
import { trText } from "../lib/image-copy"
import { getResolvedImages } from "../lib/images.server"
import { getLocale } from "../lib/locale"
import { DeskIcon, PoolIcon, SunsetIcon } from "./Icons"
import { PlaceholderImage } from "./PlaceholderImage"

const IMAGES = getResolvedImages()
const entrancePhoto = IMAGES.house.entrance
const rooftopPhoto = IMAGES.home.rooftop
const poolPhoto = IMAGES.home.pool

export async function Building() {
  const locale = await getLocale()
  return (
    <>
      <div className="section-head">
        <p className="eyebrow">{copy.building.eyebrow[locale]}</p>
        <h2>{copy.building.title[locale]}</h2>
        <p className="lead">{copy.building.lead[locale]}</p>
      </div>
      <div className="grid3">
        <div className="card4">
          <div className="card-photo">
            <PlaceholderImage src={entrancePhoto.src} alt={trText(entrancePhoto.alt, locale)} sizes="(max-width: 720px) 100vw, 30vw" />
          </div>
          <DeskIcon />
          <h3>{copy.building.groundTitle[locale]}</h3>
          <p>{copy.building.ground[locale]}</p>
        </div>
        <div className="card4">
          <div className="card-photo">
            <PlaceholderImage src={rooftopPhoto.src} alt={trText(rooftopPhoto.alt, locale)} sizes="(max-width: 720px) 100vw, 30vw" />
          </div>
          <SunsetIcon />
          <h3>{copy.building.roofTitle[locale]}</h3>
          <p>{copy.building.roof[locale]}</p>
        </div>
        <div className="card4">
          <div className="card-photo">
            <PlaceholderImage src={poolPhoto.src} alt={trText(poolPhoto.alt, locale)} sizes="(max-width: 720px) 100vw, 30vw" />
          </div>
          <PoolIcon />
          <h3>{copy.building.gardenTitle[locale]}</h3>
          <p>{copy.building.garden[locale]}</p>
        </div>
      </div>
    </>
  )
}
