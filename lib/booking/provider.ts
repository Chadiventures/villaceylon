/**
 * The shape every booking backend must implement. Today the UI does not call any of
 * this yet (see ../booking.ts for the current WhatsApp fallback): this is the seam a
 * real provider (Beds24 first) plugs into later without the UI needing to change.
 */

export type AvailabilityParams = {
  checkIn: string
  checkOut: string
  roomId: string
}

export type AvailabilityResult = {
  available: boolean
  unitsLeft?: number
}

export type QuoteParams = {
  checkIn: string
  checkOut: string
  rooms: Record<string, number>
  guests: number
}

export type Quote = {
  nights: number
  currency: string
  nightlyTotal: number
  taxesAndFees: number
  total: number
}

export type CreateBookingParams = {
  checkIn: string
  checkOut: string
  rooms: Record<string, number>
  guests: number
  name: string
  email: string
  note?: string
}

export type BookingStatus = "confirmed" | "pending" | "cancelled"

export type BookingRef = {
  ref: string
  status: BookingStatus
}

export interface BookingProvider {
  getAvailability(params: AvailabilityParams): Promise<AvailabilityResult>
  getQuote(params: QuoteParams): Promise<Quote>
  createBooking(params: CreateBookingParams): Promise<BookingRef>
  getBooking(ref: string): Promise<BookingRef>
  cancelBooking(ref: string): Promise<{ ok: boolean }>
}
