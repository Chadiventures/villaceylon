import { SITE_URL } from "./site"

export function llmsTxt() {
  return [
    "The Papaya Tree",
    "",
    "A seven-room boutique garden hotel in Ahangama, Sri Lanka, a three-minute walk from Kabalana beach.",
    "",
    "Rooms start from $65 a night for a Deluxe Double and $90 a night for the Deluxe Four-Bed family room. Book direct for the best rate, with free cancellation up to 5 days before check-in.",
    "",
    "Pages:",
    `${SITE_URL}/`,
    `${SITE_URL}/rooms`,
    `${SITE_URL}/house`,
    `${SITE_URL}/faq`,
    `${SITE_URL}/book`,
    "",
  ].join("\n")
}
