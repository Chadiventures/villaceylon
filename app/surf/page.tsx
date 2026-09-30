import { Cta } from "../../components/Cta"
import { InfoList } from "../../components/InfoList"
import { SeasonChart } from "../../components/SeasonChart"
import { Section } from "../../components/Section"
import { SurfMap } from "../../components/SurfMap"

export default function SurfPage() {
  return (
    <>
      <section className="surf-hero">
        <div className="sh-glow" />
        <div className="sh-glow2" />
        <div className="wrap">
          <p className="eyebrow">Surf / Fitness</p>
          <h1 style={{ marginTop: 16 }}>Ten breaks,<br />fifteen <em>minutes</em></h1>
          <p className="lead">From a first lesson in the white water at Kabalana to the reef at The Rock, the south coast surf sits within a short tuk-tuk of the garden. Season runs November to April.</p>
        </div>
      </section>
      <Section className="surf-dark">
        <SurfMap />
        <InfoList
          items={[
            { meta: "5 min", title: "Kabalana", text: "About a five minute drive from Ahangama, good for intermediate and advanced surfers." },
            { meta: "Home", title: "Ahangama", text: "The Rock, Marshmallows, Gas Station and Sticks are reef peaks right here, best in the morning." },
            { meta: "10 min", title: "Midigama", text: "Lazy Left, Lazy Right, Rams and Plantations. Reef breaks for surfers with a bit of experience." },
            { meta: "15 min", title: "Weligama Bay", text: <>A beach break with sandbanks, perfect for beginners, intermediates and advanced surfers. <a href="https://www.lahirusurfweligama.com/" target="_blank" rel="noopener">Lahiru Surf Weligama</a> runs good private and group lessons there.</> },
          ]}
        />
      </Section>
      <SeasonChart />
      <section className="surf-yoga">
        <div className="wrap">
          <div className="surf-yoga-head">
            <h2 className="eyebrow">Yoga and fitness</h2>
            <p className="yoga-lead">If you are looking for a yoga, pilates or fitness studio during your stay, here are the ones we recommend nearby.</p>
          </div>
          <div className="yfit-grid">
            <article className="yfit-block">
              <span className="yfit-n">01</span>
              <h3>Yoga</h3>
              <p>Tahini and Friends, The Well and Yoga Ahangama.</p>
            </article>
            <article className="yfit-block">
              <span className="yfit-n">02</span>
              <h3>Fitness</h3>
              <p>Loka Lanka Fitness.</p>
            </article>
            <article className="yfit-block">
              <span className="yfit-n">03</span>
              <h3>Pilates</h3>
              <p>Pura Pilates.</p>
            </article>
          </div>
        </div>
      </section>
      <Cta />
    </>
  )
}
