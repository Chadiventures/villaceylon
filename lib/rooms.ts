// TODO: confirm real price with client
export const FAMILY_ROOM_RATE = 90

export const ROOM_TYPES = [
  { id: "double", name: "Deluxe Double", rate: 65, capacityPerRoom: 2, maxRooms: 6, subtitle: "King bed, up to 2 guests" },
  { id: "family", name: "Deluxe Four-Bed", rate: FAMILY_ROOM_RATE, capacityPerRoom: 4, maxRooms: 1, subtitle: "King plus bunk, up to 4 guests" },
] as const

export type RoomId = (typeof ROOM_TYPES)[number]["id"]
export type RoomQty = Record<RoomId, number>

export function nightlyTotal(qty: RoomQty) {
  return ROOM_TYPES.reduce((sum, room) => sum + (qty[room.id] || 0) * room.rate, 0)
}

export function guestCap(qty: RoomQty) {
  return ROOM_TYPES.reduce((sum, room) => sum + (qty[room.id] || 0) * room.capacityPerRoom, 0)
}

export function roomCount(qty: RoomQty) {
  return ROOM_TYPES.reduce((sum, room) => sum + (qty[room.id] || 0), 0)
}

export function staySummary(qty: RoomQty, guests: number) {
  const rooms = ROOM_TYPES.filter((room) => (qty[room.id] || 0) > 0).map((room) => `${qty[room.id]} ${room.name}`)
  const guestLabel = `${guests} ${guests === 1 ? "guest" : "guests"}`
  return `${rooms.join(" + ")} · ${guestLabel}`
}
