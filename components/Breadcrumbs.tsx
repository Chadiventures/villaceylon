import Link from "next/link"
import { copy } from "../lib/copy"
import { localizePath } from "../lib/i18n"
import { getLocale } from "../lib/locale"
import { absoluteUrl } from "../lib/seo"
import { site } from "../lib/site"
import { JsonLd } from "./JsonLd"

type Crumb = { name: string; path: string }

const known: Record<string, keyof typeof copy.nav | "privacy" | "terms" | "cookies" | "businessTerms"> = {
  "/rooms": "rooms",
  "/house": "house",
  "/guide": "guide",
  "/faq": "faq",
  "/book": "book",
}

export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const locale = await getLocale()
  function label(item: Crumb) {
    const key = known[item.path]
    if (key === "privacy" || key === "terms" || key === "cookies" || key === "businessTerms") return copy.footer[key][locale]
    if (key) return copy.nav[key][locale]
    if (item.path === "/privacy") return copy.footer.privacy[locale]
    if (item.path === "/return-policy") return copy.footer.terms[locale]
    if (item.path === "/cookies") return copy.footer.cookies[locale]
    if (item.path === "/business-terms") return copy.footer.businessTerms[locale]
    return item.name
  }
  const crumbs = [{ name: copy.nav.home[locale], path: "/" }, ...items.map((item) => ({ ...item, name: label(item) }))]
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: index === 0 ? copy.nav.home[locale] : item.name,
      item: absoluteUrl(localizePath(item.path, locale)),
    })),
  }
  return (
    <>
      <JsonLd data={data} />
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          {crumbs.map((item, index) => (
            <li key={item.path}>
              {index < crumbs.length - 1 ? (
                <Link href={localizePath(item.path, locale)}>{index === 0 ? site.name : item.name}</Link>
              ) : (
                <span aria-current="page">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
