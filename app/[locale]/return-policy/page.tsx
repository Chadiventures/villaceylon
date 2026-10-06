import type { Metadata } from "next"
import { Breadcrumbs } from "../../../components/Breadcrumbs"
import { PageHeader } from "../../../components/PageHeader"
import { PolicyCard } from "../../../components/PolicyCard"
import { Section } from "../../../components/Section"
import { copy, termsContact } from "../../../lib/copy"
import { getLocale } from "../../../lib/locale"
import { pageMetadata } from "../../../lib/seo"
import { site } from "../../../lib/site"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMetadata({
    title: copy.meta.termsTitle[locale],
    description: copy.meta.termsDescription[locale],
    path: "/return-policy",
    absoluteTitle: true,
    locale,
  })
}

export default async function ReturnPolicyPage() {
  const locale = await getLocale()
  return (
    <>
      <PageHeader eyebrow={copy.legal.eyebrow[locale]} title={copy.legal.termsTitle[locale]} />
      <Section narrow>
        <Breadcrumbs items={[{ name: "Return Policy", path: "/return-policy" }]} />
        <div className="legal-copy">
          <PolicyCard />
          <h2>{copy.terms[0].h[locale]}</h2>
          <p>{copy.terms[0].p[locale]}</p>
          <h2>{copy.terms[1].h[locale]}</h2>
          <p>{termsContact(locale, site.email, site.phone)}</p>
        </div>
      </Section>
    </>
  )
}
