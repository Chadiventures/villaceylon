'use client'
import { useEffect, useRef, useState } from "react"
import { PlaceholderImage } from "./PlaceholderImage"

type NetworkInformation = { saveData?: boolean }

export function HeroVideo({ poster, alt, hasWebm, hasMp4 }: { poster: string; alt: string; hasWebm: boolean; hasMp4: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [preferStill, setPreferStill] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
    if (reduced || connection?.saveData) setPreferStill(true)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || preferStill) return
    const fail = () => setPreferStill(true)
    const sources = video.querySelectorAll("source")
    const failedAlready = Boolean(video.error) || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE
    if (failedAlready) fail()
    video.addEventListener("error", fail)
    sources.forEach((source) => source.addEventListener("error", fail))
    video.muted = true
    const play = () => {
      video.play().catch(() => {})
    }
    play()
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) play()
      else video.pause()
    }, { threshold: 0.2 })
    observer.observe(video)
    return () => {
      video.removeEventListener("error", fail)
      sources.forEach((source) => source.removeEventListener("error", fail))
      observer.disconnect()
    }
  }, [preferStill])

  if (preferStill) {
    return <PlaceholderImage src={poster} alt={alt} priority sizes="100vw" />
  }

  return (
    <video
      ref={videoRef}
      className="hero-video"
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      poster={poster}
      onError={() => setPreferStill(true)}
      aria-hidden="true"
    >
      {hasMp4 ? <source src="/video/hero.mp4" type="video/mp4" /> : null}
      {hasWebm ? <source src="/video/hero.webm" type="video/webm" /> : null}
    </video>
  )
}
