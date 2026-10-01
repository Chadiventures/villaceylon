// Thin wrapper around lib/capacity.ts, kept so existing imports (ROOM_TYPES with
// subtitle/rate/maxRooms field names, RoomId, RoomQty) do not all need rewriting.
// lib/capacity.ts is the single source of truth: change a number there and this
// follows automatically.
import { ROOM_TYPES as CAPACITY_ROOM_TYPES, guestCapacity, nightlyTotal as capacityNightlyTotal, roomCount as capacityRoomCount, type RoomTypeId } from "./capacity"
import type { Locale } from "./i18n"

export function roomCatalog(locale: Locale = "en") {
  return CAPACITY_ROOM_TYPES.map((room) => ({
    id: room.id,
    name: room.name,
    rate: room.priceUsd,
    capacityPerRoom: room.maxGuests,
    maxRooms: room.units,
    subtitle: room.id === "double"
      ? (locale === "sv" ? "Kingsize-säng, upp till 2 gäster" : "King bed, up to 2 guests")
      : (locale === "sv" ? "Kingsize plus våningssäng, upp till 4 gäster" : "King plus bunk, up to 4 guests"),
  }))
}

export const ROOM_TYPES = roomCatalog()

export type RoomId = RoomTypeId
export type RoomQty = Record<RoomId, number>

export function nightlyTotal(qty: RoomQty, on?: string) {
  return capacityNightlyTotal(qty, on)
}

export function guestCap(qty: RoomQty) {
  return guestCapacity(qty)
}

export function roomCount(qty: RoomQty) {
  return capacityRoomCount(qty)
}

export function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0
  const start = new Date(`${checkIn}T00:00:00`)
  const end = new Date(`${checkOut}T00:00:00`)
  const nights = (end.getTime() - start.getTime()) / 86400000
  return nights > 0 ? nights : 0
}

export function staySummary(qty: RoomQty, guests: number, locale: Locale = "en") {
  const rooms = roomCatalog(locale).filter((room) => (qty[room.id] || 0) > 0).map((room) => `${qty[room.id]} ${room.name}`)
  const guestLabel = `${guests} ${locale === "sv" ? (guests === 1 ? "gäst" : "gäster") : (guests === 1 ? "guest" : "guests")}`
  return `${rooms.join(" + ")} · ${guestLabel}`
}
