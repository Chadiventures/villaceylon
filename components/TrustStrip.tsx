import { BoltIcon, CardIcon, SunsetIcon, WaveIcon } from "./Icons"

const items = [
  { icon: <CardIcon />, label: "Book direct, best rate" },
  { icon: <BoltIcon />, label: "Free cancellation up to 5 days before" },
  { icon: <WaveIcon />, label: "Surf 2 min away" },
  { icon: <SunsetIcon />, label: "We reply fast on WhatsApp" },
]

export function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="wrap">
        <ul>
          {items.map((item) => (
            <li key={item.label}>
              <span className="ts-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
