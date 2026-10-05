import type { MetadataRoute } from "next"
import { absoluteUrl, languageAlternates, routes } from "../lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map((route) => {
    const changeFrequency = route.path === "/" || route.path === "/book" ? "weekly" as const : "monthly" as const
    return {
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency,
      priority: route.priority,
      alternates: { languages: languageAlternates(route.path) },
    }
  })
}
