'use client'

export type PaymentChoice = "deposit" | "full"

export const BEDS24_RATE_PLAN = {
  name: "Flexible",
  cancellation: "free-5-days",
} as const

export function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0
  const start = new Date(`${checkIn}T00:00:00`)
  const end = new Date(`${checkOut}T00:00:00`)
  const nights = (end.getTime() - start.getTime()) / 86400000
  return nights > 0 ? nights : 0
}

export function quoteStay(nights: number, nightlyRate: number, choice: PaymentChoice) {
  const total = nights * nightlyRate
  if (choice === "deposit") {
    const payNow = nights > 0 ? nightlyRate : 0
    return { nights, total, payNow, atProperty: Math.max(0, total - payNow) }
  }
  return { nights, total, payNow: total, atProperty: 0 }
}

export function formatMoney(amount: number) {
  const rounded = Math.round(amount * 100) / 100
  return Number.isInteger(rounded) ? `$${rounded}` : `$${rounded.toFixed(2)}`
}

const note = "Free cancellation up to 5 days before check-in"

const options: { id: PaymentChoice; title: string; tagline: string }[] = [
  {
    id: "deposit",
    title: "Pay a deposit",
    tagline: "One night now, the rest on arrival",
  },
  {
    id: "full",
    title: "Pay in full",
    tagline: "Settle it all now, nothing on arrival",
  },
]

export function RateOptions({
  nights,
  nightlyRate,
  choice,
  onChange,
}: {
  nights: number
  nightlyRate?: number | null
  choice: PaymentChoice
  onChange: (choice: PaymentChoice) => void
}) {
  const rate = nightlyRate ?? 65
  const ready = nights > 0
  return (
    <div role="radiogroup" aria-label="Payment options">
      <p className="eyebrow" style={{ marginBottom: 12 }}>How would you like to pay</p>
      <div className="rates" style={{ gap: 14 }}>
        {options.map((option) => {
          const selected = choice === option.id
          const quote = quoteStay(nights, rate, option.id)
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={selected ? "rate on" : "rate"}
              onClick={() => onChange(option.id)}
              style={{ padding: "22px 42px 18px 20px" }}
            >
              {selected ? <span className="rate-check" style={{ top: 14, right: 14, width: 22, height: 22 }}>✓</span> : null}
              <span style={{ fontFamily: "var(--caps)", fontSize: ".68rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--brown)" }}>{option.title}</span>
              <span style={{ display: "block", fontFamily: "var(--serif)", fontSize: "1.35rem", lineHeight: 1.15, marginTop: 8 }}>{option.tagline}</span>
              <span style={{ display: "block", fontFamily: "var(--body)", fontSize: ".92rem", color: "var(--ink-2)", marginTop: 8 }}>{note}</span>
              <span style={{ display: "block", fontFamily: "var(--body)", fontSize: ".95rem", marginTop: 16 }}>
                <span style={{ fontFamily: "var(--caps)", fontSize: ".58rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--brown-2)" }}>Pay now: </span>
                {ready ? formatMoney(quote.payNow) : "Add your dates"}
              </span>
              {ready && quote && quote.atProperty > 0 ? (
                <span style={{ display: "block", fontFamily: "var(--body)", fontSize: ".95rem", marginTop: 4 }}>
                  <span style={{ fontFamily: "var(--caps)", fontSize: ".58rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--brown-2)" }}>At the property: </span>
                  {formatMoney(quote.atProperty)}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
      <p style={{ fontFamily: "var(--body)", fontSize: ".92rem", color: "var(--ink-2)", marginTop: 12 }}>
        {ready
          ? `Example based on ${nights} ${nights === 1 ? "night" : "nights"} at ${formatMoney(rate)} a night for the rooms you've chosen below.`
          : `Add your dates. The rooms you've chosen below are ${formatMoney(rate)} a night.`}
      </p>
    </div>
  )
}
