import Link from "next/link"
import { absoluteUrl } from "../lib/seo"
import { site } from "../lib/site"
import { JsonLd } from "./JsonLd"

type Crumb = { name: string; path: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const crumbs = [{ name: "Home", path: "/" }, ...items]
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
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
                <Link href={item.path}>{item.name === "Home" ? site.name : item.name}</Link>
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
