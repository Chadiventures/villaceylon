/**
 * Single source of truth for every image on the site. No component should hardcode an
 * image path: import IMAGES from here instead.
 *
 * How to go live with a real photo: drop a file at the exact path listed in
 * docs/IMAGE-SLOTS.md (e.g. /public/images/home-hero.jpg) and rebuild. This module
 * checks for that file on the server with fs.existsSync at build time. If it exists,
 * that slot's `src` points at the real photo and `placeholder` is false. If it does
 * not exist yet, `src` points at a designed neutral placeholder under
 * /public/images/placeholders/ and `placeholder` stays true. No code change needed
 * either way.
 *
 * Server-only: this file calls fs.existsSync, so it must never be imported from a
 * 'use client' component (import it from a Server Component and pass the resolved
 * string down as a prop instead).
 */
import { existsSync } from "fs"
import { join } from "path"

export type Focal = "center" | "top" | "bottom" | "left" | "right"

export type ImageSlot = {
  src: string
  alt: string
  width: number
  height: number
  focal?: Focal
  caption?: string
  blurDataURL?: string
  /** True while this slot is still showing a neutral placeholder instead of a real photo. */
  placeholder: boolean
}

const PLACEHOLDER_ROOT = "/images/placeholders"
const REAL_ROOT = "/images"
const PUBLIC_DIR = join(process.cwd(), "public")

// A tiny shared gradient blur, reused across every placeholder slot. Swap for a
// per-photo blur (e.g. via plaiceholder) once real photography is in place.
const BLUR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjYiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0Y1RUREQSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI0M0YzNCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjYiIGZpbGw9InVybCgjZykiLz48L3N2Zz4="

function realFileExists(slug: string) {
  return existsSync(join(PUBLIC_DIR, "images", `${slug}.jpg`))
}

function slot(slug: string, alt: string, opts: { width?: number; height?: number; focal?: Focal; caption?: string } = {}): ImageSlot {
  const isReal = realFileExists(slug)
  return {
    src: isReal ? `${REAL_ROOT}/${slug}.jpg` : `${PLACEHOLDER_ROOT}/${slug}.svg`,
    alt,
    width: opts.width ?? 1200,
    height: opts.height ?? 900,
    focal: opts.focal ?? "center",
    caption: opts.caption,
    blurDataURL: BLUR,
    placeholder: !isReal,
  }
}

export const IMAGES = {
  home: {
    hero: slot("home-hero", "A figure walking the shoreline at golden hour near The Papaya Tree, Ahangama", { width: 1600, height: 900, caption: "Golden hour, three minutes from the gate" }),
    garden: slot("home-garden", "Tropical garden with papaya and palm trees at The Papaya Tree, Ahangama", { caption: "The garden" }),
    pool: slot("home-pool", "The Papaya Tree's pool ringed with palms and plumeria", { caption: "The pool" }),
    rooftop: slot("home-rooftop", "Rooftop lounge at The Papaya Tree at golden hour, with low seating and string lights", { caption: "The rooftop" }),
    restaurant: slot("home-restaurant", "Breakfast table with tropical fruit and coffee at The Papaya Tree", { caption: "Breakfast" }),
    surf: slot("home-surf", "A surfer on a south coast Sri Lanka wave near Ahangama", { caption: "The surf" }),
  },
  rooms: {
    double: [
      slot("rooms-double-1", "Deluxe Double room with king bed at The Papaya Tree, Ahangama"),
      slot("rooms-double-2", "Private balcony of a Deluxe Double room over the garden and pool"),
      slot("rooms-double-3", "Ensuite bathroom in a Deluxe Double room at The Papaya Tree"),
      slot("rooms-double-4", "Detail of a Deluxe Double room at The Papaya Tree"),
      slot("rooms-double-5", "Detail of a Deluxe Double room at The Papaya Tree"),
    ],
    family: [
      slot("rooms-family-1", "Deluxe Four-Bed family room with king bed and bunk at The Papaya Tree"),
      slot("rooms-family-2", "Private patio of the Deluxe Four-Bed family room"),
      slot("rooms-family-3", "Ensuite bathroom in the Deluxe Four-Bed room at The Papaya Tree"),
      slot("rooms-family-4", "Detail of the Deluxe Four-Bed family room"),
      slot("rooms-family-5", "Detail of the Deluxe Four-Bed family room"),
    ],
  },
  house: {
    pool: slot("house-pool", "The pool at The Papaya Tree, ringed with palms", { caption: "The pool" }),
    rooftop: slot("house-rooftop", "The rooftop lounge and bar at The Papaya Tree", { caption: "The rooftop" }),
    restaurant: slot("house-restaurant", "The restaurant at The Papaya Tree set for breakfast", { caption: "The restaurant" }),
    garden: slot("house-garden", "The garden at The Papaya Tree, Ahangama", { caption: "The garden" }),
    entrance: slot("house-entrance", "The entrance to The Papaya Tree, Ahangama", { caption: "The entrance" }),
  },
  guide: {
    surf: slot("guide-surf", "A surf break on the south coast near Ahangama"),
    eat: slot("guide-eat", "A beachfront meal near Ahangama"),
    things: slot("guide-things", "Stilt fishermen near Koggala, or a yoga session near Ahangama"),
    dayTrips: slot("guide-day-trips", "Galle Fort ramparts, or tea hills inland from Ahangama"),
    gettingHere: slot("guide-getting-here", "A tuk-tuk, or the coastal train that passes Ahangama"),
    goodToKnow: slot("guide-good-to-know", "Everyday street life in Ahangama"),
  },
  day: {
    dawn: slot("day-dawn", "Dawn light near The Papaya Tree, Ahangama"),
    breakfast: slot("day-breakfast", "Breakfast at The Papaya Tree"),
    pool: slot("day-pool", "Midday at the pool at The Papaya Tree"),
    afternoon: slot("day-afternoon", "An afternoon out from The Papaya Tree"),
    sunset: slot("day-sunset", "Sunset from The Papaya Tree's rooftop"),
    night: slot("day-night", "A quiet room at The Papaya Tree at night"),
  },
} as const

/** Flat list of every slot, for scripts and dev-only warnings. */
export function listImageSlots(): { path: string; slot: ImageSlot }[] {
  const out: { path: string; slot: ImageSlot }[] = []
  function walk(node: unknown, path: string[]) {
    if (!node || typeof node !== "object") return
    if ("placeholder" in (node as Record<string, unknown>) && "src" in (node as Record<string, unknown>)) {
      out.push({ path: path.join("."), slot: node as ImageSlot })
      return
    }
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => walk(item, [...path, key, String(index)]))
      } else {
        walk(value, [...path, key])
      }
    }
  }
  walk(IMAGES, [])
  return out
}

/** Slugs (IMAGES.* paths) still showing a placeholder instead of a real photo. */
export function placeholderSlots(): string[] {
  return listImageSlots()
    .filter((entry) => entry.slot.placeholder)
    .map((entry) => entry.path)
}

/** Video sources that actually exist under /public/video, for the hero video. */
export function heroVideoSources(): { webm: boolean; mp4: boolean } {
  return {
    webm: existsSync(join(PUBLIC_DIR, "video", "hero.webm")),
    mp4: existsSync(join(PUBLIC_DIR, "video", "hero.mp4")),
  }
}
