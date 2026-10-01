'use client'
import { useEffect, useRef, useState } from "react"
import { copy } from "../lib/copy"
import { site } from "../lib/site"
import { useLocale } from "./useLocale"

export function MapEmbed({ caption, zoom = 16 }: { caption?: string; zoom?: number }) {
  const mapSrc = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=${zoom}&output=embed`
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`
  const locale = useLocale()
  const rootRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setShow(true)
    }, { rootMargin: "200px" })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (
    <div className="map-embed-wrap" ref={rootRef}>
      <div className="map-embed">
        {show ? (
          <iframe
            title={copy.map.title[locale]}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : null}
      </div>
      <div className="map-caption">
        <p>{caption || site.address.full}</p>
        <a href={openUrl} target="_blank" rel="noopener noreferrer">{copy.map.open[locale]}</a>
      </div>
    </div>
  )
}
