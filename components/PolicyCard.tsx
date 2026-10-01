import { copy } from "../lib/copy"
import { getLocale } from "../lib/locale"

export async function PolicyCard({ hint }: { hint?: boolean }) {
  const locale = await getLocale()
  return (
    <div className="policy">
      <h3>{copy.policy.title[locale]}</h3>
      <ul>
        {copy.policy.items.map((item) => (
          <li key={item.en}>{item[locale]}</li>
        ))}
      </ul>
      {hint ? <p className="phint">{copy.policy.hint[locale]}</p> : null}
    </div>
  )
}
