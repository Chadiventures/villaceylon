'use client'
import { useEffect, useState } from "react"
import { copy } from "../lib/copy"
import { useOverlay } from "./OverlayContext"
import { GUIDE_PDF_FILENAME, GUIDE_PDF_HREF, PdfDownloadLink } from "./PdfDownloadLink"
import { useLocale } from "./useLocale"

export function GuideStickyPdf() {
  const { chromeHidden } = useOverlay()
  const locale = useLocale()
  const [pastIntro, setPastIntro] = useState(false)
  const [bookInView, setBookInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 820px)")
    const sync = () => setIsMobile(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const intro = document.getElementById("guide-intro")
    const book = document.querySelector(".cta")
    if (!intro) return
    const introObs = new IntersectionObserver(([entry]) => {
      setPastIntro(!entry.isIntersecting)
    }, { threshold: 0.08 })
    introObs.observe(intro)
    const bookObs = book
      ? new IntersectionObserver(([entry]) => {
          setBookInView(entry.isIntersecting)
        }, { rootMargin: "0px 0px -72px 0px", threshold: 0 })
      : undefined
    if (book && bookObs) bookObs.observe(book)
    return () => {
      introObs.disconnect()
      bookObs?.disconnect()
    }
  }, [])

  const visible = isMobile && pastIntro && !bookInView && !chromeHidden
  return (
    <div className={visible ? "gp-sticky show" : "gp-sticky"} aria-hidden={!visible} {...(!visible ? { inert: true } : {})}>
      <PdfDownloadLink
        className="btn btn-amber gp-sticky-btn"
        href={GUIDE_PDF_HREF}
        filename={GUIDE_PDF_FILENAME}
        trackPage="/guide"
        position="sticky"
      >
        {copy.guide.download[locale]}
      </PdfDownloadLink>
    </div>
  )
}
