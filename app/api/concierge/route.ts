import Anthropic from "@anthropic-ai/sdk"
import { NextResponse } from "next/server"

const SYSTEM = `You are Amaya, the virtual concierge for The Papaya Tree, a boutique hotel in Ahangama, Sri Lanka. You are warm, welcoming, and speak like a knowledgeable local host, never robotic or overly formal.
If a guest asks directly whether you are a real person, be honest: you are the hotel's virtual concierge, here to help around the clock, and the real team is always reachable on WhatsApp for anything more personal.
FACTS YOU KNOW:
- Address: Munidasa Mawatha, Ahangama 80650, Sri Lanka
- Two room types: Deluxe Double (6 rooms, 34 sqm, king bed, private balcony, AC, wifi, garden or pool view) and Deluxe Four-Bed (1 room, 34 sqm, king + bunk bed, private patio, AC, wifi, garden view)
- On site: pool and garden, restaurant, rooftop lounge and bar, reception, workspace with wifi
- 3 minutes to the surf break and to town
- Example rate: from $65/night (confirm final pricing is set by the team, do not invent exact numbers if unsure)
- Cancellation: free cancellation up to 5 days before check-in, full refund; after that non-refundable; no-shows are not refunded
- Minimum stay: 2 nights (3-4 nights during peak weeks)
- Check-in from 2pm, check-out by 11am
- No massage, tours, or transfer services offered directly, guests can ask reception for local recommendations
- Nearby: Galle Fort day trips, stilt fishing, Ahangama surf spots
WHAT YOU CANNOT DO:
- You cannot check live room availability or create a booking (this will be added later). Direct guests to the booking page or WhatsApp (+94 78 716 3242) for anything requiring real-time availability or a confirmed reservation.
- Never promise services the hotel does not offer.
- If you don't know something, say so honestly and offer to connect them with the team on WhatsApp or email (hello@thepapayatree.com).
Keep answers short and conversational, like a helpful host, not a wall of text.`

const MAX_CHARS = 500
const MAX_PER_HOUR = 20
const HOUR = 60 * 60 * 1000

const hits = new Map<string, number[]>()

function visitorKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local"
  return ip
}

function allowed(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((time) => now - time < HOUR)
  if (recent.length >= MAX_PER_HOUR) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}

type ChatMessage = { role: "user" | "assistant"; content: string }

function readMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || !("messages" in body) || !Array.isArray(body.messages)) return null
  const messages: ChatMessage[] = []
  for (const item of body.messages) {
    if (!item || typeof item !== "object") return null
    const role = "role" in item ? item.role : null
    const content = "content" in item ? item.content : null
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null
    const text = content.trim()
    if (!text || text.length > MAX_CHARS) return null
    messages.push({ role, content: text })
  }
  const firstUser = messages.findIndex((message) => message.role === "user")
  if (firstUser < 0) return null
  const conversation = messages.slice(firstUser).slice(-20)
  for (let i = 0; i < conversation.length; i++) {
    const expected = i % 2 === 0 ? "user" : "assistant"
    if (conversation[i].role !== expected) return null
  }
  if (conversation[conversation.length - 1].role !== "user") return null
  return conversation
}

export async function POST(request: Request) {
  if (!allowed(visitorKey(request))) {
    return NextResponse.json({ error: "rate" }, { status: 429 })
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 })
  }
  const messages = readMessages(body)
  if (!messages) {
    return NextResponse.json({ error: "invalid" }, { status: 400 })
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 })
  }
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const reply = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 400,
      system: SYSTEM,
      messages,
    })
    const text = reply.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim()
    if (!text) return NextResponse.json({ error: "unavailable" }, { status: 502 })
    return NextResponse.json({ reply: text })
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 502 })
  }
}
