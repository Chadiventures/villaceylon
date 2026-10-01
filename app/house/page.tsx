import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { Building } from "../../components/Building"
import { Cta } from "../../components/Cta"
import { DayTimeline } from "../../components/DayTimeline"
import { GuideBand } from "../../components/GuideCard"
import { HouseFeatureCards } from "../../components/HouseFeatureCards"
import { MapEmbed } from "../../components/MapEmbed"
import { PageHeader } from "../../components/PageHeader"
import { Section } from "../../components/Section"
import { pageMetadata } from "../../lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "The House: A Garden Hotel, Not a Resort",
  description: "A small garden hotel in Ahangama with AC rooms, a quiet pool and the sea just past the gate. See what is on site at The Papaya Tree.",
  path: "/house",
})

export default function HousePage() {
  return (
    <>
      <PageHeader
        eyebrow="On site"
        title="A small house with a big garden"
        oneLine
        seoTitle="The House: A Garden Hotel, Not a Resort"
        lead="Seven rooms around the pool. Breakfast downstairs, a drink on the roof, and nothing you have to rush."
      />
      <Section decor={<div className="blob" style={{ top: "12%", left: "-6%", width: 320, height: 320, background: "radial-gradient(circle,#7FA894,transparent 70%)" }} />}>
        <Breadcrumbs items={[{ name: "The House", path: "/house" }]} />
        <HouseFeatureCards />
        <p className="route-note">Surf two minutes away. Restaurants nearby. FAQ: <Link href="/faq#pool">the pool</Link>, <Link href="/faq#restaurant">food and drink</Link>.</p>
      </Section>
      <Section decor={<div className="blob" style={{ top: "10%", right: "-6%", width: 320, height: 320, background: "radial-gradient(circle,#E3A24C,transparent 70%)" }} />}>
        <Building />
      </Section>
      <Section tint>
        <p className="eyebrow">A day at The Papaya Tree</p>
        <h2 className="dt-heading">An unhurried kind of day</h2>
        <DayTimeline />
      </Section>
      <Section narrow>
        <MapEmbed caption="Munidasa Mawatha, Ahangama. A three-minute walk to Kabalana, one of Ahangama's different surf breaks." />
        <p className="route-note">Want more? Read the full <Link href="/guide">Ahangama guide</Link>, or see <Link href="/faq#airport">getting here in the FAQ</Link>.</p>
      </Section>
      <GuideBand />
      <Cta />
    </>
  )
}
