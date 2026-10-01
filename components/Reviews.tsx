import { hasReviews, trust } from "../lib/site"

export function Reviews() {
  if (!hasReviews()) return null
  return (
    <section className="reviews">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Guest notes</p>
          <h2>What stays with people</h2>
        </div>
        <div className="reviews-grid">
          {trust.reviews.map((review) => (
            <article className="review-card" key={`${review.name}-${review.country}`}>
              <p className="review-quote">{review.quote}</p>
              <p className="review-meta">{review.name} · {review.country}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
