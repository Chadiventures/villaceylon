'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { formatPrice } from "../lib/currency"
import { useCurrency } from "./CurrencyContext"
import { submitBooking } from "../lib/booking"
import { copy, fitMessage, nightLabel } from "../lib/copy"
import { guestCap, nightlyTotal, roomCount, staySummary, type RoomId, type RoomQty } from "../lib/rooms"
import { capacityHelperText, suggestRoomsText } from "../lib/capacity"
import { useSearch } from "./search/SearchContext"
import { formatDateLabel, nightsBetweenIso } from "./search/dateUtils"
import { site } from "../lib/site"
import { RoomGuestPicker } from "./RoomGuestPicker"
import { useLocale } from "./useLocale"

export function BookingForm() {
  const params = useSearchParams()
  const locale = useLocale()
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
  const nightly = nightlyTotal(roomQty, checkIn || undefined)
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
    if (!ready) next.dates = copy.form.datesMissing[locale]
    if (guests > cap) next.guests = fitMessage(locale, cap, guests)
    if (!name.trim()) next.name = copy.form.nameMissing[locale]
    if (!email.trim()) next.email = copy.form.emailMissing[locale]
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
      roomSummary: staySummary(roomQty, guests, locale),
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
          <p className="form-hint">{formatDateLabel(checkIn, locale)} {copy.form.to[locale]} {formatDateLabel(checkOut, locale)} · {nights} {nightLabel(locale, nights)}</p>
        ) : (
          <p className="form-error" role="alert">{copy.form.datesMissing[locale]}</p>
        )}
        <div className="room-field">
          {copy.form.rooms[locale]}
          <RoomGuestPicker
            roomQty={roomQty}
            guests={guests}
            onRoomQty={changeRooms}
            onGuests={(count) => { setGuests(count); setSent(false) }}
          />
          <p className="form-hint">{capacityHelperText(undefined, locale)}</p>
          {suggestRoomsText(guests, locale) ? <p className="form-hint">{suggestRoomsText(guests, locale)}</p> : null}
          {guests > cap ? (
            <span className="form-error" role="alert">{fitMessage(locale, cap, guests)}</span>
          ) : errors.guests ? (
            <span className="form-error" role="alert">{errors.guests}</span>
          ) : null}
        </div>
        <label>
          {copy.form.name[locale]}
          <input type="text" name="name" placeholder={copy.form.namePh[locale]} required autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); setSent(false) }} aria-invalid={Boolean(errors.name)} />
          {errors.name ? <span className="form-error" role="alert">{errors.name}</span> : null}
        </label>
        <label>
          {copy.form.email[locale]}
          <input type="email" name="email" inputMode="email" autoComplete="email" placeholder="you@email.com" required value={email} onChange={(event) => { setEmail(event.target.value); setSent(false) }} aria-invalid={Boolean(errors.email)} />
          {errors.email ? <span className="form-error" role="alert">{errors.email}</span> : null}
        </label>
        <label>
          {copy.form.note[locale]}
          <textarea name="note" placeholder={copy.form.notePh[locale]} value={note} onChange={(event) => setNote(event.target.value)} />
        </label>
        <div className="price-summary">
          {ready ? (
            <>
              <p>
                {nights} {nightLabel(locale, nights)} × {formatPrice(nightly, currency)} <span className="price-usd-note">({formatPrice(nightly, "USD")})</span> = <strong>{formatPrice(total, currency)}</strong>
              </p>
              <p className="form-hint">{copy.form.taxes[locale]}</p>
              <p className="form-hint">{copy.form.freeCancel[locale]}</p>
            </>
          ) : (
            <p>{copy.form.addDates[locale]}</p>
          )}
          <p className="form-hint">{copy.form.live[locale]}</p>
        </div>
        <button className="btn btn-solid" type="submit" disabled={!canBook} aria-disabled={!canBook} style={{ width: "100%", justifyContent: "center" }}>
          {canBook ? copy.form.book[locale] : copy.form.availability[locale]}
        </button>
        {!canBook ? <p className="form-hint">{copy.form.continue[locale]}</p> : null}
        {sent ? (
          <p className="form-success" role="status">{copy.form.thanks[locale]}</p>
        ) : null}
      </form>
      <p className="form-alt">
        {copy.form.questions[locale]} <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">{copy.form.message[locale]}</a>
      </p>
    </div>
  )
}
