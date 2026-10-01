import Image from "next/image"
import { IMAGES } from "../lib/images"

type Moment = { time: string; title: string; text: string; image: { src: string; alt: string } }

const moments: Moment[] = [
  {
    time: "Dawn",
    title: "First light on the water",
    text: "The garden is quiet. A few guests are already gone, boards under their arms, down the lane to Kabalana before the wind picks up.",
    image: IMAGES.day.dawn,
  },
  {
    time: "Morning",
    title: "Breakfast, slowly",
    text: "Fruit, eggs, good coffee, on the ground floor with the doors open to the garden. No rush. Nobody here is on a schedule.",
    image: IMAGES.day.breakfast,
  },
  {
    time: "Midday",
    title: "The pool, or nothing at all",
    text: "The heat settles in. Most people are in the pool, in a hammock, or back in their room with the AC on and a book open.",
    image: IMAGES.day.pool,
  },
  {
    time: "Afternoon",
    title: "Out, or still in",
    text: "Some days it's a tuk-tuk to Galle Fort or lunch in Mirissa. Other days it's just the garden, and that is enough.",
    image: IMAGES.day.afternoon,
  },
  {
    time: "Sunset",
    title: "Up on the roof",
    text: "The rooftop bar fills slowly as the light goes gold, then pink. It's the one appointment most guests keep every day.",
    image: IMAGES.day.sunset,
  },
  {
    time: "Night",
    title: "Easy and early",
    text: "Dinner in or out, then bed with the ceiling fan on and the sea somewhere in the dark past the gate. Tomorrow starts the same way.",
    image: IMAGES.day.night,
  },
]

export function DayTimeline() {
  return (
    <div className="day-timeline">
      {moments.map((moment, index) => (
        <div className={index % 2 === 1 ? "dt-row reverse" : "dt-row"} key={moment.time}>
          <div className="dt-image">
            <Image src={moment.image.src} alt={moment.image.alt} fill sizes="(max-width: 760px) 100vw, 46vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="dt-copy">
            <p className="dt-time">{moment.time}</p>
            <h3>{moment.title}</h3>
            <p>{moment.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
