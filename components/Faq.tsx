import Link from "next/link"
import type { FaqGroup, FaqItem } from "../lib/faq"

function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.id} id={item.id}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
          {item.href ? (
            <p className="faq-link">
              <Link href={item.href}>{item.hrefLabel || "Learn more"}</Link>
            </p>
          ) : null}
        </details>
      ))}
    </div>
  )
}

export function Faq({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="faq-groups">
      {groups.map((group) => (
        <section className="faq-group" key={group.id} id={group.id}>
          <h2>{group.title}</h2>
          <FaqList items={group.items} />
        </section>
      ))}
    </div>
  )
}

export function FaqSeed({ items, title = "Quick answers" }: { items: FaqItem[]; title?: string }) {
  return (
    <div className="faq-seed">
      <p className="eyebrow">{title}</p>
      <FaqList items={items} />
    </div>
  )
}
