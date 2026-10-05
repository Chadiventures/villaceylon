import { site } from "./site"

export type BookingParams = {
  name: string
  email: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  roomSummary: string
  note: string
  payment: "deposit" | "full"
  dueNights: number
  balanceNights: number
}

function formatDate(value: string) {
  if (!value) return ""
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

function buildMessage(params: BookingParams) {
  const lines = [
    "Hi! I'd like to check availability at The Papaya Tree.",
    params.name ? `Name: ${params.name}` : null,
    `Check in: ${formatDate(params.checkIn) || "-"}`,
    `Check out: ${formatDate(params.checkOut) || "-"}`,
    `Nights: ${params.nights}`,
    params.payment === "deposit"
      ? `Payment: ${params.dueNights} nights now, ${params.balanceNights} nights at the hotel`
      : `Payment: whole stay now (${params.dueNights} nights)`,
    `Rooms: ${params.roomSummary}`,
    `Guests: ${params.guests}`,
    params.note ? `Note: ${params.note}` : null,
  ]
  return lines.filter(Boolean).join("\n")
}

export function whatsAppUrl(params: BookingParams) {
  const message = buildMessage(params)
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export function mailtoUrl(params: BookingParams) {
  const subject = `Booking enquiry: ${formatDate(params.checkIn) || "dates"} to ${formatDate(params.checkOut) || ""}`
  const body = buildMessage(params)
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/**
 * Submits a booking. Today this is a temporary fallback: it opens a prefilled
 * WhatsApp chat in a new tab, browser-side only, so the booking button is never dead
 * while no real provider is connected.
 *
 * The real integration seam lives in lib/booking/provider.ts (the BookingProvider
 * interface) and lib/booking/beds24.ts (the Beds24 implementation, currently a stub).
 * Once Beds24 is configured and BOOKING_MODE=beds24 is set, swap the body of this
 * function for a call to beds24Provider.createBooking(...) and keep the same
 * signature, so BookingForm and StickyBookBar never have to change.
 */
export function submitBooking(params: BookingParams) {
  if (typeof window !== "undefined") {
    window.open(whatsAppUrl(params), "_blank", "noopener,noreferrer")
  }
  return { ok: true as const }
}
