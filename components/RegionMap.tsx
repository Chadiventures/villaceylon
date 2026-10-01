import { site } from "../lib/site"

const stops = [
  { name: "Ahangama (The Papaya Tree)", note: "Home base" },
  { name: "Galle Fort", note: "~25 min west" },
  { name: "Mirissa", note: "~20 min east" },
  { name: "Weligama Bay", note: "~15 min west" },
  { name: "Tea country, Nuwara Eliya", note: "~4 h north" },
  { name: "Yala National Park", note: "~2.5 h east" },
]

export function RegionMap() {
  const mapSrc = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=10&output=embed`
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`
  return (
    <div className="region-map">
      <div className="map-embed-wrap">
        <div className="map-embed">
          <iframe
            title="Region map around Ahangama"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="map-caption">
          <p>Ahangama sits between Galle and Mirissa, with tea country and Yala a longer drive away.</p>
          <a href={openUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps ›</a>
        </div>
      </div>
      <ul className="region-stops">
        {stops.map((stop) => (
          <li key={stop.name}>
            <span className="region-stop-name">{stop.name}</span>
            <span className="region-stop-note">{stop.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
