'use client'
import { site } from "../lib/site"
import { useOverlay } from "./OverlayContext"
import { WhatsAppIcon } from "./Icons"

export function WhatsAppFab() {
  const { chromeHidden } = useOverlay()
  if (chromeHidden) return null
  return (
    <a
      className="wa-fab"
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${site.name} on WhatsApp`}
    >
      <WhatsAppIcon />
    </a>
  )
}
