export function Stats() {
  return (
    <section className="stats">
      <div className="glow" />
      <div className="wrap">
        <div className="stat">
          <div className="n" data-count="7">7</div>
          <div className="l">Rooms in the house</div>
        </div>
        <div className="stat">
          <div className="n" data-count="3" data-suf=" min">3 min</div>
          <div className="l">To the surf and town</div>
        </div>
        <div className="stat">
          <div className="n" data-count="65" data-pre="$">$65</div>
          <div className="l">Per night, two guests</div>
        </div>
        <div className="stat">
          <div className="n words">Nov to Apr</div>
          <div className="l">Surf season</div>
        </div>
      </div>
    </section>
  )
}
