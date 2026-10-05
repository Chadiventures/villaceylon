'use client'
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { capacityHelperShort, guestLabel, roomType, suggestRooms, type RoomQty } from "../../lib/capacity"
import { copy, nightLabel } from "../../lib/copy"
import { localizeHref } from "../../lib/i18n"
import { BottomSheet } from "../BottomSheet"
import { useLocale } from "../useLocale"
import { useMediaQuery } from "../useMediaQuery"
import { GuestsPopover } from "./GuestsPopover"
import { useSearch } from "./SearchContext"
import { MIN_STAY_NIGHTS, checkoutStillValid, formatDateLabel, nightsBetweenIso } from "./dateUtils"
import type { DateField } from "./DateRangePicker"

const DateRangePicker = dynamic(() => import("./DateRangePicker").then((mod) => ({ default: mod.DateRangePicker })), { ssr: false })

type Panel = "dates" | "guests" | null

function RoomComboLinks({ rooms }: { rooms: RoomQty }) {
  const locale = useLocale()
  const parts: { href: string; count: number; name: string }[] = []
  if (rooms.double) {
    const room = roomType("double")
    parts.push({
      href: localizeHref("/rooms#double", locale),
      count: rooms.double,
      name: rooms.double === 1 ? room.name : `${room.name}s`,
    })
  }
  if (rooms.family) {
    const room = roomType("family")
    parts.push({
      href: localizeHref("/rooms#family", locale),
      count: rooms.family,
      name: rooms.family === 1 ? room.name : `${room.name}s`,
    })
  }
  return (
    <>
      {parts.map((part, index) => (
        <span key={part.href}>
          {index > 0 ? " + " : null}
          {part.count}{" "}
          <Link href={part.href}>{part.name}</Link>
        </span>
      ))}
    </>
  )
}

function HeroSuggestions({ guests }: { guests: number }) {
  const locale = useLocale()
  const suggestions = suggestRooms(guests)
  if (!suggestions.length) return null
  return (
    <p className="search-helper-line search-helper-suggest">
      {copy.search.suggested[locale]}{" "}
      {suggestions.map((suggestion, index) => (
        <span key={suggestion.label}>
          {index > 0 ? copy.search.or[locale] : null}
          <RoomComboLinks rooms={suggestion.rooms} />
        </span>
      ))}
      .
    </p>
  )
}

export function SearchBar({ variant = "page" }: { variant?: "hero" | "page" | "sticky" }) {
  const router = useRouter()
  const locale = useLocale()
  const { checkIn, checkOut, guests, setDates, clearDates, setGuests } = useSearch()
  const [panel, setPanel] = useState<Panel>(null)
  const [selecting, setSelecting] = useState<DateField>("checkin")
  const [guestsChanged, setGuestsChanged] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 760px)")
  const nights = nightsBetweenIso(checkIn, checkOut)
  const ready = nights >= MIN_STAY_NIGHTS

  useEffect(() => {
    if (!panel || isMobile) return
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setPanel(null)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setPanel(null)
    }
    const timer = window.setTimeout(() => {
      document.addEventListener("mousedown", onPointerDown)
    }, 0)
    document.addEventListener("keydown", onKey)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [panel, isMobile])

  function openDates(field: DateField) {
    if (field === "checkout" && !checkIn) {
      setSelecting("checkin")
      setPanel("dates")
      return
    }
    setSelecting(field)
    setPanel("dates")
  }

  function handleCheckIn(iso: string) {
    const keepOut = checkoutStillValid(iso, checkOut)
    setDates(iso, keepOut ? checkOut : "")
    setSelecting("checkout")
    setPanel("dates")
  }

  function handleCheckOut(iso: string) {
    if (!checkoutStillValid(checkIn, iso)) return
    setDates(checkIn, iso)
    setPanel(null)
  }

  function onSubmit() {
    if (!ready) {
      openDates(checkIn ? "checkout" : "checkin")
      return
    }
    router.push(localizeHref("/book", locale))
  }

  const datePicker = (
    <DateRangePicker
      checkIn={checkIn}
      checkOut={checkOut}
      selecting={selecting}
      layout={isMobile ? "sheet" : "popover"}
      onCheckIn={handleCheckIn}
      onCheckOut={handleCheckOut}
      onSelectingChange={setSelecting}
      onClear={() => { clearDates(); setSelecting("checkin") }}
      onClose={() => setPanel(null)}
    />
  )

  return (
    <div className={`search-wrap search-wrap-${variant}`} ref={rootRef}>
      <div className={`search-bar search-bar-${variant}`}>
        <div className="search-dates-group">
          <button
            type="button"
            className={panel === "dates" && selecting === "checkin" ? "search-cell is-open" : "search-cell"}
            onClick={() => openDates("checkin")}
            aria-haspopup="dialog"
            aria-expanded={panel === "dates" && selecting === "checkin"}
            data-testid="search-checkin"
          >
            <span className="search-label">{copy.search.checkIn[locale]}</span>
            <span className={checkIn ? "search-value" : "search-value is-empty"}>{checkIn ? formatDateLabel(checkIn, locale) : copy.search.addDate[locale]}</span>
          </button>
          <button
            type="button"
            className={panel === "dates" && selecting === "checkout" ? "search-cell is-open" : "search-cell"}
            onClick={() => openDates("checkout")}
            aria-haspopup="dialog"
            aria-expanded={panel === "dates" && selecting === "checkout"}
            data-testid="search-checkout"
          >
            <span className="search-label">{copy.search.checkOut[locale]}</span>
            <span className="search-field-value">
              <span className={checkOut ? "search-value" : "search-value is-empty"}>{checkOut ? formatDateLabel(checkOut, locale) : copy.search.addDate[locale]}</span>
              {nights > 0 ? <span className="search-nights">{nights} {nightLabel(locale, nights)}</span> : null}
            </span>
          </button>
          {panel === "dates" && !isMobile ? datePicker : null}
        </div>
        <div className="search-guests-group">
          <button
            type="button"
            className={panel === "guests" ? "search-cell is-open" : "search-cell"}
            onClick={() => setPanel((current) => (current === "guests" ? null : "guests"))}
            aria-haspopup="listbox"
            aria-expanded={panel === "guests"}
            data-testid="search-guests"
          >
            <span className="search-label">{copy.search.guests[locale]}</span>
            <span className="search-value">{guestLabel(guests, locale)}</span>
          </button>
          {panel === "guests" && !isMobile ? (
            <GuestsPopover
              guests={guests}
              onSelect={(value) => {
                setGuests(value)
                setGuestsChanged(true)
                setPanel(null)
              }}
            />
          ) : null}
        </div>
        <button type="button" className="search-submit" onClick={onSubmit} data-testid="search-submit">
          {copy.search.availability[locale]}
        </button>
      </div>
      {variant === "hero" ? (
        <div className="search-helper" data-testid="search-helper">
          <p className="search-helper-line search-helper-capacity">{capacityHelperShort(undefined, locale)}</p>
          {guestsChanged ? <HeroSuggestions guests={guests} /> : null}
        </div>
      ) : null}
      {panel === "dates" && isMobile ? (
        <BottomSheet title={selecting === "checkout" ? copy.search.chooseOut[locale] : copy.search.chooseIn[locale]} onClose={() => setPanel(null)}>
          {datePicker}
        </BottomSheet>
      ) : null}
      {panel === "guests" && isMobile ? (
        <BottomSheet
          title={copy.search.guests[locale]}
          onClose={() => setPanel(null)}
          footer={
            <button type="button" className="btn btn-solid sheet-done" onClick={() => setPanel(null)}>{copy.search.done[locale]}</button>
          }
        >
          <GuestsPopover
            guests={guests}
            stepper
            onSelect={(value) => {
              setGuests(value)
              setGuestsChanged(true)
            }}
          />
        </BottomSheet>
      ) : null}
    </div>
  )
}
