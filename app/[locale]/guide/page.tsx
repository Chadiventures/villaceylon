import type { Metadata } from "next"
import Image from "next/image"
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
            <p className="gp-hero-eyebrow">
              <span className="gp-hero-rule" aria-hidden="true" />
              {copy.guide.eyebrow[locale]}
            </p>
            <h1>{copy.guide.titleBefore[locale]} <em>{copy.guide.titleEm[locale]}</em></h1>
            <p className="gp-intro-lead">{copy.guide.lead[locale]}</p>
            <ul className="gp-hero-details">
              <li>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                  <path d="M4 2.5h5.2L12 5.2V13.5H4z" strokeLinejoin="round" />
                  <path d="M9.1 2.6V5.3H12" strokeLinejoin="round" />
                  <path d="M6 8h4M6 10.4h2.6" strokeLinecap="round" />
                </svg>
                {copy.guide.pages[locale]}
              </li>
              <li>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                  <rect x="5" y="1.8" width="6" height="12.4" rx="1.2" />
                  <path d="M7.2 12.2h1.6" strokeLinecap="round" />
                </svg>
                {copy.guide.format[locale]}
              </li>
              <li>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                  <path d="M3.2 8.3l3 3 6.6-6.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {copy.guide.free[locale]}
              </li>
            </ul>
            <div className="gp-hero-actions">
              <PdfDownloadLink className="btn btn-amber" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="/guide" position="intro">
                <DownloadIcon />
                {copy.guide.download[locale]}
              </PdfDownloadLink>
              <a className="gp-hero-more" href="#guide-taste">
                {copy.guide.inside[locale]}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <path d="M3 8h10M9.5 4.5L13 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
          <div className="gp-cover-stage">
            <div className="gp-hero-glow" aria-hidden="true" />
            <PdfDownloadLink className="gp-cover-link" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="/guide" position="intro" ariaLabel={copy.guide.coverAlt[locale]}>
              <span className="gp-cover-sheet" aria-hidden="true" />
              <Image
                className="gp-cover-img"
                src="/images/guide-cover.webp"
                alt={copy.guide.coverAlt[locale]}
                width={925}
                height={1309}
                priority
                sizes="(min-width: 1024px) 280px, 200px"
              />
            </PdfDownloadLink>
          </div>
        </div>
      </section>
      <section className="gp-taste" id="guide-taste">
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
