import type { Metadata } from "next"
import { Breadcrumbs } from "../../../components/Breadcrumbs"
import { PageHeader } from "../../../components/PageHeader"
import { Section } from "../../../components/Section"
import { copy } from "../../../lib/copy"
import { getLocale } from "../../../lib/locale"
import { pageMetadata } from "../../../lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMetadata({
    title: copy.meta.cookiesTitle[locale],
    description: copy.meta.cookiesDescription[locale],
    path: "/cookies",
    absoluteTitle: true,
    locale,
  })
}

export default async function CookiesPage() {
  const locale = await getLocale()
  return (
    <>
      <PageHeader eyebrow={copy.legal.eyebrow[locale]} title={copy.legal.cookiesTitle[locale]} seoTitle={copy.legal.cookiesSeo[locale]} />
      <Section narrow>
        <Breadcrumbs items={[{ name: "Cookies", path: "/cookies" }]} />
        <div className="legal-copy">
          {copy.cookies.map((section) => (
            <div key={section.h.en}>
              <h2>{section.h[locale]}</h2>
              <p>{section.p[locale]}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
