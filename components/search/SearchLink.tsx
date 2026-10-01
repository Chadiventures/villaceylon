'use client'
import Link from "next/link"
import type { ReactNode } from "react"
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
  const { checkIn, checkOut, guests } = useSearch()
  return <Link className={className} href={searchHref(href, { checkIn, checkOut, guests })}>{children}</Link>
}
