'use client'
import { useState } from "react"
import { guestCap, nightlyTotal, type RoomId, type RoomQty } from "../lib/rooms"
import { BEDS24_RATE_PLAN, formatMoney, nightsBetween, quoteStay, RateOptions, type PaymentChoice } from "./RateOptions"
import { RoomGuestPicker } from "./RoomGuestPicker"

export function BookingForm() {
  const [sent, setSent] = useState(false)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [roomQty, setRoomQty] = useState<RoomQty>({ double: 1, family: 0 })
  const [guests, setGuests] = useState(2)
  const [choice, setChoice] = useState<PaymentChoice>("deposit")
  const nights = nightsBetween(checkIn, checkOut)
  const nightly = nightlyTotal(roomQty)
  const quote = quoteStay(nights, nightly, choice)
  const ready = quote.nights > 0
  function changeRooms(id: RoomId, count: number) {
    const next = { ...roomQty, [id]: count }
    const cap = Math.max(1, guestCap(next))
    setRoomQty(next)
    setGuests((current) => Math.min(Math.max(1, current), cap))
    setSent(false)
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
    <RateOptions nights={nights} nightlyRate={nightly} choice={choice} onChange={(next) => { setChoice(next); setSent(false) }} />
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault()
        if (!ready) return
        setSent(true)
      }}
    >
      <div className="r2">
        <label>Check in<input type="date" name="in" required value={checkIn} onChange={(event) => { setCheckIn(event.target.value); setSent(false) }} /></label>
        <label>Check out<input type="date" name="out" required value={checkOut} onChange={(event) => { setCheckOut(event.target.value); setSent(false) }} /></label>
      </div>
      <div className="room-field">
        Rooms
        <RoomGuestPicker
          roomQty={roomQty}
          guests={guests}
          onRoomQty={changeRooms}
          onGuests={(count) => { setGuests(count); setSent(false) }}
        />
      </div>
      <label>Name<input type="text" name="name" placeholder="Your name" required /></label>
      <label>Email<input type="email" name="email" placeholder="you@email.com" required /></label>
      <label>Anything we should know<textarea name="note" placeholder="Arrival time, surf plans, anything at all" /></label>
      <input type="hidden" name="paymentChoice" value={choice} />
      <input type="hidden" name="beds24RatePlan" value={BEDS24_RATE_PLAN.name} />
      <input type="hidden" name="payNow" value={ready ? quote.payNow : ""} />
      <input type="hidden" name="balance" value={ready ? quote.atProperty : ""} />
      <input type="hidden" name="nights" value={nights} />
      <input type="hidden" name="nightlyRate" value={nightly} />
      <input type="hidden" name="doubleRooms" value={roomQty.double} />
      <input type="hidden" name="familyRooms" value={roomQty.family} />
      <input type="hidden" name="guests" value={guests} />
      <button className="btn btn-solid" type="submit" disabled={!ready} style={{ width: "100%", justifyContent: "center", opacity: ready ? 1 : 0.55 }}>
        {ready ? `Pay ${formatMoney(quote.payNow)} and reserve` : "Choose your dates"}
      </button>
      <p style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "var(--brown-2)" }}>
        {sent
          ? choice === "deposit"
            ? quote.atProperty > 0
              ? `Deposit saved. PayHere charges ${formatMoney(quote.payNow)} now. The remaining ${formatMoney(quote.atProperty)} is due on arrival, and we send a PayHere link for it. Free cancellation up to 5 days before check-in.`
              : `Deposit saved. PayHere charges ${formatMoney(quote.payNow)} now. Free cancellation up to 5 days before check-in.`
            : `Pay in full saved. PayHere charges ${formatMoney(quote.payNow)} now. Nothing is due on arrival. Free cancellation up to 5 days before check-in.`
          : "Same cancellation either way. PayHere charges one night, or the full stay. A deposit balance is collected by a PayHere link, not in cash."}
      </p>
    </form>
    </div>
  )
}
