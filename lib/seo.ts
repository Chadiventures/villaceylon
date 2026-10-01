import type { Metadata } from "next"
import { SITE_URL, site } from "./site"

type PageSeo = {
  title: string
  description: string
  path: string
  image?: string
  absoluteTitle?: boolean
}

export function pageMetadata({ title, description, path, image = site.ogImage, absoluteTitle = false }: PageSeo): Metadata {
  const url = path === "/" ? "/" : path
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
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
