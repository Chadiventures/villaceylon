'use client'
import type { ReactNode } from "react"
import { trackEvent } from "../lib/analytics"

export const GUIDE_PDF_HREF = "/the-papaya-tree-ahangama-guide.pdf"
export const GUIDE_PDF_FILENAME = "The-Papaya-Tree-Ahangama-Guide.pdf"
export type GuidePdfPosition = "intro" | "sticky" | "closing"

/** A plain download link that also fires a trackEvent on click. Kept as its own tiny
 * client component so the server components that use it (e.g. GuideBand) do not need
 * to become client components themselves. */
export function PdfDownloadLink({
  href = GUIDE_PDF_HREF,
  filename = GUIDE_PDF_FILENAME,
  trackPage,
  position,
  className,
  ariaLabel,
  children,
}: {
  href?: string
  filename?: string
  trackPage: string
  position?: GuidePdfPosition
  className?: string
  ariaLabel?: string
  children: ReactNode
}) {
  return (
    <a
      className={className}
      href={href}
      download={filename}
      rel="noopener"
      aria-label={ariaLabel}
      onClick={() => trackEvent("guide_pdf_download", { page: trackPage, ...(position ? { position } : {}) })}
    >
      {children}
    </a>
  )
}
