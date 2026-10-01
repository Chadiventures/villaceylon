import { cache } from "react"
import { headers } from "next/headers"
import { isLocale, type Locale } from "./i18n"

export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await headers()).get("x-locale")
  return isLocale(value) ? value : "en"
})

export const getRequestPath = cache(async (): Promise<string> => {
  const value = (await headers()).get("x-pathname")
  return value && value.startsWith("/") ? value : "/"
})
