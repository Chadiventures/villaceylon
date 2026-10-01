'use client'
import { useEffect, useRef } from "react"
import { PlaceholderImage } from "./PlaceholderImage"

type Spot = {
  name: string
  time: string
  note: string
  tags?: string[]
  x: number
  y: number
  home?: boolean
}

const spots: Spot[] = [
  { name: "Kabalana", time: "5 min", note: "Good for intermediate and advanced", x: 16, y: 68 },
  { name: "Ahangama", time: "Home", note: "Reef peaks, best in the morning", tags: ["The Rock", "Marshmallows", "Gas Station", "Sticks"], x: 39, y: 68, home: true },
  { name: "Midigama", time: "10 min", note: "Reef breaks, a bit of experience", tags: ["Lazy Left", "Lazy Right", "Rams", "Plantations"], x: 62, y: 68 },
  { name: "Weligama Bay", time: "15 min", note: "Beach break with sandbanks, every level", x: 85, y: 68 },
]

export function SurfMap({ seaSrc }: { seaSrc: string }) {
  const mapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = mapRef.current
    if (!root) return
    const pins = [...root.querySelectorAll<HTMLElement>(".surfmap-pin")]
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      pins.forEach((pin) => pin.classList.add("in"))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("in")
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.15 })
    pins.forEach((pin) => observer.observe(pin))
    return () => observer.disconnect()
  }, [])
  return (
    <>
      <div className="surfmap" ref={mapRef} role="img" aria-label="Surf breaks along the south coast. Kabalana, 5 minutes, good for intermediate and advanced. Ahangama is home: The Rock, Marshmallows, Gas Station and Sticks, reef peaks best in the morning. Midigama, 10 minutes: Lazy Left, Lazy Right, Rams and Plantations, for surfers with a bit of experience. Weligama Bay, 15 minutes, a beach break with sandbanks for every level.">
        <div className="surfmap-sea" aria-hidden="true">
          <PlaceholderImage src={seaSrc} alt="" sizes="(max-width: 1160px) 100vw, 1040px" style={{ objectPosition: "center 72%" }} />
        </div>
        <svg className="surfmap-route" viewBox="0 0 900 500" aria-hidden="true">
          <path d="M40 330 C 90 292, 120 368, 144 340 C 230 292, 300 392, 351 340 C 430 286, 510 398, 558 340 C 650 280, 720 396, 765 340 C 820 312, 860 360, 870 332" fill="none" stroke="rgba(196,148,60,.5)" strokeWidth="1.75" strokeDasharray="2 8" strokeLinecap="round" />
        </svg>
        {spots.map((spot, index) => (
          <div className={spot.home ? "surfmap-pin home" : "surfmap-pin"} key={spot.name} style={{ left: `${spot.x}%`, top: `${spot.y}%`, transitionDelay: `${index * 70}ms` }}>
            <div className="pin-label">
              <div className="pin-name">{spot.name}</div>
              <div className="pin-time">{spot.time}</div>
              <div className="pin-note">{spot.note}</div>
              {spot.tags ? (
                <div className="spot-chips">
                  {spot.tags.map((tag) => (
                    <span className="spot-chip" key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}
            </div>
            <span className="pin-dot" />
          </div>
        ))}
      </div>
      <div className="surfmap-list">
        {spots.map((spot) => (
          <div className={spot.home ? "sm-row home" : "sm-row"} key={spot.name}>
            <div className="sm-top">
              <div className="sm-name">{spot.name}</div>
              <div className="sm-time">{spot.time}</div>
            </div>
            <div className="sm-note">{spot.note}</div>
            {spot.tags ? <div className="sm-note">{spot.tags.join(" · ")}</div> : null}
          </div>
        ))}
      </div>
    </>
  )
}
