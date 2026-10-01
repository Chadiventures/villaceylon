import type { ReactNode } from "react"

type PriceBand = "Budget" | "Mid" | "Splurge"
type Item = { name: string; desc: string; icon?: ReactNode; price?: PriceBand; tag?: string; time?: string }
type Block = { title: string; note?: string; items: Item[] }

function Venues({ items }: { items: Item[] }) {
  return (
    <div className="venues">
      {items.map((item) => (
        <div className={item.icon ? "venue has-icon" : "venue"} key={item.name}>
          {item.icon ? <span className="venue-icon">{item.icon}</span> : null}
          <div className="venue-copy">
            <div className="venue-name">{item.name}</div>
            {item.price || item.tag ? (
              <div className="venue-pills">
                {item.price ? <span className={`pill pill-price pill-${item.price.toLowerCase()}`}>{item.price}</span> : null}
                {item.tag ? <span className="pill pill-tag">{item.tag}</span> : null}
              </div>
            ) : null}
            <div className="venue-desc">{item.desc}</div>
            {item.time ? <div className="venue-time">{item.time}</div> : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export function AreaGroup({ title, note, items, sections }: Block & { sections?: Block[] }) {
  return (
    <div className="area-group">
      <h3>{title}</h3>
      {note ? <p className="area-note">{note}</p> : null}
      <Venues items={items} />
      {sections?.map((section) => (
        <div className="area-section" key={section.title}>
          <h3>{section.title}</h3>
          {section.note ? <p className="area-note">{section.note}</p> : null}
          <Venues items={section.items} />
        </div>
      ))}
    </div>
  )
}
