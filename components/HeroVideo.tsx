'use client'
import { useEffect, useRef, useState } from "react"

type NetworkInformation = { saveData?: boolean }

export function HeroVideo({ poster, hasWebm, hasMp4 }: { poster: string; hasWebm: boolean; hasMp4: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canPlayVideo, setCanPlayVideo] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const hasSource = hasWebm || hasMp4

  useEffect(() => {
    if (!hasSource) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
    const saveData = Boolean(connection?.saveData)
    if (reduced || saveData) return
    const boot = () => setCanPlayVideo(true)
    const idle = window.requestIdleCallback || ((cb: IdleRequestCallback) => window.setTimeout(cb, 400))
    const id = idle(() => boot())
    return () => {
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(id as number)
      else window.clearTimeout(id as number)
    }
  }, [hasSource])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !canPlayVideo) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, { threshold: 0.2 })
    observer.observe(video)
    return () => observer.disconnect()
  }, [canPlayVideo])

  if (!hasSource || !canPlayVideo || videoFailed) {
    return null
  }

  return (
    <video
      ref={videoRef}
      className="hero-video"
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      poster={poster}
      onError={() => setVideoFailed(true)}
      aria-hidden="true"
    >
      {hasMp4 ? <source src="/video/hero.mp4" type="video/mp4" /> : null}
      {hasWebm ? <source src="/video/hero.webm" type="video/webm" /> : null}
    </video>
  )
}
