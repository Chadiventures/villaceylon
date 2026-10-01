import type { Metadata } from "next"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { PageHeader } from "../../components/PageHeader"
import { PolicyCard } from "../../components/PolicyCard"
import { Section } from "../../components/Section"
import { pageMetadata } from "../../lib/seo"
import { site } from "../../lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Booking Terms | The Papaya Tree",
  description: "Booking terms for The Papaya Tree in Ahangama: rates, check-in, and the cancellation and refund policy.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Booking terms" seoTitle="Booking Terms" />
      <Section narrow>
        <Breadcrumbs items={[{ name: "Terms", path: "/terms" }]} />
        <div className="legal-copy">
          <h2>Rates and payment</h2>
          <p>Rates are shown in USD. Availability updates live, and payment is taken securely at the time of booking.</p>
          <h2>Check-in and check-out</h2>
          <p>Check-in is from {site.checkIn}. Check-out is by {site.checkOut}. Message us on WhatsApp if you need to arrive earlier or leave later and we will try to help.</p>
          <PolicyCard />
          <h2>Changes to a booking</h2>
          <p>To change your dates or room, message us on WhatsApp or email. We will do our best to move your booking where availability allows.</p>
          <h2>Questions</h2>
          <p>Write to us at {site.email} or message us on WhatsApp at {site.phone} and we will help directly.</p>
        </div>
      </Section>
    </>
  )
}
