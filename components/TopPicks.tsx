type Pick = { name: string; why: string; distance?: string; cost?: string }

export function TopPicks({ heading, items }: { heading: string; items: Pick[] }) {
  return (
    <div className="top-picks">
      <h2 className="top-picks-heading">{heading}</h2>
      <div className="top-picks-grid">
        {items.map((item) => (
          <div className="top-pick" key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.why}</p>
            {item.distance || item.cost ? (
              <p className="top-pick-meta">
                {item.distance ? <span>{item.distance}</span> : null}
                {item.cost ? <span>{item.cost}</span> : null}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
