'use client'
import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { trackEvent } from "../lib/analytics"

export function GuidePdfLink({ className, children, withHint }: { className?: string; children: ReactNode; withHint?: boolean }) {
  const pathname = usePathname()
  const track = () => {
    trackEvent("guide_pdf_download", { page: pathname })
  }
  return (
    <span className="guide-pdf-link">
      <a
        className={className}
        href="/the-papaya-tree-ahangama-guide.pdf"
        download="The-Papaya-Tree-Ahangama-Guide.pdf"
        rel="noopener noreferrer"
        aria-label="Download the Ahangama guide as a PDF, 15 pages, yours to keep"
        onClick={track}
      >
        {children}
      </a>
      {withHint ? <small className="guide-pdf-hint">15 pages, yours to keep</small> : null}
    </span>
  )
}
