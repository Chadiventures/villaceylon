import type { ReactNode } from "react"
import { IMAGES, type ImageSlot } from "../lib/images"
import { CarIcon, ForkIcon, PalmIcon, PinIcon, SunsetIcon, WaveIcon } from "./Icons"

export type GuidePreview = {
  slug: string
  label: string
  desc: string
  icon: ReactNode
  image: ImageSlot
}

export const guidePreviews: GuidePreview[] = [
  {
    slug: "surf",
    label: "Surf & fitness",
    desc: "Breaks from beginner to reef, the best months, and yoga, pilates and gym studios nearby.",
    icon: <WaveIcon />,
    image: IMAGES.guide.surf,
  },
  {
    slug: "eat",
    label: "Eat & drink",
    desc: "Brunch, wood-fired pizza, beach bars and local curries, from Ahangama to Mirissa and Weligama.",
    icon: <ForkIcon />,
    image: IMAGES.guide.eat,
  },
  {
    slug: "things-to-do",
    label: "Things to do",
    desc: "Stilt fishermen at dawn, snorkelling with turtles, spas and a little nightlife.",
    icon: <SunsetIcon />,
    image: IMAGES.guide.things,
  },
  {
    slug: "day-trips",
    label: "Day trips",
    desc: "Galle Fort, tea country and Yala safari.",
    icon: <CarIcon />,
    image: IMAGES.guide.dayTrips,
  },
  {
    slug: "getting-here",
    label: "Getting here",
    desc: "From Colombo or Mattala by car, or the slow coastal train to Ahangama station.",
    icon: <PinIcon />,
    image: IMAGES.guide.gettingHere,
  },
  {
    slug: "good-things-to-know",
    label: "Good things to know",
    desc: "Tap water, getting around, cash, temple etiquette and the street dogs.",
    icon: <PalmIcon />,
    image: IMAGES.guide.goodToKnow,
  },
]
