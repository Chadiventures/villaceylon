import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "../../../components/Breadcrumbs"
import { Building } from "../../../components/Building"
import { Cta } from "../../../components/Cta"
import { DayTimeline } from "../../../components/DayTimeline"
import { HouseFeatureCards } from "../../../components/HouseFeatureCards"
import { MapEmbed } from "../../../components/MapEmbed"
import { PageHeader } from "../../../components/PageHeader"
import { Section } from "../../../components/Section"
import { copy } from "../../../lib/copy"
import { localizePath } from "../../../lib/i18n"
import { getLocale } from "../../../lib/locale"
import { pageMetadata } from "../../../lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMetadata({
    title: copy.meta.houseTitle[locale],
    description: copy.meta.houseDescription[locale],
    path: "/house",
    locale,
  })
}

export default async function HousePage() {
  const locale = await getLocale()
  return (
    <>
      <PageHeader
        eyebrow={copy.house.eyebrow[locale]}
        title={copy.house.title[locale]}
        oneLine
        seoTitle={copy.house.seoTitle[locale]}
        lead={copy.house.lead[locale]}
      />
      <Section decor={<div className="blob" style={{ top: "12%", left: "-6%", width: 320, height: 320, background: "radial-gradient(circle,#7FA894,transparent 70%)" }} />}>
        <Breadcrumbs items={[{ name: "The House", path: "/house" }]} />
        <HouseFeatureCards />
        <p className="route-note">{copy.house.near[locale]} <Link href={localizePath("/faq#pool", locale)}>{copy.house.pool[locale]}</Link>, <Link href={localizePath("/faq#restaurant", locale)}>{copy.house.food[locale]}</Link>.</p>
      </Section>
      <Section decor={<div className="blob" style={{ top: "10%", right: "-6%", width: 320, height: 320, background: "radial-gradient(circle,#E3A24C,transparent 70%)" }} />}>
        <Building />
      </Section>
      <Section tint>
        <p className="eyebrow">{copy.house.dayEyebrow[locale]}</p>
        <h2 className="dt-heading">{copy.house.dayTitle[locale]}</h2>
        <DayTimeline />
      </Section>
      <Section narrow>
        <MapEmbed caption={copy.house.map[locale]} />
        <p className="route-note">{copy.house.more[locale]} <Link href={localizePath("/guide", locale)}>{copy.house.guide[locale]}</Link>{copy.house.or[locale]} <Link href={localizePath("/faq#airport", locale)}>{copy.house.getting[locale]}</Link>.</p>
      </Section>
      <Cta />
    </>
  )
}
