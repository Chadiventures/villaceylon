"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { localizeHref } from "../../lib/i18n"
import { useLocale } from "../useLocale"
import { searchHref, useSearch } from "./SearchContext"

export function SearchLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  const locale = useLocale()
  const { checkIn, checkOut, guests } = useSearch()
  return <Link className={className} href={localizeHref(searchHref(href, { checkIn, checkOut, guests }), locale)}>{children}</Link>
}
