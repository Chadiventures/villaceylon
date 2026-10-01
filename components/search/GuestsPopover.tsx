'use client'
import { guestLabel, guestOptions, MAX_GUESTS, suggestRoomsText } from "../../lib/capacity"
import { copy } from "../../lib/copy"
import { useLocale } from "../useLocale"

export function GuestsPopover({
  guests,
  onSelect,
  stepper = false,
}: {
  guests: number
  onSelect: (value: number) => void
  stepper?: boolean
}) {
  const locale = useLocale()
  const suggestion = suggestRoomsText(guests, locale)
  if (stepper) {
    return (
      <div className="guests-stepper" role="group" aria-label={copy.search.chooseGuests[locale]}>
        <div className="stepper stepper-lg">
          <button type="button" aria-label={copy.search.lessGuests[locale]} disabled={guests <= 1} onClick={() => onSelect(Math.max(1, guests - 1))}>-</button>
          <span>{guestLabel(guests, locale)}</span>
          <button type="button" aria-label={copy.search.moreGuests[locale]} disabled={guests >= MAX_GUESTS} onClick={() => onSelect(Math.min(MAX_GUESTS, guests + 1))}>+</button>
        </div>
        {suggestion ? <p className="guests-suggest">{suggestion}</p> : null}
      </div>
    )
  }
  return (
    <div className="guests-popover" role="listbox" aria-label={copy.search.chooseGuests[locale]}>
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
              {guestLabel(count, locale)}
            </button>
          </li>
        ))}
      </ul>
      {suggestion ? <p className="guests-suggest">{suggestion}</p> : null}
    </div>
  )
}
