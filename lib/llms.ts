import { exampleRates } from "./prices"
import { SITE_URL } from "./site"

export function llmsTxt() {
  return [
    "The Papaya Tree",
    "",
    "A seven-room boutique garden hotel in Ahangama, Sri Lanka, a three-minute walk from Kabalana beach.",
    "Six Deluxe Doubles are on the first and second floors: 34 square metres, king size bed, private balcony, air conditioning, internet cable and WiFi, bathroom, view of the garden and pool.",
    "One Deluxe Four-Bed is on the ground floor: 34 square metres, king size bed plus bunk bed, private patio, air conditioning, internet cable and WiFi, bathroom, view of the garden (not the pool).",
    "Ground floor: reception, lounge, restaurant, workspace, WiFi. Roof: lounge and bar.",
    "",
    `Prices are displayed in USD and charged in LKR: from $${exampleRates.double} a night for a Deluxe Double and $${exampleRates.family} a night for the Deluxe Four-Bed. Minimum stay is two nights. Book direct for the best rate, with free cancellation up to 5 days before arrival.`,
    "",
    "The site is in English.",
    "",
    "Pages:",
    `${SITE_URL}/`,
    `${SITE_URL}/rooms`,
    `${SITE_URL}/house`,
    `${SITE_URL}/faq`,
    `${SITE_URL}/book`,
    `${SITE_URL}/guide`,
    "",
  ].join("\n")
}
