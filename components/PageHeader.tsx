import type { ReactNode } from "react"

export function PageHeader({
  eyebrow,
  title,
  lead,
  oneLine,
  seoTitle,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  oneLine?: boolean
  seoTitle?: string
}) {
  return (
    <header className="page-header">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
          <h1 className={oneLine ? "one" : undefined}>
            <span className="visual">{title}</span>
            {seoTitle ? <span className="sr-only">{seoTitle}</span> : null}
          </h1>
          <span className="page-header-rule" aria-hidden="true" />
          {lead ? <p className="page-header-lead">{lead}</p> : null}
      </div>
    </header>
  )
}
