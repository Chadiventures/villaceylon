import type { Metadata } from "next"
import Image from "next/image"
import { BookCta } from "../../components/BookCta"
import { Breadcrumbs } from "../../components/Breadcrumbs"
import { guidePreviews } from "../../components/guideCategories"
import { GuideStickyPdf } from "../../components/GuideStickyPdf"
import { GUIDE_PDF_FILENAME, GUIDE_PDF_HREF, PdfDownloadLink } from "../../components/PdfDownloadLink"
import { PlaceholderImage } from "../../components/PlaceholderImage"
import { pageMetadata } from "../../lib/seo"
import "./guide.css"

const GUIDE_TITLE = "Ahangama Guide: Surf, Eat, Explore"
const GUIDE_DESCRIPTION = "A local Ahangama guide: where the waves break, where to eat, and what is worth the drive. Free 15-page PDF, yours to keep whether you book or not."

export const metadata: Metadata = pageMetadata({
  title: GUIDE_TITLE,
  description: GUIDE_DESCRIPTION,
  path: "/guide",
  image: "/images/guide-cover.webp",
})

const sneakPeeks = [
  "Nomad: the best brunch in the south, by our count.",
  "Kabalana's sandy beach break welcomes every level.",
  "Blue whales and dolphins off Mirissa, December to April.",
]

export default function GuidePage() {
  return (
    <>
      <section className="guide-intro gp-intro" id="guide-intro">
        <div className="wrap">
          <div>
            <Breadcrumbs items={[{ name: "Ahangama Guide", path: "/guide" }]} />
            <p className="eyebrow">The Ahangama guide</p>
            <h1>Everything we&apos;d tell a friend</h1>
            <p className="gp-intro-lead">We live here. This is the guide we wish we&apos;d had: where the waves break, where to eat, and what is worth the drive. Yours to keep, whether you book or not.</p>
          </div>
          <div className="gp-cover">
            <div className="gp-cover-frame">
              <Image
                className="gp-cover-img"
                src="/images/guide-cover.webp"
                alt="Cover of The Ahangama Guide by The Papaya Tree"
                width={925}
                height={1309}
                sizes="(min-width: 900px) 320px, 220px"
                priority
              />
            </div>
            <PdfDownloadLink className="btn btn-amber" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="/guide" position="intro">
              Download the guide (PDF)
            </PdfDownloadLink>
            <p className="gp-cover-caption">Free. 15 pages.</p>
          </div>
        </div>
      </section>
      <section className="gp-taste">
        <div className="wrap">
          <h2>A taste of what&apos;s inside</h2>
          <div className="gp-bento">
            {guidePreviews.map((preview) => (
              <article className="gp-card" key={preview.slug}>
                <div className="gp-photo">
                  <PlaceholderImage src={preview.image.src} alt={preview.image.alt} sizes="(max-width: 820px) 100vw, 50vw" />
                </div>
                <div className="gp-card-body">
                  <div className="gp-card-icon">{preview.icon}</div>
                  <h3>{preview.label}</h3>
                  <p>{preview.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="gp-peek">
        <div className="wrap">
          <h2>Sneak peek</h2>
          <div className="gp-quotes">
            {sneakPeeks.map((quote) => (
              <p className="gp-quote" key={quote}>{quote}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="gp-close" id="guide-closing">
        <div className="wrap">
          <div className="gp-cover">
            <div className="gp-cover-frame">
              <Image
                className="gp-cover-img"
                src="/images/guide-cover.webp"
                alt="Cover of The Ahangama Guide by The Papaya Tree"
                width={925}
                height={1309}
                sizes="(min-width: 900px) 280px, 220px"
              />
            </div>
          </div>
          <div>
            <h2>Get the full guide</h2>
            <PdfDownloadLink className="btn btn-amber" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="/guide" position="closing">
              Download the guide (PDF)
            </PdfDownloadLink>
            <p className="gp-close-caption">Yours to keep, whether you book or not.</p>
          </div>
        </div>
      </section>
      <BookCta />
      <GuideStickyPdf />
    </>
  )
}
