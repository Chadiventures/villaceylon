import Image from "next/image"
import { copy } from "../lib/copy"
import { trText } from "../lib/image-copy"
import { getResolvedImages } from "../lib/images.server"
import { getLocale } from "../lib/locale"

const IMAGES = getResolvedImages()
const images = [IMAGES.day.dawn, IMAGES.day.breakfast, IMAGES.day.pool, IMAGES.day.afternoon, IMAGES.day.sunset, IMAGES.day.night]

export async function DayTimeline() {
  const locale = await getLocale()
  return (
    <div className="day-timeline">
      {copy.day.map((moment, index) => {
        const image = images[index]
        return (
          <div className={index % 2 === 1 ? "dt-row reverse" : "dt-row"} key={moment.time.en}>
            <div className="dt-image">
              <Image src={image.src} alt={trText(image.alt, locale)} fill sizes="(max-width: 760px) 100vw, 46vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="dt-copy">
              <p className="dt-time">{moment.time[locale]}</p>
              <h3>{moment.title[locale]}</h3>
              <p>{moment.text[locale]}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
