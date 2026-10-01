'use client'
import { useEffect, useRef, useState } from "react"
import { copy } from "../lib/copy"
import { site } from "../lib/site"
import { useLocale } from "./useLocale"

type ChatMessage = { role: "user" | "assistant"; content: string; fallback?: boolean }

function AmayaMark() {
  return (
    <svg className="amaya-mark" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#243F34" />
      <circle cx="32" cy="28" r="11" fill="#F5EDDA" />
      <path d="M18 54c3.2-9 8.2-13.5 14-13.5S42.8 45 46 54" fill="#F5EDDA" />
      <path d="M40 16c7 1 12 7 11 14" fill="none" stroke="#E3A24C" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="27" cy="27" r="1.3" fill="#243F34" />
      <circle cx="37" cy="27" r="1.3" fill="#243F34" />
      <path d="M28 32.5c1.4 1.6 2.6 2.2 4 2.2s2.6-.6 4-2.2" fill="none" stroke="#243F34" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function Concierge() {
  const locale = useLocale()
  const greeting = copy.concierge.greeting[locale]
  const fallback = copy.concierge.fallback[locale]
  const rateNote = copy.concierge.rate[locale]
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState("")
  const [waiting, setWaiting] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: greeting }])
  const threadRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const thread = threadRef.current
    if (thread) thread.scrollTop = thread.scrollHeight
  }, [messages, waiting, open])

  useEffect(() => {
    if (open) fieldRef.current?.focus()
  }, [open])

  useEffect(() => {
    setMessages((current) => {
      if (current.length === 1 && current[0].role === "assistant") return [{ role: "assistant", content: greeting }]
      return current
    })
  }, [greeting])

  async function send() {
    const text = draft.trim()
    if (!text || waiting || text.length > 500) return
    const next = [...messages, { role: "user" as const, content: text }]
    setMessages(next)
    setDraft("")
    setWaiting(true)
    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: next.map(({ role, content }) => ({ role, content })) }),
      })
      const data = await response.json().catch(() => null)
      if (response.ok && data && typeof data.reply === "string" && data.reply.trim()) {
        setMessages((current) => [...current, { role: "assistant", content: data.reply.trim() }])
      } else {
        setMessages((current) => [...current, { role: "assistant", content: response.status === 429 ? rateNote : fallback, fallback: true }])
      }
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: fallback, fallback: true }])
    } finally {
      setWaiting(false)
    }
  }

  return (
    <div className={open ? "concierge open" : "concierge"}>
      {open ? (
        <section className="concierge-panel" role="dialog" aria-label={copy.concierge.chat[locale]}>
          <header className="concierge-head">
            <AmayaMark />
            <h2>{copy.concierge.title[locale]}</h2>
            <button type="button" className="concierge-close" aria-label={copy.concierge.close[locale]} onClick={() => setOpen(false)}>×</button>
          </header>
          <div className="concierge-thread" ref={threadRef}>
            {messages.map((message, index) => (
              <div className={message.role === "user" ? "concierge-msg me" : "concierge-msg"} key={`${message.role}-${index}`}>
                <p>{message.content}</p>
                {message.fallback ? <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">{copy.concierge.whatsapp[locale]}</a> : null}
              </div>
            ))}
            {waiting ? (
              <div className="concierge-msg" aria-label={copy.concierge.typing[locale]}>
                <span className="concierge-dots"><span /><span /><span /></span>
              </div>
            ) : null}
          </div>
          <form
            className="concierge-form"
            onSubmit={(event) => {
              event.preventDefault()
              void send()
            }}
          >
            <textarea
              ref={fieldRef}
              value={draft}
              maxLength={500}
              rows={1}
              placeholder={copy.concierge.placeholder[locale]}
              aria-label={copy.concierge.message[locale]}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  void send()
                }
              }}
            />
            <button type="submit" className="btn btn-solid" disabled={waiting || !draft.trim()}>{copy.concierge.send[locale]}</button>
          </form>
        </section>
      ) : null}
      <span className="concierge-ask">{copy.concierge.ask[locale]}</span>
      <button type="button" className="concierge-launch" aria-label={open ? copy.concierge.close[locale] : copy.concierge.ask[locale]} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <AmayaMark />
      </button>
    </div>
  )
}
