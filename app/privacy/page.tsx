import type { Metadata } from "next"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { PageHeader } from "../../components/PageHeader"
import { Section } from "../../components/Section"
import { pageMetadata } from "../../lib/seo"
import { site } from "../../lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | The Papaya Tree",
  description: "How The Papaya Tree collects, uses and protects your information when you enquire or book a room in Ahangama.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" seoTitle="Privacy Policy" />
      <Section narrow>
        <Breadcrumbs items={[{ name: "Privacy", path: "/privacy" }]} />
        <div className="legal-copy">
          <h2>What we collect</h2>
          <p>When you use the booking form we collect your name, email, stay dates and any note you add. We use this only to confirm and manage your reservation.</p>
          <h2>How we use it</h2>
          <p>We use your details to reply by WhatsApp or email and to prepare your room. We do not sell your information.</p>
          <h2>Payments</h2>
          <p>Booking is handled securely through our booking system. Payment details are processed by our payment provider, not stored on this site.</p>
          <h2>Cookies and analytics</h2>
          <p>We only load analytics cookies after you accept them in the cookie banner. See our <a href="/cookies">cookie policy</a> for details.</p>
          <h2>How long we keep it</h2>
          <p>We keep booking details for as long as needed for your stay and for our records, then delete them in the normal course of business.</p>
          <h2>Contact</h2>
          <p>Questions about your data: write to {site.email}.</p>
        </div>
      </Section>
    </>
  )
}
