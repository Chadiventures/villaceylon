import type { Metadata } from "next"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { PageHeader } from "../../components/PageHeader"
import { Section } from "../../components/Section"
import { pageMetadata } from "../../lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy | The Papaya Tree",
  description: "Which cookies thepapayatree.com uses, and how to accept or decline non-essential cookies.",
  path: "/cookies",
})

export default function CookiesPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Cookie policy" seoTitle="Cookie Policy" />
      <Section narrow>
        <Breadcrumbs items={[{ name: "Cookies", path: "/cookies" }]} />
        <div className="legal-copy">
          <h2>Essential cookies</h2>
          <p>A small cookie remembers your currency choice and whether you have answered our cookie banner. The site does not work without these.</p>
          <h2>Analytics cookies</h2>
          <p>We only load analytics after you choose Accept in the cookie banner. You can change your mind at any time by clearing your browser cookies for this site.</p>
          <h2>Your choice</h2>
          <p>Choosing Decline non-essential keeps analytics switched off. Either choice lets you browse and book normally.</p>
        </div>
      </Section>
    </>
  )
}
