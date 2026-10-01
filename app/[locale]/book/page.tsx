import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { BookCta } from "../../../components/BookCta"
import { BookingForm } from "../../../components/BookingForm"
import { Breadcrumbs } from "../../../components/Breadcrumbs"
import { FaqSeed } from "../../../components/Faq"
import { InstagramIcon, MailIcon, WhatsAppIcon } from "../../../components/Icons"
import { JsonLd } from "../../../components/JsonLd"
import { MapEmbed } from "../../../components/MapEmbed"
import { PageHeader } from "../../../components/PageHeader"
import { GUIDE_PDF_FILENAME, GUIDE_PDF_HREF, PdfDownloadLink } from "../../../components/PdfDownloadLink"
import { PolicyCard } from "../../../components/PolicyCard"
import { Section } from "../../../components/Section"
import { SearchBar } from "../../../components/search/SearchBar"
import { WhyBookDirect } from "../../../components/WhyBookDirect"
import { copy } from "../../../lib/copy"
import { faqContent, faqPageLd } from "../../../lib/faq"
import { localizePath } from "../../../lib/i18n"
import { getLocale } from "../../../lib/locale"
import { pageMetadata } from "../../../lib/seo"
import { site } from "../../../lib/site"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMetadata({
    title: copy.meta.bookTitle[locale],
    description: copy.meta.bookDescription[locale],
    path: "/book",
    locale,
  })
}

export default async function BookPage() {
  const locale = await getLocale()
  const faq = faqContent(locale)
  return (
    <>
      <JsonLd data={faqPageLd(faq.seed.book)} />
      <PageHeader
        eyebrow={copy.book.eyebrow[locale]}
        title={copy.book.title[locale]}
        seoTitle={copy.meta.bookTitle[locale]}
        lead={copy.meta.bookLead[locale]}
      />
      <Section>
        <Breadcrumbs items={[{ name: "Book", path: "/book" }]} />
        <SearchBar variant="page" />
        <WhyBookDirect variant="compact" />
        <div className="book-grid" style={{ marginTop: 28 }}>
          <Suspense fallback={<div className="form">{copy.book.loading[locale]}</div>}>
            <BookingForm />
          </Suspense>
          <div>
            <PolicyCard />
            <p className="route-note"><Link href={localizePath("/faq#cancellation", locale)}>{copy.book.cancel[locale]}</Link> {copy.rooms.and[locale]} <Link href={localizePath("/faq#cheaper-direct", locale)}>{copy.book.why[locale]}</Link>.</p>
            <p className="book-pdf"><PdfDownloadLink className="book-pdf-link" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="/book">{copy.guide.download[locale]}</PdfDownloadLink></p>
            <div className="policy" style={{ marginTop: 20 }}>
              <h3>{copy.book.find[locale]}</h3>
              <p style={{ color: "var(--ink-2)", lineHeight: 1.85 }}>{site.name}<br />{site.address.line}</p>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${site.phone}`} style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--forest)", fontWeight: 600, textDecoration: "none" }}><WhatsAppIcon />{site.phone}</a>
                <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--forest)", fontWeight: 600, textDecoration: "none" }}><MailIcon />{site.email}</a>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${site.instagramHandle}`} style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--forest)", fontWeight: 600, textDecoration: "none" }}><InstagramIcon />{site.instagramHandle}</a>
              </div>
              <div style={{ marginTop: 20 }}>
                <MapEmbed />
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <FaqSeed items={faq.seed.book} title={copy.faqPage.booking[locale]} />
      </Section>
      <BookCta />
    </>
  )
}
