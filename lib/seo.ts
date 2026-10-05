import type { Metadata } from "next"
import { localizePath, type Locale } from "./i18n"
import { SITE_URL, site } from "./site"

export const blockIndexing = process.env.NEXT_PUBLIC_NOINDEX === "true"

type PageSeo = {
  title: string
  description: string
  path: string
  image?: string
  absoluteTitle?: boolean
  locale?: Locale
}

export function languageAlternates(path: string) {
  const en = absoluteUrl(path === "/" ? "/" : path)
  return { en, "x-default": en }
}

export function pageMetadata({ title, description, path, image = site.ogImage, absoluteTitle = false }: PageSeo): Metadata {
  const url = localizePath(path, "en")
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: `${site.name}, Ahangama` }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  }
}

export const routes = [
  { path: "/", priority: 1 },
  { path: "/rooms", priority: 0.9 },
  { path: "/book", priority: 0.95 },
  { path: "/house", priority: 0.8 },
  { path: "/guide", priority: 0.85 },
  { path: "/faq", priority: 0.7 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
  { path: "/cookies", priority: 0.2 },
] as const

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}
