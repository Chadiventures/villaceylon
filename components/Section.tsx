import type { ReactNode } from "react"

export function Section({ children, tint, id, narrow, decor, top, className }: { children: ReactNode; tint?: boolean; id?: string; narrow?: boolean; decor?: ReactNode; top?: boolean; className?: string }) {
  const cls = [tint ? "section tint" : "section", top ? "top" : "", className].filter(Boolean).join(" ")
  return (
    <section className={cls} id={id}>
      {decor}
      <div className="wrap" style={narrow ? { maxWidth: 840 } : undefined}>{children}</div>
    </section>
  )
}
