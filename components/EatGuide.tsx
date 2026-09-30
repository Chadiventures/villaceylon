'use client'
import { useEffect, useState } from "react"

type Place = { name: string; desc: string }
type Group = { id: string; title: string; note?: string; items: Place[] }

export function EatGuide({ groups, label = "Where to eat" }: { groups: Group[]; label?: string }) {
  const [active, setActive] = useState(groups[0]?.id ?? "")
  useEffect(() => {
    const nodes = groups.map((group) => document.getElementById(group.id)).filter((node): node is HTMLElement => !!node)
    const observer = new IntersectionObserver((entries) => {
      const hit = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (hit?.target.id) setActive(hit.target.id)
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.4] })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [groups])
  function open(id: string) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <>
      <nav className="eat-nav" aria-label={label}>
        {groups.map((group) => (
          <button key={group.id} type="button" className={active === group.id ? "on" : ""} onClick={() => open(group.id)}>{group.title}</button>
        ))}
      </nav>
      <div className="eat-body">
        {groups.map((group) => {
          const mid = Math.ceil(group.items.length / 2)
          const columns = [group.items.slice(0, mid), group.items.slice(mid)]
          return (
            <section className="eat-group" id={group.id} key={group.id}>
              <h2>{group.title}</h2>
              {group.note ? <p className="eat-note">{group.note}</p> : null}
              <div className="eat-cols">
                {columns.map((column, index) => (
                  <div className="eat-col" key={group.id + index}>
                    {column.map((item) => (
                      <div className="eat-place" key={item.name}>
                        <h3>{item.name}</h3>
                        <p>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}
