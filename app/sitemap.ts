import type { MetadataRoute } from "next"
import { localizePath } from "../lib/i18n"
import { absoluteUrl, languageAlternates, routes } from "../lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.flatMap((route) => {
    const changeFrequency = route.path === "/" || route.path === "/book" ? "weekly" as const : "monthly" as const
    const languages = languageAlternates(route.path)
    return [
      {
        url: absoluteUrl(route.path),
        lastModified: now,
        changeFrequency,
        priority: route.priority,
        alternates: { languages },
      },
      {
        url: absoluteUrl(localizePath(route.path, "sv")),
        lastModified: now,
        changeFrequency,
        priority: route.priority,
        alternates: { languages },
      },
    ]
  })
}
