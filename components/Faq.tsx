import Link from "next/link"
import { copy } from "../lib/copy"
import type { FaqGroup, FaqItem } from "../lib/faq"
import { localizePath } from "../lib/i18n"
import { getLocale } from "../lib/locale"

async function FaqList({ items }: { items: FaqItem[] }) {
  const locale = await getLocale()
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.id} id={item.id}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
          {item.href ? (
            <p className="faq-link">
              <Link href={localizePath(item.href, locale)}>{item.hrefLabel || copy.faqPage.more[locale]}</Link>
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

export async function FaqSeed({ items, title }: { items: FaqItem[]; title?: string }) {
  const locale = await getLocale()
  const heading = title ?? copy.faqPage.quick[locale]
  return (
    <div className="faq-seed">
      <p className="eyebrow">{heading}</p>
      <FaqList items={items} />
    </div>
  )
}
