'use client'
import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { trackEvent } from "../lib/analytics"
import { copy } from "../lib/copy"
import { useLocale } from "./useLocale"

export function GuidePdfLink({ className, children, withHint }: { className?: string; children: ReactNode; withHint?: boolean }) {
  const pathname = usePathname()
  const locale = useLocale()
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
        aria-label={copy.guide.downloadAria[locale]}
        onClick={track}
      >
        {children}
      </a>
      {withHint ? <small className="guide-pdf-hint">{copy.guide.hint[locale]}</small> : null}
    </span>
  )
}
