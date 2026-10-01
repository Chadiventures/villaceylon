import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { BookCta } from "../../components/BookCta"
import { BookingForm } from "../../components/BookingForm"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { FaqSeed } from "../../components/Faq"
import { InstagramIcon, MailIcon, WhatsAppIcon } from "../../components/Icons"
import { JsonLd } from "../../components/JsonLd"
import { MapEmbed } from "../../components/MapEmbed"
import { PageHeader } from "../../components/PageHeader"
import { PolicyCard } from "../../components/PolicyCard"
import { Section } from "../../components/Section"
import { SearchBar } from "../../components/search/SearchBar"
import { WhyBookDirect } from "../../components/WhyBookDirect"
import { faqPageLd, seedFaq } from "../../lib/faq"
import { pageMetadata } from "../../lib/seo"
import { site } from "../../lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Book Direct, No Fees",
  description: "Reserve a room at The Papaya Tree in Ahangama from $65 a night. Book direct for the best rate and free cancellation up to five days before arrival.",
  path: "/book",
})

export default function BookPage() {
  return (
    <>
      <JsonLd data={faqPageLd(seedFaq.book)} />
      <PageHeader
        eyebrow="Book direct"
        title="Book your stay"
        seoTitle="Book Direct, No Fees"
        lead="Rooms from $65 a night. Book direct for the best rate and free cancellation up to five days before you arrive."
      />
      <Section>
        <Breadcrumbs items={[{ name: "Book", path: "/book" }]} />
        <SearchBar variant="page" />
        <div className="book-grid" style={{ marginTop: 28 }}>
          <Suspense fallback={<div className="form">Loading booking form…</div>}>
            <BookingForm />
          </Suspense>
          <div>
            <PolicyCard />
            <p className="route-note"><Link href="/faq#cancellation">Cancellation policy</Link> and <Link href="/faq#cheaper-direct">why book direct</Link>.</p>
            <div className="policy" style={{ marginTop: 20 }}>
              <h3>Find us</h3>
              <p style={{ color: "var(--ink-2)", lineHeight: 1.85 }}>The Papaya Tree<br />{site.address.full}</p>
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
        <FaqSeed items={seedFaq.book} title="Booking answers" />
      </Section>
      <WhyBookDirect />
      <BookCta />
    </>
  )
}
