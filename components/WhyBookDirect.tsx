const points = [
  { label: "Best rate, always" },
  { label: "Flexible cancellation" },
  { label: "A real person answers on WhatsApp", oneLine: true },
]

export function WhyBookDirect() {
  return (
    <section className="why-direct">
      <div className="wrap">
        <p className="eyebrow">Why book direct</p>
        <ul className="why-grid">
          {points.map((point) => (
            <li key={point.label} className={point.oneLine ? "why-one-line" : undefined}>
              <span className="why-dot" aria-hidden="true" />
              <span>{point.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
