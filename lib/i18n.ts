export const LOCALES = ["en", "sv"] as const
export type Locale = (typeof LOCALES)[number]
export const LOCALE_COOKIE = "ptLocale"
export const DEFAULT_LOCALE: Locale = "en"

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "sv"
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/sv" || pathname.startsWith("/sv/") ? "sv" : "en"
}

export function stripLocale(pathname: string): string {
  if (pathname === "/sv") return "/"
  if (pathname.startsWith("/sv/")) {
    const rest = pathname.slice(3)
    return rest.startsWith("/") ? rest : `/${rest}`
  }
  return pathname || "/"
}

function splitSuffix(path: string): [string, string] {
  const hash = path.indexOf("#")
  const query = path.indexOf("?")
  let cut = path.length
  if (hash >= 0) cut = Math.min(cut, hash)
  if (query >= 0) cut = Math.min(cut, query)
  return [path.slice(0, cut), path.slice(cut)]
}

/** Public path for a locale. English has no prefix. Query and hash are kept. */
export function localizePath(path: string, locale: Locale): string {
  const [bare, suffix] = splitSuffix(path)
  const stripped = stripLocale(bare || "/")
  const prefixed = locale === "sv" ? (stripped === "/" ? "/sv" : `/sv${stripped}`) : stripped
  return `${prefixed}${suffix}`
}

export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href
  return localizePath(href, locale)
}

export function samePath(pathname: string, href: string): boolean {
  const [path] = splitSuffix(href)
  return stripLocale(pathname) === stripLocale(path || "/")
}

export const LEGACY_REDIRECTS: Record<string, string> = {
  "/surf": "/guide",
  "/eat": "/guide",
  "/things-to-do": "/guide",
  "/day-trips": "/guide",
  "/getting-here": "/guide",
  "/good-things-to-know": "/guide",
  "/ahangama": "/guide",
  "/guide/surf": "/guide",
  "/guide/eat": "/guide",
  "/guide/things-to-do": "/guide",
  "/guide/day-trips": "/guide",
  "/guide/getting-here": "/guide",
  "/guide/good-things-to-know": "/guide",
}
