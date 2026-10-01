import type { Metadata } from "next"
import { BookCta } from "../../../components/BookCta"
import { guidePreviews } from "../../../components/guideCategories"
import { GuideStickyPdf } from "../../../components/GuideStickyPdf"
import { GUIDE_PDF_FILENAME, GUIDE_PDF_HREF, PdfDownloadLink } from "../../../components/PdfDownloadLink"
import { DownloadIcon, ForkIcon, NightIcon, WaveIcon } from "../../../components/Icons"
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
    locale,
  })
}

const sneakPeeks = [
  { label: "EAT IN WELIGAMA", icon: <ForkIcon /> },
  { label: "SURF", icon: <WaveIcon /> },
  { label: "AFTER DARK", icon: <NightIcon /> },
]

export default async function GuidePage() {
  const locale = await getLocale()
  return (
    <>
      <section className="guide-intro gp-intro" id="guide-intro">
        <div className="wrap gp-frame">
          <div className="gp-intro-copy">
            <p className="eyebrow">{copy.guide.eyebrow[locale]}</p>
            <h1>{copy.guide.title[locale]}</h1>
            <p className="gp-intro-lead">{copy.guide.lead[locale]}</p>
            <PdfDownloadLink className="btn btn-amber" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="/guide" position="intro">
              {copy.guide.download[locale]}
            </PdfDownloadLink>
            <p className="gp-intro-caption">{copy.guide.caption[locale]}</p>
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
          <div className="gp-peek-head">
            <div>
              <p className="eyebrow gp-peek-eyebrow">{copy.guide.peek[locale]}</p>
              <h2>{copy.guide.taste[locale]}</h2>
            </div>
            <p className="gp-peek-from">
              <DownloadIcon />
              {locale === "sv" ? "Från PDF-guiden" : "From the PDF guide"}
            </p>
          </div>
          <div className="gp-peek-grid">
            {sneakPeeks.map((item, index) => (
              <article className="gp-peek-card" key={item.label}>
                <span className="gp-peek-mark" aria-hidden="true">{"\u201C"}</span>
                <div className="gp-peek-chip">{item.icon}</div>
                <p className="gp-peek-label">{item.label}</p>
                <p className="gp-peek-quote">{copy.guide.peeks[index][locale]}</p>
                <span className="gp-peek-line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>
      <BookCta />
      <GuideStickyPdf />
    </>
  )
}
