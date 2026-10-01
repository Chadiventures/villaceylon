'use client'
import { guestLabel, guestOptions, MAX_GUESTS, suggestRoomsText } from "../../lib/capacity"

export function GuestsPopover({
  guests,
  onSelect,
  stepper = false,
}: {
  guests: number
  onSelect: (value: number) => void
  stepper?: boolean
}) {
  const suggestion = suggestRoomsText(guests)
  if (stepper) {
    return (
      <div className="guests-stepper" role="group" aria-label="Choose guests">
        <div className="stepper stepper-lg">
          <button type="button" aria-label="Decrease guests" disabled={guests <= 1} onClick={() => onSelect(Math.max(1, guests - 1))}>-</button>
          <span>{guestLabel(guests)}</span>
          <button type="button" aria-label="Increase guests" disabled={guests >= MAX_GUESTS} onClick={() => onSelect(Math.min(MAX_GUESTS, guests + 1))}>+</button>
        </div>
        {suggestion ? <p className="guests-suggest">{suggestion}</p> : null}
      </div>
    )
  }
  return (
    <div className="guests-popover" role="listbox" aria-label="Choose guests">
      <ul>
        {guestOptions().map((count) => (
          <li key={count}>
            <button
              type="button"
              role="option"
              aria-selected={count === guests}
              className={count === guests ? "on" : ""}
              onClick={() => onSelect(count)}
            >
              {guestLabel(count)}
            </button>
          </li>
        ))}
      </ul>
      {suggestion ? <p className="guests-suggest">{suggestion}</p> : null}
    </div>
  )
}
