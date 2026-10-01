export function RoomCompare() {
  return (
    <section className="room-compare">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Compare</p>
          <h2>Choose your room</h2>
        </div>
        <div className="compare-cards">
          <article className="compare-card">
            <h3>Deluxe double</h3>
            <dl>
              <div><dt>Sleeps</dt><dd>2</dd></div>
              <div><dt>Bed</dt><dd>King</dd></div>
              <div><dt>Floor</dt><dd>1st / 2nd</dd></div>
              <div><dt>Size</dt><dd>34 m²</dd></div>
              <div><dt>From</dt><dd>$65 / night</dd></div>
            </dl>
          </article>
          <article className="compare-card">
            <h3>Deluxe four-bed</h3>
            <dl>
              <div><dt>Sleeps</dt><dd>4</dd></div>
              <div><dt>Bed</dt><dd>King + bunk</dd></div>
              <div><dt>Floor</dt><dd>Ground</dd></div>
              <div><dt>Size</dt><dd>34 m²</dd></div>
              <div><dt>From</dt><dd>$90 / night</dd></div>
            </dl>
          </article>
        </div>
        <div className="compare-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Deluxe double</th>
                <th scope="col">Deluxe four-bed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Sleeps</th>
                <td>2</td>
                <td>4</td>
              </tr>
              <tr>
                <th scope="row">Bed</th>
                <td>King</td>
                <td>King + bunk</td>
              </tr>
              <tr>
                <th scope="row">Floor</th>
                <td>1st / 2nd</td>
                <td>Ground</td>
              </tr>
              <tr>
                <th scope="row">Size</th>
                <td>34 m²</td>
                <td>34 m²</td>
              </tr>
              <tr>
                <th scope="row">From</th>
                <td>$65 / night</td>
                <td>$90 / night</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
