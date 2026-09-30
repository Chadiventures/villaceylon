import { Cta } from "../../components/Cta"
import { Faq } from "../../components/Faq"
import { PageHeader } from "../../components/PageHeader"
import { Section } from "../../components/Section"

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ and policies"
        title={<>Questions,<br /><em>answered</em></>}
        lead="Booking, payment, cancellation and everything about your stay. Can't find it here? Message us on WhatsApp, we reply fast."
      />
      <Section>
        <Faq />
      </Section>
      <Cta />
    </>
  )
}
