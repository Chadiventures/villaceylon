'use client'
import { useEffect, useRef, useState } from "react"

const items = [
  "Book direct",
  "Three minutes to the surf",
  "A pool in the garden",
  "Seven rooms under the papaya trees",
  "Breakfast downstairs",
  "Sunset from the roof",
  "Brand new AC rooms and fresh linen",
  "A restaurant and a rooftop bar",
]

const pixelsPerSecond = 22

export function Marquee() {
  const setRef = useRef<HTMLDivElement>(null)
  const [copies, setCopies] = useState(3)
  const [duration, setDuration] = useState(140)
  useEffect(() => {
    const measure = () => {
      const width = setRef.current?.offsetWidth ?? 0
      if (!width) return
      const needed = Math.ceil(window.innerWidth / width) + 1
      setCopies((current) => (current === needed ? current : needed))
      const seconds = Math.max(90, Math.round((width * needed) / pixelsPerSecond))
      setDuration(seconds)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [copies])
  return (
    <div className="marquee">
      <div className="marq-track" style={{ ["--marq-duration" as string]: `${duration}s` }}>
        {[0, 1].map((group) => (
          <div className="marq-group" key={group}>
            {Array.from({ length: copies }, (_, copy) => (
              <div className="marq-set" key={copy} ref={group === 0 && copy === 0 ? setRef : undefined}>
                {items.map((item) => (
                  <span key={`${group}-${copy}-${item}`}>{item}</span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
