const items = [
  {
    q: "What is your cancellation and refund policy?",
    a: "Free cancellation up to 5 days before check-in for a full refund. Within 5 days of check-in the booking is non-refundable, and a no-show is non-refundable. If you shorten your stay less than 5 days before check-in, the removed nights are non-refundable. Approved refunds return to your original payment method within 5 to 10 business days. The same terms apply whether you book here, on Airbnb or on Booking.com.",
  },
  {
    q: "What rooms do you have?",
    a: "Seven rooms in total. Six deluxe doubles on the first and second floors, each 34 square metres with a king bed and a private balcony over the garden and pool, and one deluxe four-bed family room on the ground floor with a king plus a bunk, opening onto a private patio. All have air conditioning, an ensuite bathroom, and both wired internet and wifi.",
  },
  {
    q: "Is there food and a bar on site?",
    a: "Yes. There is a restaurant and lounge on the ground floor for breakfasts and easy meals, and a lounge and bar on the rooftop for a drink as the sun goes down. Some of the best food in Ahangama is also a short walk away, and we are happy to point you to it.",
  },
  {
    q: "Is there a pool?",
    a: "Yes, a quiet pool in the garden for guests, ringed with papaya and palms.",
  },
  {
    q: "How far is the surf and the town?",
    a: "Both about three minutes away, on foot or by tuk-tuk. Kabalana and The Rock are the closest breaks.",
  },
  {
    q: "Do you arrange tours, transfers or lessons?",
    a: "We keep things simple and do not run a tours desk. What we can always do is point you to the honest local people we trust, in our Ahangama guide.",
  },
  {
    q: "What time is check in and check out?",
    a: "The desk is open from 2pm for check in. Check out is by 11am. Message us if your flight lands at an odd hour and we will do our best.",
  },
]

export function Faq() {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  )
}
