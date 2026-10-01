import Image from "next/image"
import Link from "next/link"
import { copy } from "../lib/copy"
import { trText } from "../lib/image-copy"
import { localizePath } from "../lib/i18n"
import { getLocale } from "../lib/locale"
import { DownloadIcon } from "./Icons"
import { GUIDE_PDF_FILENAME, GUIDE_PDF_HREF, PdfDownloadLink } from "./PdfDownloadLink"

export function GuideFollow() {
  return <GuideBand />
}

export async function GuideBand() {
  const locale = await getLocale()
  return (
    <section className="guide guide-pdf-band" id="guide">
      <div className="glow" />
      <div className="glow2" />
      <div className="wrap">
        <div>
          <p className="eyebrow">{copy.guide.eyebrow[locale]}</p>
          <h2>{copy.guide.title[locale]}</h2>
          <p>{copy.guide.lead[locale]}</p>
          <PdfDownloadLink className="btn btn-amber guide-pdf-cta" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="home">
            <DownloadIcon />
            {copy.guide.download[locale]}
          </PdfDownloadLink>
          <p className="guide-pdf-caption">{copy.guide.homeCaption[locale]}</p>
          <p className="guide-pdf-caption"><Link href={localizePath("/guide", locale)}>{copy.guide.inside[locale]}</Link></p>
        </div>
        <PdfDownloadLink className="guide-cover-link" href={GUIDE_PDF_HREF} filename={GUIDE_PDF_FILENAME} trackPage="home" ariaLabel={copy.guide.coverAria[locale]}>
          <Image
            className="guide-cover-img"
            src="/images/guide-cover.webp"
            alt={trText("Cover of The Ahangama Guide by The Papaya Tree", locale)}
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
