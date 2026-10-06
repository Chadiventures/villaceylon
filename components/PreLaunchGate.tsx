import { site } from "../lib/site"

export function PreLaunchGate() {
  return (
    <div className="prelaunch-gate" role="dialog" aria-modal="true" aria-label="Be among our first guests">
      <div className="prelaunch-card">
        <p className="prelaunch-mark">THE PAPAYA TREE</p>
        <p className="prelaunch-place">AHANGAMA, SRI LANKA</p>
        <p className="prelaunch-eyebrow">Opening in 2026</p>
        <h1>Be among our first guests</h1>
        <p className="prelaunch-lead">Seven rooms in a garden of papaya and palms, three minutes from the surf in Ahangama. Message us to hold your dates and be first to book when we open.</p>
        <a className="btn btn-amber" href={site.whatsapp} target="_blank" rel="noopener noreferrer">Reserve your dates on WhatsApp</a>
        <a className="prelaunch-ig" href={site.instagram} target="_blank" rel="noopener noreferrer">Follow along at {site.instagramHandle}</a>
      </div>
    </div>
  )
}
