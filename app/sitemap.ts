import type { MetadataRoute } from "next"
import { absoluteUrl, routes } from "../lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.path === "/" || route.path === "/book" ? "weekly" : "monthly",
    priority: route.priority,
  }))
}
