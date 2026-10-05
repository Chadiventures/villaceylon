'use client'
import { usePathname } from "next/navigation"
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { MAX_GUESTS } from "../../lib/capacity"
import { checkoutStillValid } from "./dateUtils"

type SearchSnapshot = {
  checkIn: string
  checkOut: string
  guests: number
}

type SearchState = SearchSnapshot & {
  setDates: (checkIn: string, checkOut: string) => void
  clearDates: () => void
  setGuests: (guests: number) => void
}

const SearchCtx = createContext<SearchState | null>(null)

function readUrlParams(): SearchSnapshot {
  if (typeof window === "undefined") return { checkIn: "", checkOut: "", guests: 2 }
  const params = new URLSearchParams(window.location.search)
  const guestsParam = Number(params.get("guests") || 0)
  return {
    checkIn: params.get("in") || params.get("checkIn") || "",
    checkOut: params.get("out") || params.get("checkOut") || "",
    guests: guestsParam >= 1 && guestsParam <= MAX_GUESTS ? guestsParam : 2,
  }
}

function writeUrlParams(next: SearchSnapshot) {
  if (typeof window === "undefined") return
  const params = new URLSearchParams(window.location.search)
  params.delete("checkIn")
  params.delete("checkOut")
  if (next.checkIn) params.set("in", next.checkIn)
  else params.delete("in")
  if (next.checkOut) params.set("out", next.checkOut)
  else params.delete("out")
  if (next.checkIn || next.checkOut || next.guests !== 2) params.set("guests", String(next.guests))
  else params.delete("guests")
  const query = params.toString()
  const url = `${window.location.pathname}${query ? `?${query}` : ""}`
  window.history.replaceState(null, "", url)
}

export function searchQuery(next: SearchSnapshot) {
  const params = new URLSearchParams()
  if (next.checkIn) params.set("in", next.checkIn)
  if (next.checkOut) params.set("out", next.checkOut)
  if (next.checkIn || next.checkOut || next.guests !== 2) params.set("guests", String(next.guests))
  return params.toString()
}

export function searchHref(path: string, next: SearchSnapshot) {
  const query = searchQuery(next)
  if (!query) return path
  const join = path.includes("?") ? "&" : "?"
  return `${path}${join}${query}`
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuestsState] = useState(2)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const initial = readUrlParams()
    setCheckIn(initial.checkIn)
    setCheckOut(checkoutStillValid(initial.checkIn, initial.checkOut) ? initial.checkOut : "")
    setGuestsState(initial.guests)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    writeUrlParams({ checkIn, checkOut, guests })
  }, [pathname, checkIn, checkOut, guests, ready])

  function setDates(nextIn: string, nextOut: string) {
    setCheckIn(nextIn)
    setCheckOut(checkoutStillValid(nextIn, nextOut) ? nextOut : "")
  }

  function clearDates() {
    setCheckIn("")
    setCheckOut("")
  }

  function setGuests(value: number) {
    setGuestsState(value)
  }

  const value = useMemo(
    () => ({ checkIn, checkOut, guests, setDates, clearDates, setGuests }),
    [checkIn, checkOut, guests],
  )

  return <SearchCtx.Provider value={value}>{children}</SearchCtx.Provider>
}

export function useSearch() {
  const ctx = useContext(SearchCtx)
  if (!ctx) throw new Error("useSearch must be used within SearchProvider")
  return ctx
}
