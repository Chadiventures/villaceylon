import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"
import { Breadcrumbs } from "../../../components/Breadcrumbs"
import { PageHeader } from "../../../components/PageHeader"
import { Section } from "../../../components/Section"
import { copy } from "../../../lib/copy"
import { localizePath, type Locale } from "../../../lib/i18n"
import { getLocale } from "../../../lib/locale"
import { privacyAdopted, privacyPolicy, type PrivacyBlock, type PrivacySection } from "../../../lib/privacy"
import { pageMetadata } from "../../../lib/seo"
import { site } from "../../../lib/site"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMetadata({
    title: copy.meta.privacyTitle[locale],
    description: copy.meta.privacyDescription[locale],
    path: "/privacy",
    absoluteTitle: true,
    locale,
  })
}

function Blocks({ blocks, locale }: { blocks: readonly PrivacyBlock[]; locale: Locale }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.kind === "p") return <p key={index}>{block.text[locale]}</p>
        if (block.kind === "list") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item.en}>{item[locale]}</li>
              ))}
            </ul>
          )
        }
        if (block.kind === "cookies") {
          return (
            <p key={index}>
              {block.text[locale]}{" "}
              <Link href={localizePath("/cookies", locale)}>{locale === "sv" ? "cookiepolicy" : "cookie policy"}</Link>
              {locale === "sv" ? " för vilka cookies webbplatsen använder och hur du godkänner eller avvisar dem." : " for which cookies this website uses and how to accept or decline them."}
            </p>
          )
        }
        if (block.kind === "email") {
          return (
            <p key={index}>
              {locale === "sv" ? "E-post: " : "Email: "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          )
        }
        return (
          <p key={index}>
            WhatsApp <a href={site.whatsapp}>{site.phone}</a>
          </p>
        )
      })}
    </>
  )
}

function Sections({ sections, locale, depth }: { sections: readonly PrivacySection[]; locale: Locale; depth: 2 | 3 | 4 }) {
  const next = (depth === 2 ? 3 : 4) as 3 | 4
  return (
    <>
      {sections.map((section) => {
        const heading = section.heading[locale]
        let title: ReactNode = <h2>{heading}</h2>
        if (depth === 3) title = <h3>{heading}</h3>
        if (depth === 4) title = <h4>{heading}</h4>
        return (
          <div key={section.heading.en}>
            {title}
            <Blocks blocks={section.blocks} locale={locale} />
            {section.children ? <Sections sections={section.children} locale={locale} depth={next} /> : null}
          </div>
        )
      })}
    </>
  )
}

export default async function PrivacyPage() {
  const locale = await getLocale()
  return (
    <>
      <PageHeader eyebrow={copy.legal.eyebrow[locale]} title={copy.legal.privacyTitle[locale]} lead={privacyAdopted[locale]} />
      <Section narrow>
        <Breadcrumbs items={[{ name: "Privacy", path: "/privacy" }]} />
        <div className="legal-copy">
          <Sections sections={privacyPolicy} locale={locale} depth={2} />
        </div>
      </Section>
    </>
  )
}
