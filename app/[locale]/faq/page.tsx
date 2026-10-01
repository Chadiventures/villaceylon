import type { Metadata } from "next"
import Link from "next/link"
import { BookCta } from "../../../components/BookCta"
import { Breadcrumbs } from "../../../components/Breadcrumbs"
import { Faq } from "../../../components/Faq"
import { GuidePdfLink } from "../../../components/GuidePdfLink"
import { JsonLd } from "../../../components/JsonLd"
import { PageHeader } from "../../../components/PageHeader"
import { Section } from "../../../components/Section"
import { copy } from "../../../lib/copy"
import { faqContent, faqPageLd } from "../../../lib/faq"
import { getLocale } from "../../../lib/locale"
import { pageMetadata } from "../../../lib/seo"
import { site } from "../../../lib/site"
import "./faq.css"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const faq = faqContent(locale)
  return pageMetadata({
    title: faq.title,
    description: faq.description,
    path: "/faq",
    absoluteTitle: true,
    locale,
  })
}

export default async function FaqPage() {
  const locale = await getLocale()
  const faq = faqContent(locale)
  return (
    <>
      <JsonLd data={faqPageLd(faq.items)} />
      <PageHeader
        eyebrow={copy.faqPage.eyebrow[locale]}
        title={copy.faqPage.title[locale]}
        lead={
          <>
            {copy.faqPage.lead[locale]}{" "}
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">{copy.faqPage.message[locale]}</a>.
          </>
        }
      />
      <Section>
        <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
        <p className="faq-updated">{copy.faqPage.updated[locale]} {faq.updated}</p>
        <nav className="faq-nav" aria-label={copy.faqPage.sections[locale]}>
          {faq.categories.map((category) => (
            <Link key={category.id} href={`#${category.id}`}>{category.title}</Link>
          ))}
        </nav>
        <Faq groups={faq.groups} />
        <div className="guide-soft">
          <p>{copy.faqPage.pdf[locale]}</p>
          <GuidePdfLink className="btn btn-line">{copy.faqPage.download[locale]}</GuidePdfLink>
        </div>
        <p className="faq-whatsapp">
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">{copy.faqPage.message[locale]}</a>
        </p>
      </Section>
      <BookCta />
    </>
  )
}
