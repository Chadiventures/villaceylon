import { copy } from "../lib/copy"
import { trText } from "../lib/image-copy"
import { IMAGES } from "../lib/images"
import { getLocale } from "../lib/locale"
import { CoolIcon, ForkIcon, GardenIcon, SurfMinIcon } from "./Icons"
import { PlaceholderImage } from "./PlaceholderImage"

export async function HouseFeatureCards() {
  const locale = await getLocale()
  const cards = [
    { icon: <SurfMinIcon />, title: copy.houseCards.poolTitle[locale], text: copy.houseCards.pool[locale], image: IMAGES.house.pool },
    { icon: <ForkIcon />, title: copy.houseCards.restaurantTitle[locale], text: copy.houseCards.restaurant[locale], image: IMAGES.house.restaurant },
    { icon: <CoolIcon />, title: copy.houseCards.roofTitle[locale], text: copy.houseCards.roof[locale], image: IMAGES.house.rooftop },
    { icon: <GardenIcon />, title: copy.houseCards.gardenTitle[locale], text: copy.houseCards.garden[locale], image: IMAGES.house.garden },
  ]
  return (
    <div className="house-cards">
      {cards.map((card) => (
        <div className="house-card" key={card.title}>
          <div className="house-card-photo">
            <PlaceholderImage src={card.image.src} alt={trText(card.image.alt, locale)} sizes="(max-width: 820px) 50vw, 25vw" />
          </div>
          <span className="house-card-icon" aria-hidden="true">{card.icon}</span>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </div>
      ))}
    </div>
  )
}
