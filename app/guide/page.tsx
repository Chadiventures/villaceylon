import Link from "next/link"
import { Cta } from "../../components/Cta"
import { ForkIcon, PalmIcon, SunsetIcon, WaveIcon } from "../../components/Icons"

export default function GuidePage() {
  return (
    <>
      <section className="guide-intro">
        <div className="wrap">
          <div>
            <p className="eyebrow">The Ahangama guide</p>
            <h1>Everything we&apos;d tell a <em>friend</em></h1>
            <p className="guide-intro-lead">We live here. This is the guide we wish we&apos;d had: where the waves break, where to eat, and what is worth the drive. Yours to keep, whether you book or not.</p>
          </div>
          <div className="guide-pull">
            <p>Sri Lanka opens slowly, one temple shade and one long lunch at a time.<span className="attr">Ahangama · Sri Lanka</span></p>
          </div>
        </div>
      </section>
      <section className="guide-cats">
        <div className="wrap">
          <div className="gi-grid">
            <Link className="gi-card" href="/ahangama">
              <div className="gi-icon"><PalmIcon /></div>
              <p className="gi-eyebrow">Practical</p>
              <h3 className="gi-title">Good things to know</h3>
              <p className="gi-desc">Getting around, what to pack, and the small things we wish someone had told us first.</p>
              <span className="gi-link">Explore <span>›</span></span>
            </Link>
            <Link className="gi-card accent" href="/surf">
              <div className="gi-icon"><WaveIcon /></div>
              <p className="gi-eyebrow">On the water</p>
              <h3 className="gi-title">Surf & fitness</h3>
              <p className="gi-desc">The breaks, the seasons, and yoga and fitness studios nearby.</p>
              <span className="gi-link">Explore <span>›</span></span>
            </Link>
            <Link className="gi-card" href="/eat">
              <div className="gi-icon"><ForkIcon /></div>
              <p className="gi-eyebrow">At the table</p>
              <h3 className="gi-title">Eat & drink</h3>
              <p className="gi-desc">Our own restaurant for breakfast, a rooftop bar for sundowners, and the coast&apos;s best tables beyond our gate.</p>
              <span className="gi-link">Explore <span>›</span></span>
            </Link>
            <Link className="gi-card" href="/day-trips">
              <div className="gi-icon"><SunsetIcon /></div>
              <p className="gi-eyebrow">Away for the day</p>
              <h3 className="gi-title">Day trips</h3>
              <p className="gi-desc">Galle Fort, tea in the hills, and a safari. All within a day&apos;s reach.</p>
              <span className="gi-link">Explore <span>›</span></span>
            </Link>
          </div>
        </div>
      </section>
      <Cta />
    </>
  )
}
