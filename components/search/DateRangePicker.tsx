'use client'
import { useEffect, useState } from "react"
import { copy, nightLabel } from "../../lib/copy"
import { useLocale } from "../useLocale"
import {
  MIN_STAY_NIGHTS,
  addDays,
  addMonths,
  buildMonthGrid,
  calendarLabels,
  fromIso,
  isCheckoutDisabled,
  isPastDate,
  nightsBetweenIso,
  sameDay,
  startOfDay,
  toIso,
} from "./dateUtils"

export type DateField = "checkin" | "checkout"

type DateRangePickerProps = {
  checkIn: string
  checkOut: string
  selecting: DateField
  layout?: "popover" | "sheet"
  onCheckIn: (iso: string) => void
  onCheckOut: (iso: string) => void
  onSelectingChange: (field: DateField) => void
  onClear: () => void
  onClose: () => void
}

export function DateRangePicker({
  checkIn,
  checkOut,
  selecting,
  layout = "popover",
  onCheckIn,
  onCheckOut,
  onSelectingChange,
  onClear,
  onClose,
}: DateRangePickerProps) {
  const locale = useLocale()
  const labels = calendarLabels(locale)
  const today = startOfDay(new Date())
  const start = checkIn ? fromIso(checkIn) : null
  const end = checkOut ? fromIso(checkOut) : null
  const [focusDate, setFocusDate] = useState<Date>(
    start ? (selecting === "checkout" ? addDays(start, MIN_STAY_NIGHTS) : start) : today,
  )
  const nights = nightsBetweenIso(checkIn, checkOut)

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }
      const moves: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }
      if (event.key in moves) {
        event.preventDefault()
        setFocusDate((current) => addDays(current, moves[event.key]))
      } else if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        pick(focusDate)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [focusDate, checkIn, checkOut, selecting])

  function isDisabled(date: Date) {
    if (selecting === "checkout") return isCheckoutDisabled(date, checkIn, today)
    return isPastDate(date, today)
  }

  function pick(date: Date) {
    if (isDisabled(date)) return
    if (selecting === "checkin" || !checkIn) {
      onCheckIn(toIso(date))
      onSelectingChange("checkout")
      return
    }
    onCheckOut(toIso(date))
  }

  const viewMonth = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1)
  const sheet = layout === "sheet"
  const sheetStart = new Date(today.getFullYear(), today.getMonth(), 1)
  const sheetMonths = Array.from({ length: 13 }, (_, index) => addMonths(sheetStart, index))

  function renderMonth(monthStart: Date, key: string) {
    const cells = buildMonthGrid(monthStart)
    const monthKey = `${monthStart.getFullYear()}-${String(monthStart.getMonth() + 1).padStart(2, "0")}`
    return (
      <div className="dr-month" key={key} data-month={monthKey}>
        <p className="dr-month-title">{labels.months[monthStart.getMonth()]} {monthStart.getFullYear()}</p>
        <div className="dr-weekdays">
          {labels.weekdays.map((label) => <span key={label}>{label}</span>)}
        </div>
        <div className="dr-grid">
          {cells.map((date, index) => {
            if (!date) return <span className="dr-cell dr-empty" key={index} />
            const disabled = isDisabled(date)
            const isStart = Boolean(start && sameDay(date, start))
            const isEnd = Boolean(end && sameDay(date, end))
            const inRange = Boolean(start && end && date > start && date < end)
            const isFocus = sameDay(date, focusDate)
            return (
              <button
                type="button"
                key={toIso(date)}
                disabled={disabled}
                tabIndex={isFocus && !disabled ? 0 : -1}
                className={["dr-cell", isStart || isEnd ? "edge" : "", inRange ? "in-range" : "", isFocus ? "is-focus" : ""].filter(Boolean).join(" ")}
                onClick={() => pick(date)}
                onFocus={() => setFocusDate(date)}
                aria-label={date.toLocaleDateString(locale === "sv" ? "sv-SE" : "en-GB", { weekday: "long", day: "numeric", month: "long" })}
                aria-pressed={isStart || isEnd}
                data-date={toIso(date)}
              >
                {date.getDate()}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const footer = (
    <div className="dr-footer">
      <span className="dr-nights" data-testid="dr-nights">
        {nights > 0 ? `${nights} ${nightLabel(locale, nights)}` : copy.search.minStay[locale]}
      </span>
      <div className="dr-actions">
        <button type="button" className="dr-clear" onClick={() => { onClear(); onSelectingChange("checkin") }}>{copy.search.clear[locale]}</button>
        <button
          type="button"
          className="btn btn-solid dr-done"
          disabled={nights < MIN_STAY_NIGHTS}
          onClick={onClose}
        >
          {copy.search.done[locale]}
        </button>
      </div>
    </div>
  )

  if (sheet) {
    return (
      <div className="dr-sheet" role="group" aria-label={selecting === "checkout" ? copy.search.chooseOut[locale] : copy.search.chooseIn[locale]} data-testid="search-datepicker">
        <div className="dr-months-scroll">
          <div className="dr-months dr-months-stack">
            {sheetMonths.map((month, index) => renderMonth(month, `sheet-${index}`))}
          </div>
        </div>
        {footer}
      </div>
    )
  }

  return (
    <div className="dr-popover" role="dialog" aria-label={selecting === "checkout" ? copy.search.chooseOut[locale] : copy.search.chooseIn[locale]} data-testid="search-datepicker">
      <div className="dr-nav">
        <button type="button" aria-label={copy.search.prevMonth[locale]} onClick={() => setFocusDate((current) => addMonths(current, -1))}>‹</button>
        <button type="button" aria-label={copy.search.nextMonth[locale]} onClick={() => setFocusDate((current) => addMonths(current, 1))}>›</button>
      </div>
      <div className="dr-months">
        {renderMonth(viewMonth, "m1")}
        {renderMonth(addMonths(viewMonth, 1), "m2")}
      </div>
      {footer}
    </div>
  )
}
