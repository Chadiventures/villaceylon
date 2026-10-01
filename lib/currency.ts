export type Currency = "USD" | "EUR" | "LKR"

/** Static indicative rates against USD. Approximate only, always label the USD figure as the real rate. */
export const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  LKR: 305,
}

export const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  LKR: "Rs",
}

export function formatPrice(usd: number, currency: Currency) {
  const value = usd * rates[currency]
  const rounded = currency === "LKR" ? Math.round(value / 10) * 10 : Math.round(value)
  return `${currencySymbols[currency]}${rounded.toLocaleString("en-US")}`
}
