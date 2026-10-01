/**
 * Example nightly rates in USD. Real prices are not set yet.
 *
 * Change `exampleRates` for the default rate, or add a season to `priceSeasons`.
 * The first season whose range includes the night wins, so put narrower seasons
 * above the year-round example.
 *
 * Dates are MM-DD (repeats every year) or YYYY-MM-DD (one year).
 * A range may cross New Year, for example start "11-01" and end "04-15".
 */

export const exampleRates = {
  double: 65,
  family: 90,
} as const

export type ExampleRoomId = keyof typeof exampleRates

export type PriceSeason = {
  id: string
  start: string
  end: string
  rates: { double: number; family: number }
}

export const priceSeasons: PriceSeason[] = [
  {
    id: "example",
    start: "01-01",
    end: "12-31",
    rates: { double: exampleRates.double, family: exampleRates.family },
  },
]

function monthDay(value: string | Date): string {
  if (value instanceof Date) {
    const month = String(value.getMonth() + 1).padStart(2, "0")
    const day = String(value.getDate()).padStart(2, "0")
    return `${month}-${day}`
  }
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(5, 10)
  return value.slice(0, 5)
}

function inSeason(start: string, end: string, day: string) {
  const from = monthDay(start)
  const to = monthDay(end)
  if (from <= to) return day >= from && day <= to
  return day >= from || day <= to
}

/** Nightly example rate in USD. Uses the first matching season, otherwise `exampleRates`. */
export function nightlyUsd(roomId: ExampleRoomId, on?: string | Date): number {
  if (on) {
    const day = monthDay(on)
    for (const season of priceSeasons) {
      if (inSeason(season.start, season.end, day)) return season.rates[roomId]
    }
  }
  return exampleRates[roomId]
}

/** Lowest example or seasonal rate, for "from" prices. */
export function fromNightlyUsd(roomId: ExampleRoomId): number {
  return Math.min(exampleRates[roomId], ...priceSeasons.map((season) => season.rates[roomId]))
}
