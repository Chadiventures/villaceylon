"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { LOCALE_COOKIE, isLocale, localizePath, localeFromPath, stripLocale, type Locale } from "../lib/i18n"
import { FlagGb, FlagSv } from "./Flags"
import { useLocale } from "./useLocale"

const options: { locale: Locale; label: string; Flag: typeof FlagGb }[] = [
  { locale: "en", label: "English", Flag: FlagGb },
  { locale: "sv", label: "Svenska", Flag: FlagSv },
]

function writeLocaleCookie(next: Locale) {
  const secure = window.location.protocol === "https:" ? ";Secure" : ""
  document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;SameSite=Lax${secure}`
  window.localStorage.setItem("ptLocale", next)
}

export function LanguageSwitcher({ labelled = false }: { labelled?: boolean }) {
  const locale = useLocale()
  const path = usePathname() || "/"
  const router = useRouter()

  useEffect(() => {
    const saved = window.localStorage.getItem("ptLocale")
    const hasCookie = document.cookie.split(";").some((part) => part.trim().startsWith(`${LOCALE_COOKIE}=`))
    if (hasCookie || !isLocale(saved) || saved === localeFromPath(path)) return
    writeLocaleCookie(saved)
    router.replace(`${localizePath(stripLocale(path), saved)}${window.location.search}${window.location.hash}`)
  }, [path, router])

  function choose(next: Locale) {
    if (next === locale) return
    writeLocaleCookie(next)
    router.push(`${localizePath(stripLocale(path), next)}${window.location.search}${window.location.hash}`)
  }

  return (
    <div className={labelled ? "lang-switch labelled" : "lang-switch"} role="group" aria-label={locale === "sv" ? "Språk" : "Language"}>
      {options.map((option) => (
        <button
          key={option.locale}
          type="button"
          className={option.locale === locale ? "on" : ""}
          aria-pressed={option.locale === locale}
          aria-label={option.label}
          onClick={() => choose(option.locale)}
        >
          <option.Flag />
          {labelled ? <span>{option.label}</span> : null}
        </button>
      ))}
    </div>
  )
}
