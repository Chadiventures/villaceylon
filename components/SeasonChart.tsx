const seasons = [
  { months: "November", name: "Opening", weather: "Showers easing", temp: "28°C", swell: "Building" },
  { months: "December to March", name: "Prime", weather: "Driest and sunniest", temp: "29 to 31°C", swell: "Most consistent", prime: true },
  { months: "April", name: "Easing", weather: "Warm and bright", temp: "30°C", swell: "Smaller, gentle" },
  { months: "May to October", name: "Green season", weather: "Humid, more rain", temp: "27 to 30°C", swell: "Quiet on this coast" },
]

export function SeasonChart() {
  return (
    <section className="surf-season">
      <div className="wrap">
        <div className="surf-season-head">
          <p className="eyebrow">Season</p>
          <h2>The south coast year</h2>
          <p>Warm all year. The best weather and the swell arrive together, from November to April.</p>
        </div>
        <div className="sc-grid">
          {seasons.map((season) => (
            <article className={season.prime ? "sc prime" : "sc"} key={season.name}>
              <p className="sc-month">{season.months}</p>
              <h3 className="sc-title">{season.name}</h3>
              <div className="sc-rows">
                <div className="sc-row"><span>Weather</span><strong>{season.weather}</strong></div>
                <div className="sc-row"><span>Temp</span><strong>{season.temp}</strong></div>
                <div className="sc-row"><span>Swell</span><strong>{season.swell}</strong></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
