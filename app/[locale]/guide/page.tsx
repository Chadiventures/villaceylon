import type { Metadata } from "next"
import Image from "next/image"
import { BookCta } from "../../../components/BookCta"
import { Breadcrumbs } from "../../../components/Breadcrumbs"
import { guidePreviews } from "../../../components/guideCategories"
import { GuideStickyPdf } from "../../../components/GuideStickyPdf"
import { GUIDE_PDF_FILENAME, GUIDE_PDF_HREF, PdfDownloadLink } from "../../../components/PdfDownloadLink"
import { PlaceholderImage } from "../../../components/PlaceholderImage"
import { copy } from "../../../lib/copy"
import { trText } from "../../../lib/image-copy"
import { getLocale } from "../../../lib/locale"
import { pageMetadata } from "../../../lib/seo"
import "./guide.css"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  return pageMetadata({
    title: copy.meta.guideTitle[locale],
    description: copy.meta.guideDescription[locale],
    path: "/guide",
    image: "/images/guide-cover.webp",
    locale,
  })
}

export default async function GuidePage() {
  const locale = await getLocale()
  const coverAlt = trText("Cover of The Ahangama Guide by The Papaya Tree", locale)
  return (
    <>
      <section className="guide-intro gp-intro" id="guide-intro">
        <div className="wrap">
          <div>
            <Breadcrumbs items={[{ name: "Ahangama Guide", path: "/guide" }]} />
            <p className="eyebrow">{copy.guide.eyebrow[locale]}</p>
            <h1>{copy.guide.title[locale]}</h1>
            <p className="gp-intro-lead">{copy.guide.lead[locale]}</p>
          </div>
          <div className="gp-cover">
            <div className="gp-cover-frame">
              <Image
                className="gp-cover-img"
                src="/images/guide-cover.webp"
                alt={coverAlt}
                width={925}
                height={1309}
                sizes="(min-width: 900px) 320px, 220px"
                priority
              />
            </div>
            <PdfDownloadLink className="btn btn-amber" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="/guide" position="intro">
              {copy.guide.download[locale]}
            </PdfDownloadLink>
            <p className="gp-cover-caption">{copy.guide.caption[locale]}</p>
          </div>
        </div>
      </section>
      <section className="gp-taste">
        <div className="wrap gp-frame">
          <h2>{copy.guide.taste[locale]}</h2>
          <div className="gp-bento">
            {guidePreviews.map((preview) => {
              const card = copy.guide.cards[preview.slug as keyof typeof copy.guide.cards]
              return (
                <article className="gp-card" key={preview.slug}>
                  <div className="gp-photo">
                    <PlaceholderImage src={preview.image.src} alt={trText(preview.image.alt, locale)} sizes="(max-width: 639px) 100vw, (max-width: 1099px) 50vw, 347px" />
                  </div>
                  <div className="gp-card-body">
                    <div className="gp-card-icon">{preview.icon}</div>
                    <h3>{card.label[locale]}</h3>
                    <p>{card.desc[locale]}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
      <section className="gp-peek">
        <div className="wrap gp-frame">
          <h2>{copy.guide.peek[locale]}</h2>
          <div className="gp-quotes">
            {copy.guide.peeks.map((quote) => (
              <p className="gp-quote" key={quote.en}>{quote[locale]}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="gp-close" id="guide-closing">
        <div className="wrap gp-frame">
          <div className="gp-cover">
            <div className="gp-cover-frame">
              <Image
                className="gp-cover-img"
                src="/images/guide-cover.webp"
                alt={coverAlt}
                width={925}
                height={1309}
                sizes="(min-width: 900px) 280px, 220px"
              />
            </div>
          </div>
          <div>
            <h2>{copy.guide.closeTitle[locale]}</h2>
            <PdfDownloadLink className="btn btn-amber" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="/guide" position="closing">
              {copy.guide.download[locale]}
            </PdfDownloadLink>
            <p className="gp-close-caption">{copy.guide.closeCaption[locale]}</p>
          </div>
        </div>
      </section>
      <BookCta />
      <GuideStickyPdf />
    </>
  )
}
