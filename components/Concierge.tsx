'use client'
import { useEffect, useRef, useState } from "react"

type ChatMessage = { role: "user" | "assistant"; content: string; fallback?: boolean }

const greeting = "Hi, I'm Amaya, the virtual concierge for The Papaya Tree. Ask me anything about the rooms, the property, or getting here."
const fallback = "Sorry, I can't reach the desk just now. Message the team on WhatsApp and they'll help you right away."
const rateNote = "You've sent quite a few notes this hour. Message the team on WhatsApp and they'll pick it up."

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
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
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
        <section className="concierge-panel" role="dialog" aria-label="Chat with Amaya">
          <header className="concierge-head">
            <AmayaMark />
            <h2>Amaya · Virtual Concierge</h2>
            <button type="button" className="concierge-close" aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
          </header>
          <div className="concierge-thread" ref={threadRef}>
            {messages.map((message, index) => (
              <div className={message.role === "user" ? "concierge-msg me" : "concierge-msg"} key={`${message.role}-${index}`}>
                <p>{message.content}</p>
                {message.fallback ? <a href="https://wa.me/94787163242" target="_blank" rel="noopener">Message on WhatsApp</a> : null}
              </div>
            ))}
            {waiting ? (
              <div className="concierge-msg" aria-label="Amaya is typing">
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
              placeholder="Ask about your stay"
              aria-label="Message Amaya"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  void send()
                }
              }}
            />
            <button type="submit" className="btn btn-solid" disabled={waiting || !draft.trim()}>Send</button>
          </form>
        </section>
      ) : null}
      <button type="button" className="concierge-launch" aria-label={open ? "Close chat" : "Chat with Amaya"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <AmayaMark />
      </button>
    </div>
  )
}
