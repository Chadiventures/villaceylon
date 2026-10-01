"use client"

import { usePathname } from "next/navigation"
import { localeFromPath } from "../lib/i18n"

export function useLocale() {
  return localeFromPath(usePathname() || "/")
}
