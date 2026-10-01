import { AcIcon, BalconyIcon, PatioIcon, ShowerIcon, WifiIcon, WiredIcon } from "./Icons"

const tiles = [
  { label: "Air conditioning", icon: <AcIcon /> },
  { label: "Private bathroom", icon: <ShowerIcon /> },
  { label: "Wired internet", icon: <WiredIcon /> },
  { label: "WiFi", icon: <WifiIcon /> },
]

function LeafArt({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 220 260" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M110 248c0-70 2-140 0-228" strokeLinecap="round" />
      <path d="M110 52c-8-24 4-42 18-54 4 20 1 38-18 54" strokeLinejoin="round" />
      <path d="M110 64c-32-16-68-12-96 12 32 6 64 12 96 24" strokeLinejoin="round" />
      <path d="M110 64c32-16 68-12 96 12-32 6-64 12-96 24" strokeLinejoin="round" />
      <path d="M110 112c-40-8-78 6-104 32 38-4 72 6 104 24" strokeLinejoin="round" />
      <path d="M110 112c40-8 78 6 104 32-38-4-72 6-104 24" strokeLinejoin="round" />
      <path d="M110 164c-30 2-62 18-82 42 30-10 58-6 82 10" strokeLinejoin="round" />
      <path d="M110 164c30 2 62 18 82 42-30-10-58-6-82 10" strokeLinejoin="round" />
    </svg>
  )
}

export function RoomAmenities() {
  return (
    <section className="rooms-amenities" aria-labelledby="in-every-room">
      <LeafArt className="rooms-amenities-leaf rooms-amenities-leaf-tr" />
      <LeafArt className="rooms-amenities-leaf rooms-amenities-leaf-bl" />
      <div className="wrap">
        <header className="rooms-amenities-head">
          <p className="eyebrow">Included</p>
          <h2 id="in-every-room">In every room</h2>
        </header>
        <ul className="rooms-amenities-grid">
          {tiles.map((tile) => (
            <li key={tile.label}>
              <span className="rooms-amenities-chip" aria-hidden="true">{tile.icon}</span>
              <span className="rooms-amenities-label">{tile.label}</span>
            </li>
          ))}
        </ul>
        <ul className="rooms-amenities-notes">
          <li>
            <span className="rooms-amenities-note-icon" aria-hidden="true"><BalconyIcon /></span>
            <span>Deluxe Doubles: private balcony, view of the garden and pool</span>
          </li>
          <li>
            <span className="rooms-amenities-note-icon" aria-hidden="true"><PatioIcon /></span>
            <span>Deluxe Four-Bed: private patio, view of the garden</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
