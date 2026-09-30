import type { ReactNode } from "react"

export function PageHeader({ eyebrow, title, lead, oneLine }: { eyebrow: string; title: ReactNode; lead?: ReactNode; oneLine?: boolean }) {
  return (
    <header className="page-header">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className={oneLine ? "one" : undefined}>{title}</h1>
        {lead ? <p className="page-header-lead">{lead}</p> : null}
      </div>
    </header>
  )
}
