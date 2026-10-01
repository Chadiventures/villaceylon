import type { Metadata } from "next"
import Link from "next/link"
import { BookCta } from "../../components/BookCta"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { Faq } from "../../components/Faq"
import { GuidePdfLink } from "../../components/GuidePdfLink"
import { JsonLd } from "../../components/JsonLd"
import { PageHeader } from "../../components/PageHeader"
import { Section } from "../../components/Section"
import { FAQ_CATEGORIES, FAQ_DESCRIPTION, FAQ_TITLE, FAQ_UPDATED, faqGroups, faqItems, faqPageLd } from "../../lib/faq"
import { pageMetadata } from "../../lib/seo"
import { site } from "../../lib/site"
import "./faq.css"

export const metadata: Metadata = pageMetadata({
  title: FAQ_TITLE,
  description: FAQ_DESCRIPTION,
  path: "/faq",
  absoluteTitle: true,
})

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageLd(faqItems)} />
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered"
        lead={
          <>
            Everything about staying at The Papaya Tree in Ahangama, Sri Lanka. Can&apos;t find it?{" "}
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>.
          </>
        }
      />
      <Section>
        <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
        <p className="faq-updated">Last updated: {FAQ_UPDATED}</p>
        <nav className="faq-nav" aria-label="FAQ sections">
          {FAQ_CATEGORIES.map((category) => (
            <Link key={category.id} href={`#${category.id}`}>{category.title}</Link>
          ))}
        </nav>
        <Faq groups={faqGroups} />
        <div className="guide-soft">
          <p>Want our local tips? Download the Ahangama guide (PDF)</p>
          <GuidePdfLink className="btn btn-line">Download the guide (PDF)</GuidePdfLink>
        </div>
        <p className="faq-whatsapp">
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
        </p>
      </Section>
      <BookCta />
    </>
  )
}
