import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { LEGACY_REDIRECTS, LOCALE_COOKIE, stripLocale } from "./lib/i18n"

function isAsset(pathname: string) {
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) return true
  if (pathname === "/icon" || pathname === "/apple-icon" || pathname.startsWith("/icon/") || pathname.startsWith("/apple-icon/")) return true
  if (pathname === "/opengraph-image" || pathname.startsWith("/opengraph-image")) return true
  if (pathname === "/manifest.webmanifest" || pathname === "/robots.txt" || pathname === "/sitemap.xml" || pathname === "/llms.txt") return true
  return /\.[a-zA-Z0-9]+$/.test(pathname)
}

function dropLocaleCookie(response: NextResponse) {
  response.cookies.set(LOCALE_COOKIE, "", { path: "/", maxAge: 0 })
  return response
}

const PREVIEW_COOKIE = "pt_preview"
const PREVIEW_MAX_AGE = 60 * 60 * 24 * 180

function readEnv(name: string) {
  return process.env[name]
}

function previewRedirect(request: NextRequest) {
  const preview = request.nextUrl.searchParams.get("preview")
  if (preview == null) return null
  const url = request.nextUrl.clone()
  url.searchParams.delete("preview")
  if (preview === "off") {
    const response = NextResponse.redirect(url)
    response.cookies.set(PREVIEW_COOKIE, "", { path: "/", maxAge: 0, sameSite: "lax" })
    return response
  }
  const key = readEnv("PREVIEW_KEY")
  if (key && preview === key) {
    const response = NextResponse.redirect(url)
    response.cookies.set(PREVIEW_COOKIE, key, { path: "/", sameSite: "lax", maxAge: PREVIEW_MAX_AGE })
    return response
  }
  return null
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (isAsset(pathname)) return NextResponse.next()

  const preview = previewRedirect(request)
  if (preview) return preview

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    if (request.headers.get("x-pt-rewrite") === "1") return NextResponse.next()
    const url = request.nextUrl.clone()
    url.pathname = pathname === "/en" ? "/" : pathname.slice(3) || "/"
    return NextResponse.redirect(url)
  }

  const hasSv = pathname === "/sv" || pathname.startsWith("/sv/")
  const bare = stripLocale(pathname)
  const legacy = LEGACY_REDIRECTS[bare]
  if (legacy) {
    const url = request.nextUrl.clone()
    url.pathname = legacy
    return dropLocaleCookie(NextResponse.redirect(url, 308))
  }

  if (hasSv) {
    const url = request.nextUrl.clone()
    url.pathname = bare
    return dropLocaleCookie(NextResponse.redirect(url, 308))
  }

  const headers = new Headers(request.headers)
  headers.set("x-locale", "en")
  headers.set("x-pathname", pathname)
  headers.set("x-pt-rewrite", "1")

  const url = request.nextUrl.clone()
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`
  const response = NextResponse.rewrite(url, { request: { headers } })
  if (request.cookies.get(LOCALE_COOKIE)) dropLocaleCookie(response)
  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
}
