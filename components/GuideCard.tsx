import Link from "next/link"
import type { ReactNode } from "react"
import { ForkIcon, PalmIcon, PinIcon, SunsetIcon, WaveIcon } from "./Icons"

const rows: { href: string; label: string; icon: ReactNode }[] = [
  { href: "/ahangama", label: "Good things to know", icon: <PalmIcon /> },
  { href: "/surf", label: "Surf / Fitness", icon: <WaveIcon /> },
  { href: "/eat", label: "Eat & drink", icon: <ForkIcon /> },
  { href: "/day-trips", label: "Day trips", icon: <SunsetIcon /> },
]

const pageRows: { href: string; label: string; icon: ReactNode }[] = [
  { href: "/surf", label: "Surf / Fitness", icon: <WaveIcon /> },
  { href: "/eat", label: "Eat & drink", icon: <ForkIcon /> },
  { href: "/day-trips", label: "Day trips", icon: <SunsetIcon /> },
  { href: "/getting-here", label: "Getting here", icon: <PinIcon /> },
]

export function GuideCard({ plain, page }: { plain?: boolean; page?: boolean }) {
  const items = page ? pageRows : rows
  return (
    <div className="gcard" style={plain ? { boxShadow: "0 40px 80px -50px rgba(36,63,52,.4)" } : undefined}>
      {items.map((row) => (
        <Link className="grow" href={row.href} key={row.href}>
          {row.icon}
          <span className="gt">{row.label}</span>
          <span className="ga">›</span>
        </Link>
      ))}
    </div>
  )
}

export function GuideBand() {
  return (
    <section className="guide" id="guide">
      <div className="glow" />
      <div className="glow2" />
      <div className="wrap">
        <div>
          <p className="eyebrow">The Ahangama guide</p>
          <h2>Everything we&apos;d tell a friend</h2>
          <p>We live here. This is the guide we wish we&apos;d had: where the waves break, where to eat, and what is worth the drive. Yours to keep, whether you book or not.</p>
          <Link className="btn btn-amber" href="/guide" style={{ marginTop: 26 }}>Open the guide</Link>
        </div>
        <GuideCard />
      </div>
    </section>
  )
}
