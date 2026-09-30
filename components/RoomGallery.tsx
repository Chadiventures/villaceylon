'use client'
import { useCallback, useState } from "react"
import { Lightbox } from "./Lightbox"
import { PlaceholderImage } from "./PlaceholderImage"

type Photo = { src: string; alt: string }

export function RoomGallery({ roomId, caption, photos }: { roomId: string; caption: string; photos: Photo[] }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const close = useCallback(() => setOpen(false), [])
  const openAt = (photoIndex: number) => {
    setIndex(photoIndex)
    setOpen(true)
  }
  const main = photos[0]
  return (
    <div className="rphoto" data-room={roomId}>
      <button type="button" className="arch" data-index={0} aria-label={`Open photo 1 of ${photos.length}`} onClick={() => openAt(0)}>
        <PlaceholderImage src={main.src} alt={main.alt} sizes="(max-width: 860px) 100vw, 55vw" />
        <span className="cap">{caption}</span>
      </button>
      <div className="rthumbs">
        {photos.slice(1).map((photo, thumbIndex) => {
          const photoIndex = thumbIndex + 1
          return (
            <button type="button" className="g" key={photo.src} data-index={photoIndex} aria-label={`Open photo ${photoIndex + 1} of ${photos.length}`} onClick={() => openAt(photoIndex)}>
              <PlaceholderImage src={photo.src} alt={photo.alt} sizes="128px" />
            </button>
          )
        })}
      </div>
      {open ? <Lightbox photos={photos} index={index} caption={caption} onClose={close} onIndex={setIndex} /> : null}
    </div>
  )
}
