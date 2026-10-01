import { IMAGES } from "../lib/images"
import { CoolIcon, ForkIcon, GardenIcon, SurfMinIcon } from "./Icons"
import { PlaceholderImage } from "./PlaceholderImage"

const cards = [
  { icon: <SurfMinIcon />, title: "Pool", text: "A quiet pool in the garden, open all day.", image: IMAGES.house.pool },
  { icon: <ForkIcon />, title: "Restaurant", text: "Breakfast and easy plates downstairs, whenever you're hungry.", image: IMAGES.house.restaurant },
  { icon: <CoolIcon />, title: "Rooftop", text: "A cold drink and the best sunset seat in the house.", image: IMAGES.house.rooftop },
  { icon: <GardenIcon />, title: "Garden", text: "Papaya and palm, with a hammock if you want one.", image: IMAGES.house.garden },
]

export function HouseFeatureCards() {
  return (
    <div className="house-cards">
      {cards.map((card) => (
        <div className="house-card" key={card.title}>
          <div className="house-card-photo">
            <PlaceholderImage src={card.image.src} alt={card.image.alt} sizes="(max-width: 820px) 50vw, 25vw" />
          </div>
          <span className="house-card-icon" aria-hidden="true">{card.icon}</span>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </div>
      ))}
    </div>
  )
}
