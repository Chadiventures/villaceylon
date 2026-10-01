import type { MetadataRoute } from "next"
import { absoluteUrl } from "../lib/seo"
import { SITE_URL } from "../lib/site"

// Treat anything that isn't the real production domain as staging and block indexing.
// Set NEXT_PUBLIC_SITE_URL to the live domain in production to allow crawling.
const isStaging = !SITE_URL.includes("thepapayatree.com")

export default function robots(): MetadataRoute.Robots {
  if (isStaging) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
