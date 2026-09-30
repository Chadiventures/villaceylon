const items = [
  "Free cancellation up to 5 days before check-in: full refund.",
  "Less than 5 days before check-in: non-refundable.",
  "No-show: non-refundable.",
  "Shortening your stay less than 5 days before check-in: the removed nights are non-refundable.",
  "Approved refunds return to your original payment method within 5 to 10 business days.",
  "The same terms apply whether you book here, on Airbnb or on Booking.com.",
]

export function PolicyCard({ hint }: { hint?: boolean }) {
  return (
    <div className="policy">
      <h3>Cancellation and refund policy</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {hint ? <p className="phint">Free cancellation up to 5 days before check-in. Full refund.</p> : null}
    </div>
  )
}
