import type { Metadata } from "next"
import { Breadcrumbs } from "../../../components/Breadcrumbs"
import { PageHeader } from "../../../components/PageHeader"
import { Section } from "../../../components/Section"
import { copy, privacyContact } from "../../../lib/copy"
import { localizePath } from "../../../lib/i18n"
import { getLocale } from "../../../lib/locale"
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

export default async function PrivacyPage() {
  const locale = await getLocale()
  return (
    <>
      <PageHeader eyebrow={copy.legal.eyebrow[locale]} title={copy.legal.privacyTitle[locale]} seoTitle={copy.legal.privacySeo[locale]} />
      <Section narrow>
        <Breadcrumbs items={[{ name: "Privacy", path: "/privacy" }]} />
        <div className="legal-copy">
          {copy.privacy.map((section) => (
            <div key={section.h.en}>
              <h2>{section.h[locale]}</h2>
              <p>{section.p[locale]}</p>
            </div>
          ))}
          <h2>{locale === "sv" ? "Cookies och analys" : "Cookies and analytics"}</h2>
          <p>
            {locale === "sv"
              ? "Vi laddar bara analyscookies efter att du godkänt dem i bannern. Läs "
              : "We only load analytics cookies after you accept them in the cookie banner. See our "}
            <a href={localizePath("/cookies", locale)}>{locale === "sv" ? "cookiepolicyn" : "cookie policy"}</a>
            {locale === "sv" ? " för detaljer." : " for details."}
          </p>
          <h2>{locale === "sv" ? "Kontakt" : "Contact"}</h2>
          <p>{privacyContact(locale, site.email)}</p>
        </div>
      </Section>
    </>
  )
}
