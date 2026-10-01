'use client'
import { formatPrice, type Currency } from "../lib/currency"
import { useCurrency } from "./CurrencyContext"

const options: Currency[] = ["USD", "EUR", "LKR"]

export function CurrencyToggle({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency()
  return (
    <div className={["currency-toggle", className].filter(Boolean).join(" ")} role="group" aria-label="Choose display currency">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={option === currency ? "on" : ""}
          aria-pressed={option === currency}
          onClick={() => setCurrency(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export function Price({ usd, suffix }: { usd: number; suffix?: string }) {
  const { currency } = useCurrency()
  return (
    <>
      {formatPrice(usd, currency)}
      {currency !== "USD" ? <span className="price-usd-note"> (USD ${usd})</span> : null}
      {suffix ? ` ${suffix}` : null}
    </>
  )
}
