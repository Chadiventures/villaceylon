'use client'
import { useEffect, useRef, useState } from "react"
import { ROOM_TYPES, guestCap, roomCount, staySummary, type RoomId, type RoomQty } from "../lib/rooms"

export function RoomGuestPicker({
  roomQty,
  guests,
  onRoomQty,
  onGuests,
}: {
  roomQty: RoomQty
  guests: number
  onRoomQty: (id: RoomId, count: number) => void
  onGuests: (count: number) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const cap = Math.max(1, guestCap(roomQty))
  const totalRooms = roomCount(roomQty)
  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [open])
  return (
    <div className="room-picker" ref={rootRef}>
      <button type="button" className="room-picker-trigger" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {staySummary(roomQty, guests)}
      </button>
      {open ? (
        <div className="room-picker-panel">
          {ROOM_TYPES.map((room) => {
            const count = roomQty[room.id] || 0
            const onlyRoom = count === 1 && totalRooms === 1
            return (
              <div className="room-row" key={room.id}>
                <div>
                  <h3>{room.name}</h3>
                  <p>{room.subtitle} · {room.maxRooms} {room.maxRooms === 1 ? "room" : "rooms"}</p>
                </div>
                <div className="stepper">
                  <button type="button" aria-label={`Decrease ${room.name} rooms`} disabled={count <= 0 || onlyRoom} onClick={() => onRoomQty(room.id, count - 1)}>-</button>
                  <span>{count}</span>
                  <button type="button" aria-label={`Increase ${room.name} rooms`} disabled={count >= room.maxRooms} onClick={() => onRoomQty(room.id, count + 1)}>+</button>
                </div>
              </div>
            )
          })}
          <div className="room-picker-rule" />
          <div className="room-row">
            <div>
              <h3>Guests</h3>
              <p>Up to {cap} {cap === 1 ? "guest" : "guests"}</p>
            </div>
            <div className="stepper">
              <button type="button" aria-label="Decrease guests" disabled={guests <= 1} onClick={() => onGuests(guests - 1)}>-</button>
              <span>{guests}</span>
              <button type="button" aria-label="Increase guests" disabled={guests >= cap} onClick={() => onGuests(guests + 1)}>+</button>
            </div>
          </div>
          <button type="button" className="btn btn-solid" onClick={() => setOpen(false)} style={{ justifyContent: "center" }}>Done</button>
        </div>
      ) : null}
    </div>
  )
}
