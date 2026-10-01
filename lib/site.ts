import { fromNightlyUsd } from "./prices"

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://thepapayatree.com"

export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Munidasa+Mawatha+Ahangama+80650+Sri+Lanka"

export const site = {
  name: "The Papaya Tree",
  url: SITE_URL,
  email: "hello@thepapayatree.com",
  phone: "+94 78 716 3242",
  phoneE164: "+94787163242",
  whatsapp: "https://wa.me/94787163242",
  instagram: "https://instagram.com/thepapayatree_ahangama",
  instagramHandle: "@thepapayatree_ahangama",
  address: {
    street: "Munidasa Mawatha",
    locality: "Ahangama",
    postalCode: "80650",
    country: "LK",
    countryName: "Sri Lanka",
    full: "Munidasa Mawatha, Ahangama 80650, Sri Lanka",
    line: "Munidasa Mawatha, Ahangama 80650, Ahangama, Sri Lanka",
  },
  mapsUrl: MAPS_URL,
  // TODO: replace with the exact Google Maps pin for The Papaya Tree
  geo: { lat: 5.9736, lng: 80.3622 },
  priceFrom: fromNightlyUsd("double"),
  rooms: 7,
  checkIn: "14:00",
  checkOut: "11:00",
  season: "November to April",
  ogImage: "/og/home.jpg",
  guideUpdated: "October 2026",
} as const

/**
 * FYLL_I: these are intentionally blank. Fill them in with the real rating value,
 * review count, source and guest quotes before RatingBadge and schema ratings turn on.
 * Nothing renders until every required field below is set, so no number is ever invented.
 */
export const trust = {
  ratingValue: "" as string, // FYLL_I: e.g. "4.9"
  reviewCount: "" as string, // FYLL_I: e.g. "128"
  ratingSourceLabel: "" as string, // FYLL_I: e.g. "Google Reviews"
  ratingSourceUrl: "" as string, // FYLL_I: link to the review source
  reviews: [] as { quote: string; name: string; country: string; photo?: string }[], // FYLL_I: real guest quotes only
}

export function hasRating() {
  return Boolean(trust.ratingValue && trust.reviewCount && trust.ratingSourceUrl)
}

export function hasReviews() {
  return trust.reviews.length > 0
}
