/**
 * Beds24 channel manager integration. Server-only: reads secret env vars, so never
 * import this from a 'use client' component.
 *
 * Every method below is a stub. Wiring this up for real is a later task: fill in the
 * TODOs with calls to Beds24's API, then set BOOKING_MODE=beds24 so the rest of the
 * app starts using it (see ../booking.ts). Nothing else in the UI needs to change.
 *
 * Required env vars (see .env.example):
 *   BEDS24_API_KEY     Beds24 API key for this property.
 *   BEDS24_PROPERTY_ID Beds24 property ID for The Papaya Tree.
 *   BEDS24_ROOM_IDS    Comma separated map of our room ids to Beds24 room ids, e.g.
 *                      "double:111222,family:111223" (our room ids are defined in
 *                      lib/rooms.ts).
 */
import type {
  AvailabilityParams,
  AvailabilityResult,
  BookingProvider,
  BookingRef,
  CreateBookingParams,
  Quote,
  QuoteParams,
} from "./provider"

function requireConfig() {
  const apiKey = process.env.BEDS24_API_KEY
  const propertyId = process.env.BEDS24_PROPERTY_ID
  const roomIds = process.env.BEDS24_ROOM_IDS
  if (!apiKey || !propertyId || !roomIds) {
    throw new Error("Beds24 is not configured yet. Set BEDS24_API_KEY, BEDS24_PROPERTY_ID and BEDS24_ROOM_IDS.")
  }
  return { apiKey, propertyId, roomIds }
}

export const beds24Provider: BookingProvider = {
  async getAvailability(params: AvailabilityParams): Promise<AvailabilityResult> {
    requireConfig()
    // TODO: call Beds24's availability endpoint for params.roomId between
    // params.checkIn and params.checkOut.
    throw new Error("Beds24 getAvailability is not implemented yet.")
  },

  async getQuote(params: QuoteParams): Promise<Quote> {
    requireConfig()
    // TODO: call Beds24's rates endpoint for params.rooms and compute nights, nightly
    // total, taxes and fees, and the grand total.
    throw new Error("Beds24 getQuote is not implemented yet.")
  },

  async createBooking(params: CreateBookingParams): Promise<BookingRef> {
    requireConfig()
    // TODO: call Beds24's booking creation endpoint with params, return its booking
    // reference and status.
    throw new Error("Beds24 createBooking is not implemented yet.")
  },

  async getBooking(ref: string): Promise<BookingRef> {
    requireConfig()
    // TODO: call Beds24's booking lookup endpoint for ref.
    throw new Error("Beds24 getBooking is not implemented yet.")
  },

  async cancelBooking(ref: string): Promise<{ ok: boolean }> {
    requireConfig()
    // TODO: call Beds24's cancellation endpoint for ref.
    throw new Error("Beds24 cancelBooking is not implemented yet.")
  },
}
