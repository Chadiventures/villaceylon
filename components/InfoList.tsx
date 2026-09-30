import type { ReactNode } from "react"
import { PlaceholderImage } from "./PlaceholderImage"

export function InfoList({ items }: { items: { meta: string; title: string; text: ReactNode; image?: string; imageAlt?: string }[] }) {
  return (
    <div className="info">
      {items.map((item) => (
        <div className="it" key={item.title}>
          {item.image ? (
            <div className="it-photo">
              <PlaceholderImage src={item.image} alt={item.imageAlt ?? item.title} sizes="(max-width: 720px) 100vw, 40vw" />
            </div>
          ) : null}
          <span className="m">{item.meta}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}
