import { hasRating, trust } from "../lib/site"

export function RatingBadge({ onDark = false }: { onDark?: boolean }) {
  if (!hasRating()) return null
  return (
    <a
      className={onDark ? "rating-badge on-dark" : "rating-badge"}
      href={trust.ratingSourceUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="rating-stars" aria-hidden="true">★★★★★</span>
      <span className="rating-score">{trust.ratingValue}</span>
      <span className="rating-count">({trust.reviewCount} reviews{trust.ratingSourceLabel ? ` on ${trust.ratingSourceLabel}` : ""})</span>
    </a>
  )
}
