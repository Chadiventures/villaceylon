'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { formatPrice } from "../lib/currency"
import { useCurrency } from "./CurrencyContext"
import { submitBooking } from "../lib/booking"
import { guestCap, nightlyTotal, roomCount, staySummary, type RoomId, type RoomQty } from "../lib/rooms"
import { capacityHelperText, suggestRoomsText } from "../lib/capacity"
import { useSearch } from "./search/SearchContext"
import { formatDateLabel, nightsBetweenIso } from "./search/dateUtils"
import { site } from "../lib/site"
import { RoomGuestPicker } from "./RoomGuestPicker"

export function BookingForm() {
  const params = useSearchParams()
  const { currency } = useCurrency()
  const { checkIn, checkOut, guests, setGuests } = useSearch()
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [roomQty, setRoomQty] = useState<RoomQty>({ double: 1, family: 0 })
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [note, setNote] = useState("")

  useEffect(() => {
    const room = params.get("room")
    const roomsDouble = Number(params.get("roomsDouble") || 0)
    const roomsFamily = Number(params.get("roomsFamily") || 0)
    if (roomsDouble > 0 || roomsFamily > 0) {
      setRoomQty({ double: roomsDouble, family: roomsFamily })
    } else if (room === "family") {
      setRoomQty({ double: 0, family: 1 })
    } else if (room === "double") {
      setRoomQty({ double: 1, family: 0 })
    }
  }, [params])

  const nights = nightsBetweenIso(checkIn, checkOut)
  const nightly = nightlyTotal(roomQty)
  const total = nights * nightly
  const cap = Math.max(1, guestCap(roomQty))
  const ready = nights > 0
  const canBook = ready && roomCount(roomQty) > 0 && guests <= cap

  function changeRooms(id: RoomId, count: number) {
    const next = { ...roomQty, [id]: count }
    const newCap = Math.max(1, guestCap(next))
    setRoomQty(next)
    setGuests(Math.min(Math.max(1, guests), newCap))
    setSent(false)
  }

  function validate() {
    const next: Record<string, string> = {}
    if (!ready) next.dates = "Choose your dates in the search bar above."
    if (guests > cap) next.guests = `These rooms fit ${cap} ${cap === 1 ? "guest" : "guests"}, you have ${guests}.`
    if (!name.trim()) next.name = "Let us know your name."
    if (!email.trim()) next.email = "Add an email so we can reply."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const honeypot = (form.elements.namedItem("company") as HTMLInputElement | null)?.value
    if (honeypot) return
    if (!validate()) {
      setSent(false)
      return
    }
    submitBooking({
      name,
      email,
      checkIn,
      checkOut,
      nights,
      guests,
      roomSummary: staySummary(roomQty, guests),
      note,
    })
    setSent(true)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <form className="form" onSubmit={onSubmit}>
        <label className="hp-field" aria-hidden="true">
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
        {ready ? (
          <p className="form-hint">{formatDateLabel(checkIn)} to {formatDateLabel(checkOut)} · {nights} {nights === 1 ? "night" : "nights"}</p>
        ) : (
          <p className="form-error" role="alert">Choose your dates in the search bar above.</p>
        )}
        <div className="room-field">
          Rooms
          <RoomGuestPicker
            roomQty={roomQty}
            guests={guests}
            onRoomQty={changeRooms}
            onGuests={(count) => { setGuests(count); setSent(false) }}
          />
          <p className="form-hint">{capacityHelperText()}</p>
          {suggestRoomsText(guests) ? <p className="form-hint">{suggestRoomsText(guests)}</p> : null}
          {guests > cap ? (
            <span className="form-error" role="alert">These rooms fit {cap} {cap === 1 ? "guest" : "guests"}, you have {guests}.</span>
          ) : errors.guests ? (
            <span className="form-error" role="alert">{errors.guests}</span>
          ) : null}
        </div>
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" required autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); setSent(false) }} aria-invalid={Boolean(errors.name)} />
          {errors.name ? <span className="form-error" role="alert">{errors.name}</span> : null}
        </label>
        <label>
          Email
          <input type="email" name="email" inputMode="email" autoComplete="email" placeholder="you@email.com" required value={email} onChange={(event) => { setEmail(event.target.value); setSent(false) }} aria-invalid={Boolean(errors.email)} />
          {errors.email ? <span className="form-error" role="alert">{errors.email}</span> : null}
        </label>
        <label>
          Anything we should know
          <textarea name="note" placeholder="Arrival time, surf plans, anything at all" value={note} onChange={(event) => setNote(event.target.value)} />
        </label>
        <div className="price-summary">
          {ready ? (
            <>
              <p>
                {nights} {nights === 1 ? "night" : "nights"} × {formatPrice(nightly, currency)} <span className="price-usd-note">({formatPrice(nightly, "USD")})</span> = <strong>{formatPrice(total, currency)}</strong>
              </p>
              <p className="form-hint">Taxes and fees included.</p>
              <p className="form-hint">Free cancellation up to 5 days before check-in.</p>
            </>
          ) : (
            <p>Add your dates to see your price.</p>
          )}
          <p className="form-hint">Live availability. Book and pay securely in one step.</p>
        </div>
        <button className="btn btn-solid" type="submit" disabled={!canBook} aria-disabled={!canBook} style={{ width: "100%", justifyContent: "center" }}>
          {canBook ? "Book now" : "Check availability"}
        </button>
        {!canBook ? <p className="form-hint">Choose your dates to continue.</p> : null}
        {sent ? (
          <p className="form-success" role="status">Thanks! Your booking details are on their way to us now.</p>
        ) : null}
      </form>
      <p className="form-alt">
        Questions? <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">Message us</a>
      </p>
    </div>
  )
}
