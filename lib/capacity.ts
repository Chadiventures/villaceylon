/**
 * Single source of truth for room capacity. Every guest picker, price summary,
 * validation message and room suggestion on the site reads from here. Change a
 * number here and the whole UI follows, with no other edits needed.
 */

export type RoomTypeId = "double" | "family"

export type RoomType = {
  id: RoomTypeId
  name: string
  units: number
  maxGuests: number
  priceUsd: number
}

export const ROOM_TYPES: RoomType[] = [
  { id: "double", name: "Deluxe Double", units: 6, maxGuests: 2, priceUsd: 65 },
  { id: "family", name: "Deluxe Four-Bed", units: 1, maxGuests: 4, priceUsd: 90 },
]

export const MAX_GUESTS = ROOM_TYPES.reduce((sum, room) => sum + room.units * room.maxGuests, 0)

export type RoomQty = Partial<Record<RoomTypeId, number>>

export function roomType(id: RoomTypeId): RoomType {
  const found = ROOM_TYPES.find((room) => room.id === id)
  if (!found) throw new Error(`Unknown room type: ${id}`)
  return found
}

export function guestLabel(count: number) {
  return `${count} ${count === 1 ? "guest" : "guests"}`
}

export function guestOptions(): number[] {
  return Array.from({ length: MAX_GUESTS }, (_, i) => i + 1)
}

export function roomCount(qty: RoomQty): number {
  return ROOM_TYPES.reduce((sum, room) => sum + (qty[room.id] || 0), 0)
}

export function guestCapacity(qty: RoomQty): number {
  return ROOM_TYPES.reduce((sum, room) => sum + (qty[room.id] || 0) * room.maxGuests, 0)
}

export function nightlyTotal(qty: RoomQty): number {
  return ROOM_TYPES.reduce((sum, room) => sum + (qty[room.id] || 0) * room.priceUsd, 0)
}

/**
 * Helper line describing what we have on hand. Pass availability (per room id) once
 * Beds24's getAvailability() is live to show real numbers for the chosen dates;
 * without it, this falls back to the full config (units in lib/capacity.ts).
 */
export function capacityHelperText(availability?: Partial<Record<RoomTypeId, number>>): string {
  const parts = ROOM_TYPES.map((room) => {
    const count = availability?.[room.id] ?? room.units
    const namePart = count === 1 ? room.name : `${room.name}s`
    return `${count} ${namePart} (${room.maxGuests} guests each)`
  })
  const prefix = availability ? "Available now" : "We have"
  return `${prefix}: ${parts.join(" and ")}.`
}

export function shortRoomName(room: RoomType, count = 1) {
  const base = room.id === "family" ? "Four-Bed" : room.name
  return count === 1 ? base : `${base}s`
}

/** Hero search helper: "6 Deluxe Doubles (2 guests each) and 1 Four-Bed (4 guests)." */
export function capacityHelperShort(availability?: Partial<Record<RoomTypeId, number>>): string {
  const parts = ROOM_TYPES.map((room) => {
    const count = availability?.[room.id] ?? room.units
    const namePart = shortRoomName(room, count)
    const guestBit = count === 1 ? `(${room.maxGuests} guests)` : `(${room.maxGuests} guests each)`
    return `${count} ${namePart} ${guestBit}`
  })
  return `${parts.join(" and ")}.`
}

type Combo = { d: number; f: number; rooms: number; waste: number }

function doubleType() {
  return roomType("double")
}
function familyType() {
  return roomType("family")
}

function feasibleCombos(guests: number): Combo[] {
  const dMax = doubleType().units
  const fMax = familyType().units
  const dCap = doubleType().maxGuests
  const fCap = familyType().maxGuests
  const combos: Combo[] = []
  for (let f = 0; f <= fMax; f++) {
    for (let d = 0; d <= dMax; d++) {
      if (d === 0 && f === 0) continue
      const cap = d * dCap + f * fCap
      if (cap >= guests) {
        combos.push({ d, f, rooms: d + f, waste: cap - guests })
      }
    }
  }
  return combos
}

function comboToLabel(combo: Combo): string {
  const parts: string[] = []
  if (combo.d > 0) parts.push(`${combo.d} ${doubleType().name}${combo.d === 1 ? "" : "s"}`)
  if (combo.f > 0) parts.push(`${combo.f} ${familyType().name}${combo.f === 1 ? "" : "s"}`)
  return parts.join(" + ")
}

/**
 * Suggests the best one or two room combinations that fit `guests`, using the fewest
 * rooms possible. Returns plain combo objects (not just strings) so the Book page can
 * preselect them in the room picker. Returns an empty array if guests exceeds
 * MAX_GUESTS or is 0 or less.
 */
export function suggestRooms(guests: number): { label: string; rooms: RoomQty }[] {
  if (guests <= 0 || guests > MAX_GUESTS) return []
  const combos = feasibleCombos(guests)
  if (!combos.length) return []

  combos.sort((a, b) => a.rooms - b.rooms || a.waste - b.waste)
  const primary = combos[0]

  const alternatives = combos
    .filter((c) => c.rooms > primary.rooms && !(c.d === primary.d && c.f === primary.f))
    .sort((a, b) => a.rooms - b.rooms || a.waste - b.waste)
  const secondary = alternatives.find((c) => c.waste <= primary.waste)

  const chosen = secondary ? [primary, secondary] : [primary]
  return chosen.map((combo) => ({
    label: comboToLabel(combo),
    rooms: { double: combo.d, family: combo.f },
  }))
}

/** "Suggested: 1 Deluxe Four-Bed, or 2 Deluxe Doubles." for the guests field. */
export function suggestRoomsText(guests: number): string {
  const suggestions = suggestRooms(guests)
  if (!suggestions.length) return ""
  return `Suggested: ${suggestions.map((s) => s.label).join(", or ")}.`
}
