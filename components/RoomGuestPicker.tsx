'use client'
import { useEffect, useRef, useState } from "react"
import { BottomSheet } from "./BottomSheet"
import { useMediaQuery } from "./useMediaQuery"
import { copy, guestWord, roomWord } from "../lib/copy"
import { roomCatalog, guestCap, roomCount, staySummary, type RoomId, type RoomQty } from "../lib/rooms"
import { useLocale } from "./useLocale"

function PickerBody({
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
  const locale = useLocale()
  const cap = Math.max(1, guestCap(roomQty))
  const totalRooms = roomCount(roomQty)
  return (
    <div className="room-picker-panel">
      {roomCatalog(locale).map((room) => {
        const count = roomQty[room.id] || 0
        const onlyRoom = count === 1 && totalRooms === 1
        return (
          <div className="room-row" key={room.id}>
            <div>
              <h3>{room.name}</h3>
              <p>{room.subtitle} · {room.maxRooms} {roomWord(locale, room.maxRooms)}</p>
            </div>
            <div className="stepper stepper-lg">
              <button type="button" aria-label={`${copy.form.lessRooms[locale]} ${room.name}`} disabled={count <= 0 || onlyRoom} onClick={() => onRoomQty(room.id, count - 1)}>-</button>
              <span>{count}</span>
              <button type="button" aria-label={`${copy.form.moreRooms[locale]} ${room.name}`} disabled={count >= room.maxRooms} onClick={() => onRoomQty(room.id, count + 1)}>+</button>
            </div>
          </div>
        )
      })}
      <div className="room-picker-rule" />
      <div className="room-row">
        <div>
          <h3>{copy.form.guests[locale]}</h3>
          <p>{copy.form.upTo[locale]} {cap} {guestWord(locale, cap)}</p>
        </div>
        <div className="stepper stepper-lg">
          <button type="button" aria-label={copy.search.lessGuests[locale]} disabled={guests <= 1} onClick={() => onGuests(guests - 1)}>-</button>
          <span>{guests}</span>
          <button type="button" aria-label={copy.search.moreGuests[locale]} disabled={guests >= cap} onClick={() => onGuests(guests + 1)}>+</button>
        </div>
      </div>
    </div>
  )
}

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
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 760px)")
  useEffect(() => {
    if (!open || isMobile) return
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [open, isMobile])
  return (
    <div className="room-picker" ref={rootRef}>
      <button type="button" className="room-picker-trigger" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {staySummary(roomQty, guests, locale)}
      </button>
      {open && !isMobile ? (
        <div>
          <PickerBody roomQty={roomQty} guests={guests} onRoomQty={onRoomQty} onGuests={onGuests} />
          <button type="button" className="btn btn-solid" onClick={() => setOpen(false)} style={{ justifyContent: "center", width: "100%", marginTop: 12 }}>{copy.form.done[locale]}</button>
        </div>
      ) : null}
      {open && isMobile ? (
        <BottomSheet
          title={copy.form.picker[locale]}
          onClose={() => setOpen(false)}
          footer={<button type="button" className="btn btn-solid sheet-done" onClick={() => setOpen(false)}>{copy.form.done[locale]}</button>}
        >
          <PickerBody roomQty={roomQty} guests={guests} onRoomQty={onRoomQty} onGuests={onGuests} />
        </BottomSheet>
      ) : null}
    </div>
  )
}
