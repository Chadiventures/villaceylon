import { copy } from "../lib/copy"
import { getLocale } from "../lib/locale"
import { exampleRates } from "../lib/prices"
import { Price } from "./CurrencyToggle"

export async function RoomCompare() {
  const locale = await getLocale()
  const night = copy.compare.perNight[locale]
  return (
    <section className="room-compare">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">{copy.compare.eyebrow[locale]}</p>
          <h2>{copy.compare.title[locale]}</h2>
        </div>
        <div className="compare-cards">
          <article className="compare-card">
            <h3>{copy.compare.double[locale]}</h3>
            <dl>
              <div><dt>{copy.compare.sleeps[locale]}</dt><dd>2</dd></div>
              <div><dt>{copy.compare.bed[locale]}</dt><dd>{copy.compare.king[locale]}</dd></div>
              <div><dt>{copy.compare.floor[locale]}</dt><dd>{copy.compare.floors[locale]}</dd></div>
              <div><dt>{copy.compare.size[locale]}</dt><dd>34 m²</dd></div>
              <div><dt>{copy.compare.from[locale]}</dt><dd><Price usd={exampleRates.double} /> {night}</dd></div>
            </dl>
          </article>
          <article className="compare-card">
            <h3>{copy.compare.family[locale]}</h3>
            <dl>
              <div><dt>{copy.compare.sleeps[locale]}</dt><dd>4</dd></div>
              <div><dt>{copy.compare.bed[locale]}</dt><dd>{copy.compare.kingBunk[locale]}</dd></div>
              <div><dt>{copy.compare.floor[locale]}</dt><dd>{copy.compare.ground[locale]}</dd></div>
              <div><dt>{copy.compare.size[locale]}</dt><dd>34 m²</dd></div>
              <div><dt>{copy.compare.from[locale]}</dt><dd><Price usd={exampleRates.family} /> {night}</dd></div>
            </dl>
          </article>
        </div>
        <div className="compare-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">{copy.compare.double[locale]}</th>
                <th scope="col">{copy.compare.family[locale]}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{copy.compare.sleeps[locale]}</th>
                <td>2</td>
                <td>4</td>
              </tr>
              <tr>
                <th scope="row">{copy.compare.bed[locale]}</th>
                <td>{copy.compare.king[locale]}</td>
                <td>{copy.compare.kingBunk[locale]}</td>
              </tr>
              <tr>
                <th scope="row">{copy.compare.floor[locale]}</th>
                <td>{copy.compare.floors[locale]}</td>
                <td>{copy.compare.ground[locale]}</td>
              </tr>
              <tr>
                <th scope="row">{copy.compare.size[locale]}</th>
                <td>34 m²</td>
                <td>34 m²</td>
              </tr>
              <tr>
                <th scope="row">{copy.compare.from[locale]}</th>
                <td><Price usd={exampleRates.double} /> {night}</td>
                <td><Price usd={exampleRates.family} /> {night}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
