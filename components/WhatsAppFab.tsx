'use client'
import { copy } from "../lib/copy"
import { site } from "../lib/site"
import { useOverlay } from "./OverlayContext"
import { WhatsAppIcon } from "./Icons"
import { useLocale } from "./useLocale"

export function WhatsAppFab() {
  const { chromeHidden } = useOverlay()
  const locale = useLocale()
  if (chromeHidden) return null
  return (
    <a
      className="wa-fab"
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.whatsapp.label[locale]}
    >
      <WhatsAppIcon />
    </a>
  )
}
