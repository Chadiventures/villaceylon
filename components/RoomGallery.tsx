'use client'
import dynamic from "next/dynamic"
import { useCallback, useRef, useState } from "react"
import { photoGroup, photoOpen, photoShow } from "../lib/copy"
import { PlaceholderImage } from "./PlaceholderImage"
import { useLocale } from "./useLocale"

const Lightbox = dynamic(() => import("./Lightbox").then((mod) => ({ default: mod.Lightbox })), { ssr: false })

type Photo = { src: string; alt: string }

export function RoomGallery({ roomId, caption, photos }: { roomId: string; caption: string; photos: Photo[] }) {
  const locale = useLocale()
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const swipeRef = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setOpen(false), [])
  const openAt = (photoIndex: number) => {
    setIndex(photoIndex)
    setOpen(true)
  }
  const main = photos[active] || photos[0]
  function onSwipeScroll() {
    const node = swipeRef.current
    if (!node) return
    const next = Math.round(node.scrollLeft / Math.max(node.clientWidth, 1))
    setActive(Math.min(photos.length - 1, Math.max(0, next)))
  }
  return (
    <div className="rphoto" data-room={roomId}>
      <div className="rgallery-swipe" ref={swipeRef} onScroll={onSwipeScroll}>
        {photos.map((photo, photoIndex) => (
          <button
            type="button"
            className="rgallery-slide"
            key={photo.src}
            aria-label={photoOpen(locale, photoIndex + 1, photos.length, photo.alt)}
            onClick={() => openAt(photoIndex)}
          >
            <PlaceholderImage src={photo.src} alt={photo.alt} sizes="100vw" />
          </button>
        ))}
      </div>
      <div className="rgallery-dots">
        {photos.map((photo, photoIndex) => (
          <button
            type="button"
            key={photo.src}
            className={photoIndex === active ? "on" : ""}
            aria-label={photoShow(locale, photoIndex + 1)}
            onClick={() => {
              setActive(photoIndex)
              const node = swipeRef.current
              if (node) node.scrollTo({ left: photoIndex * node.clientWidth, behavior: "smooth" })
            }}
          />
        ))}
      </div>
      <button type="button" className="arch" aria-label={photoOpen(locale, active + 1, photos.length, main.alt)} onClick={() => openAt(active)}>
        <PlaceholderImage src={main.src} alt={main.alt} sizes="(max-width: 860px) 100vw, 55vw" />
        <span className="cap">{caption}</span>
      </button>
      <div className="rthumbs" role="listbox" aria-label={photoGroup(locale, caption)}>
        {photos.map((photo, photoIndex) => (
          <button
            type="button"
            className={photoIndex === active ? "g on" : "g"}
            key={photo.src}
            role="option"
            aria-selected={photoIndex === active}
            aria-label={photoShow(locale, photoIndex + 1, photo.alt)}
            onClick={() => setActive(photoIndex)}
            onDoubleClick={() => openAt(photoIndex)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                setActive(photoIndex)
              }
            }}
          >
            <PlaceholderImage src={photo.src} alt={photo.alt} sizes="128px" />
          </button>
        ))}
      </div>
      {open ? <Lightbox photos={photos} index={index} caption={caption} onClose={close} onIndex={setIndex} /> : null}
    </div>
  )
}
