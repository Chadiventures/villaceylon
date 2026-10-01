'use client'
import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Currency } from "../lib/currency"

type Ctx = { currency: Currency; setCurrency: (value: Currency) => void }

const CurrencyCtx = createContext<Ctx>({ currency: "USD", setCurrency: () => {} })

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD")
  useEffect(() => {
    const saved = window.localStorage.getItem("ptCurrency") as Currency | null
    if (saved === "USD" || saved === "EUR" || saved === "LKR") setCurrency(saved)
  }, [])
  const update = (value: Currency) => {
    setCurrency(value)
    window.localStorage.setItem("ptCurrency", value)
  }
  return <CurrencyCtx.Provider value={{ currency, setCurrency: update }}>{children}</CurrencyCtx.Provider>
}

export function useCurrency() {
  return useContext(CurrencyCtx)
}
