"use client"

import { useEffect, useId, useRef, useState } from "react"
import { formatPrice, type Currency } from "../lib/currency"
import { copy } from "../lib/copy"
import { useCurrency } from "./CurrencyContext"
import { useLocale } from "./useLocale"

const options: Currency[] = ["USD", "EUR", "LKR"]

export function CurrencyToggle({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency()
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    rootRef.current?.querySelector<HTMLButtonElement>(`[data-index="${active}"]`)?.focus()
  }, [open, active])

  function openMenu() {
    setActive(Math.max(0, options.indexOf(currency)))
    setOpen(true)
  }

  function choose(next: Currency) {
    setCurrency(next)
    setOpen(false)
    buttonRef.current?.focus()
  }

  function onButtonKey(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openMenu()
    }
  }

  function onListKey(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault()
      setOpen(false)
      buttonRef.current?.focus()
    } else if (event.key === "ArrowDown") {
      event.preventDefault()
      setActive((index) => (index + 1) % options.length)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActive((index) => (index - 1 + options.length) % options.length)
    } else if (event.key === "Home") {
      event.preventDefault()
      setActive(0)
    } else if (event.key === "End") {
      event.preventDefault()
      setActive(options.length - 1)
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      choose(options[active])
    } else if (event.key === "Tab") {
      setOpen(false)
    }
  }

  return (
    <div className={["currency-menu", className].filter(Boolean).join(" ")} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="currency-menu-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={copy.nav.currency[locale]}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onButtonKey}
      >
        {currency}
        <span aria-hidden="true">▾</span>
      </button>
      {open ? (
        <ul id={listId} className="currency-menu-list" role="listbox" aria-label={copy.nav.currency[locale]} onKeyDown={onListKey}>
          {options.map((option, index) => (
            <li key={option} role="presentation">
              <button
                type="button"
                role="option"
                data-index={index}
                aria-selected={option === currency}
                className={option === currency ? "on" : ""}
                onClick={() => choose(option)}
                onMouseEnter={() => setActive(index)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
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
