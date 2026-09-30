'use client'
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { PlaceholderImage } from "./PlaceholderImage"

type Photo = { src: string; alt: string }

export function Lightbox({ photos, index, caption, onClose, onIndex }: { photos: Photo[]; index: number; caption: string; onClose: () => void; onIndex: (index: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const startX = useRef(0)
  const total = photos.length
  const photo = photos[index]
  const step = (delta: number) => onIndex((index + delta + total) % total)
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowRight") {
        event.preventDefault()
        onIndex((index + 1) % total)
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        onIndex((index - 1 + total) % total)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [index, onClose, onIndex, total])
  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={caption} onClick={onClose}>
      <div
        className="lightbox-frame"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => { startX.current = event.changedTouches[0].clientX }}
        onTouchEnd={(event) => {
          const delta = event.changedTouches[0].clientX - startX.current
          if (delta <= -40) step(1)
          if (delta >= 40) step(-1)
        }}
      >
        <div className="lightbox-photo">
          <PlaceholderImage src={photo.src} alt={photo.alt} sizes="720px" />
          <span className="lightbox-caption">{caption}</span>
          <span className="lightbox-count">{index + 1} / {total}</span>
        </div>
        <button type="button" className="lightbox-close" ref={closeRef} aria-label="Close" onClick={onClose}>×</button>
        <button type="button" className="lightbox-nav lightbox-prev" aria-label="Previous photo" onClick={() => step(-1)}>‹</button>
        <button type="button" className="lightbox-nav lightbox-next" aria-label="Next photo" onClick={() => step(1)}>›</button>
      </div>
    </div>,
    document.body
  )
}
