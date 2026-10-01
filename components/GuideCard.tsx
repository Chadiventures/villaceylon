import Image from "next/image"
import Link from "next/link"
import { DownloadIcon } from "./Icons"
import { GUIDE_PDF_FILENAME, GUIDE_PDF_HREF, PdfDownloadLink } from "./PdfDownloadLink"

export function GuideFollow() {
  return <GuideBand />
}

export function GuideBand() {
  return (
    <section className="guide guide-pdf-band" id="guide">
      <div className="glow" />
      <div className="glow2" />
      <div className="wrap">
        <div>
          <p className="eyebrow">The Ahangama guide</p>
          <h2>Everything we&apos;d tell a friend</h2>
          <p>We live here. This is the guide we wish we&apos;d had: where the waves break, where to eat, and what is worth the drive. Yours to keep, whether you book or not.</p>
          <PdfDownloadLink className="btn btn-amber guide-pdf-cta" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="home">
            <DownloadIcon />
            Download the guide (PDF)
          </PdfDownloadLink>
          <p className="guide-pdf-caption">Free. 15 pages. Surf, eat, explore.</p>
          <p className="guide-pdf-caption"><Link href="/guide">See what&apos;s inside</Link></p>
        </div>
        <PdfDownloadLink className="guide-cover-link" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="home" ariaLabel="Download the Ahangama guide PDF">
          <Image
            className="guide-cover-img"
            src="/images/guide-cover.webp"
            alt="Cover of The Ahangama Guide by The Papaya Tree"
            width={925}
            height={1309}
            sizes="(min-width: 900px) 360px, 70vw"
            loading="lazy"
          />
        </PdfDownloadLink>
      </div>
    </section>
  )
}
