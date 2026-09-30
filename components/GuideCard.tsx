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

export function GuideFollow() {
  return (
    <section className="guide-follow">
      <svg className="guide-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,46 C180,90 360,4 540,46 C720,88 900,2 1080,46 C1260,90 1360,18 1440,46 L1440,90 L0,90 Z" />
      </svg>
      <div className="guide-follow-body">
        <div className="wrap">
          <GuideCard />
        </div>
      </div>
      <svg className="guide-wave guide-wave-bottom" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,44 C180,0 360,86 540,44 C720,2 900,88 1080,44 C1260,0 1360,72 1440,44 L1440,0 L0,0 Z" />
      </svg>
    </section>
  )
}
