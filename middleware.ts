import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { LEGACY_REDIRECTS, LOCALE_COOKIE, isLocale, localizePath, stripLocale } from "./lib/i18n"

function isAsset(pathname: string) {
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) return true
  if (pathname === "/icon" || pathname === "/apple-icon" || pathname.startsWith("/icon/") || pathname.startsWith("/apple-icon/")) return true
  if (pathname === "/opengraph-image" || pathname.startsWith("/opengraph-image")) return true
  if (pathname === "/manifest.webmanifest" || pathname === "/robots.txt" || pathname === "/sitemap.xml" || pathname === "/llms.txt") return true
  return /\.[a-zA-Z0-9]+$/.test(pathname)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (isAsset(pathname)) return NextResponse.next()

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    if (request.headers.get("x-pt-rewrite") === "1") return NextResponse.next()
    const url = request.nextUrl.clone()
    url.pathname = pathname === "/en" ? "/" : pathname.slice(3) || "/"
    return NextResponse.redirect(url)
  }

  const cookie = request.cookies.get(LOCALE_COOKIE)?.value
  const preferred = isLocale(cookie) ? cookie : null
  const hasSv = pathname === "/sv" || pathname.startsWith("/sv/")
  const bare = stripLocale(pathname)
  const legacy = LEGACY_REDIRECTS[bare]
  if (legacy) {
    const locale = preferred === "en" ? "en" : hasSv || preferred === "sv" ? "sv" : "en"
    const url = request.nextUrl.clone()
    url.pathname = localizePath(legacy, locale)
    return NextResponse.redirect(url, 308)
  }

  if (preferred === "sv" && !hasSv) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === "/" ? "/sv" : `/sv${pathname}`
    return NextResponse.redirect(url)
  }
  if (preferred === "en" && hasSv) {
    const url = request.nextUrl.clone()
    url.pathname = bare
    return NextResponse.redirect(url)
  }

  const headers = new Headers(request.headers)
  headers.set("x-locale", hasSv ? "sv" : "en")
  headers.set("x-pathname", pathname)
  headers.set("x-pt-rewrite", "1")

  if (!hasSv) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === "/" ? "/en" : `/en${pathname}`
    return NextResponse.rewrite(url, { request: { headers } })
  }

  const response = NextResponse.next({ request: { headers } })
  if (!preferred) {
    response.cookies.set(LOCALE_COOKIE, "sv", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" })
  }
  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
}
