import type { Metadata } from "next"
import { Breadcrumbs } from "../../../components/Breadcrumbs"
import { PageHeader } from "../../../components/PageHeader"
import { Section } from "../../../components/Section"
import { copy } from "../../../lib/copy"
import { getLocale } from "../../../lib/locale"
import { pageMetadata } from "../../../lib/seo"
import { site } from "../../../lib/site"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMetadata({
    title: copy.meta.businessTermsTitle[locale],
    description: copy.meta.businessTermsDescription[locale],
    path: "/business-terms",
    absoluteTitle: true,
    locale,
  })
}

export default async function BusinessTermsPage() {
  const locale = await getLocale()
  return (
    <>
      <PageHeader eyebrow={copy.legal.eyebrow[locale]} title={copy.legal.businessTermsTitle[locale]} lead={copy.legal.businessTermsUpdated[locale]} />
      <Section narrow>
        <Breadcrumbs items={[{ name: "Business Terms & Conditions", path: "/business-terms" }]} />
        <div className="legal-copy">
          <p>These Terms and Conditions govern bookings and stays at The Papaya Tree, Ahangama, Sri Lanka (&quot;the hotel&quot;, &quot;we&quot;, &quot;us&quot;). By making a booking with us you agree to these terms.</p>
          <h2>1. Prices and currency</h2>
          <p>Room rates and other charges are shown on this website in US Dollars (USD) for convenience. All payments are processed in Sri Lankan Rupees (LKR). The amount charged in LKR is based on the exchange rate applied at the time of payment, and your bank or card provider may apply its own conversion rate or fees.</p>
          <h2>2. Bookings and minimum stay</h2>
          <p>A minimum stay of two nights applies to all bookings. Your booking is confirmed once you receive a written confirmation from us.</p>
          <h2>3. Payment options</h2>
          <p>When you book directly with us you may choose either option below:</p>
          <ul>
            <li>Pay for the first two nights now and settle any additional nights on arrival at the hotel, or</li>
            <li>Pay for your entire stay at the time of booking.</li>
          </ul>
          <p>The same cancellation rules apply regardless of which option you choose.</p>
          <h2>4. Cancellation and refunds</h2>
          <ul>
            <li>Cancellations made more than five days before your arrival date receive a full refund.</li>
            <li>Cancellations made within five days of arrival, and no-shows, are non-refundable.</li>
            <li>These cancellation rules also apply to airport pick-up and transfer services booked through us.</li>
          </ul>
          <p>Refunds are issued to the original payment method and processed in LKR.</p>
          <h2>5. Check-in and check-out</h2>
          <p>Check-in is from 2:00 pm. Check-out is by 11:00 am. Early check-in or late check-out may be available on request and cannot be guaranteed.</p>
          <h2>6. Guest responsibilities</h2>
          <p>Guests are expected to treat the property with care and to respect other guests and our neighbours. Guests are responsible for any damage they cause during their stay. We may decline service in cases of unlawful behaviour or wilful damage to the property.</p>
          <h2>7. Liability</h2>
          <p>We take reasonable care to provide a safe and comfortable stay. To the extent permitted by law, we are not liable for loss, damage or injury except where caused by our negligence.</p>
          <h2>8. Governing law</h2>
          <p>These Terms are governed by the laws of Sri Lanka.</p>
          <h2>9. Contact</h2>
          <p>The Papaya Tree, {site.address.street}, {site.address.locality} {site.address.postalCode}, {site.address.locality}, {site.address.countryName}. Email: <a href={`mailto:${site.email}`}>{site.email}</a>. Phone: <a href={`tel:${site.phoneE164}`}>{site.phone}</a>.</p>
        </div>
      </Section>
    </>
  )
}
