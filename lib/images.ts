/**
 * Single source of truth for every image on the site. No component should hardcode an
 * image path: import slot definitions from here, and resolve them with
 * getResolvedImages() from lib/images.server.ts.
 *
 * How to go live with a real photo: drop a file at the exact path listed in
 * docs/IMAGE-SLOTS.md (e.g. /public/images/home-hero.jpg) and rebuild. The server
 * resolver checks for that file. If it exists, that slot's `src` points at the real
 * photo and `placeholder` is false. If it does not exist yet, `src` points at a
 * designed neutral placeholder under /public/images/placeholders/ and `placeholder`
 * stays true. No code change needed either way.
 *
 * This module is pure data and helpers. It does not import Node APIs, so client and
 * server components can both import types and definitions from here.
 */
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

export type ImageSlotDef = {
  slug: string
  alt: string
  width: number
  height: number
  focal: Focal
  caption?: string
}

const PLACEHOLDER_ROOT = "/images/placeholders"
const REAL_ROOT = "/images"

// A tiny shared gradient blur, reused across every placeholder slot. Swap for a
// per-photo blur (e.g. via plaiceholder) once real photography is in place.
const BLUR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjYiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0Y1RUREQSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI0M0YzNCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjYiIGZpbGw9InVybCgjZykiLz48L3N2Zz4="

export function placeholderPath(slug: string) {
  return `${PLACEHOLDER_ROOT}/${slug}.svg`
}

export function realImagePath(slug: string) {
  return `${REAL_ROOT}/${slug}.jpg`
}

export function slotFromDef(definition: ImageSlotDef, fileExists: boolean): ImageSlot {
  return {
    src: fileExists ? realImagePath(definition.slug) : placeholderPath(definition.slug),
    alt: definition.alt,
    width: definition.width,
    height: definition.height,
    focal: definition.focal,
    caption: definition.caption,
    blurDataURL: BLUR,
    placeholder: !fileExists,
  }
}

function def(slug: string, alt: string, opts: { width?: number; height?: number; focal?: Focal; caption?: string } = {}): ImageSlotDef {
  return {
    slug,
    alt,
    width: opts.width ?? 1200,
    height: opts.height ?? 900,
    focal: opts.focal ?? "center",
    caption: opts.caption,
  }
}

export const IMAGE_DEFS = {
  home: {
    hero: def("home-hero", "A figure walking the shoreline at golden hour near The Papaya Tree, Ahangama", { width: 1600, height: 900, caption: "Golden hour, three minutes from the gate" }),
    garden: def("home-garden", "Tropical garden with papaya and palm trees at The Papaya Tree, Ahangama", { caption: "The garden" }),
    pool: def("home-pool", "The Papaya Tree's pool ringed with palms and plumeria", { caption: "The pool" }),
    rooftop: def("home-rooftop", "Rooftop lounge at The Papaya Tree at golden hour, with low seating and string lights", { caption: "The rooftop" }),
    restaurant: def("home-restaurant", "Breakfast table with tropical fruit and coffee at The Papaya Tree", { caption: "Breakfast" }),
    surf: def("home-surf", "A surfer on a south coast Sri Lanka wave near Ahangama", { caption: "The surf" }),
  },
  rooms: {
    double: [
      def("rooms-double-1", "Deluxe Double room with king bed at The Papaya Tree, Ahangama"),
      def("rooms-double-2", "Private balcony of a Deluxe Double room over the garden and pool"),
      def("rooms-double-3", "Ensuite bathroom in a Deluxe Double room at The Papaya Tree"),
      def("rooms-double-4", "Detail of a Deluxe Double room at The Papaya Tree"),
      def("rooms-double-5", "Detail of a Deluxe Double room at The Papaya Tree"),
    ],
    family: [
      def("rooms-family-1", "Deluxe Four-Bed family room with king bed and bunk at The Papaya Tree"),
      def("rooms-family-2", "Private patio of the Deluxe Four-Bed family room"),
      def("rooms-family-3", "Ensuite bathroom in the Deluxe Four-Bed room at The Papaya Tree"),
      def("rooms-family-4", "Detail of the Deluxe Four-Bed family room"),
      def("rooms-family-5", "Detail of the Deluxe Four-Bed family room"),
    ],
  },
  house: {
    pool: def("house-pool", "The pool at The Papaya Tree, ringed with palms", { caption: "The pool" }),
    rooftop: def("house-rooftop", "The rooftop lounge and bar at The Papaya Tree", { caption: "The rooftop" }),
    restaurant: def("house-restaurant", "The restaurant at The Papaya Tree set for breakfast", { caption: "The restaurant" }),
    garden: def("house-garden", "The garden at The Papaya Tree, Ahangama", { caption: "The garden" }),
    entrance: def("house-entrance", "The entrance to The Papaya Tree, Ahangama", { caption: "The entrance" }),
  },
  guide: {
    surf: def("guide-surf", "A surf break on the south coast near Ahangama"),
    eat: def("guide-eat", "A beachfront meal near Ahangama"),
    things: def("guide-things", "Stilt fishermen near Koggala, or a yoga session near Ahangama"),
    dayTrips: def("guide-day-trips", "Galle Fort ramparts, or tea hills inland from Ahangama"),
    gettingHere: def("guide-getting-here", "A tuk-tuk, or the coastal train that passes Ahangama"),
    goodToKnow: def("guide-good-to-know", "Everyday street life in Ahangama"),
  },
  day: {
    dawn: def("day-dawn", "Dawn light near The Papaya Tree, Ahangama"),
    breakfast: def("day-breakfast", "Breakfast at The Papaya Tree"),
    pool: def("day-pool", "Midday at the pool at The Papaya Tree"),
    afternoon: def("day-afternoon", "An afternoon out from The Papaya Tree"),
    sunset: def("day-sunset", "Sunset from The Papaya Tree's rooftop"),
    night: def("day-night", "A quiet room at The Papaya Tree at night"),
  },
}

export type Images = {
  home: {
    hero: ImageSlot
    garden: ImageSlot
    pool: ImageSlot
    rooftop: ImageSlot
    restaurant: ImageSlot
    surf: ImageSlot
  }
  rooms: {
    double: ImageSlot[]
    family: ImageSlot[]
  }
  house: {
    pool: ImageSlot
    rooftop: ImageSlot
    restaurant: ImageSlot
    garden: ImageSlot
    entrance: ImageSlot
  }
  guide: {
    surf: ImageSlot
    eat: ImageSlot
    things: ImageSlot
    dayTrips: ImageSlot
    gettingHere: ImageSlot
    goodToKnow: ImageSlot
  }
  day: {
    dawn: ImageSlot
    breakfast: ImageSlot
    pool: ImageSlot
    afternoon: ImageSlot
    sunset: ImageSlot
    night: ImageSlot
  }
}

function isSlotDef(node: unknown): node is ImageSlotDef {
  if (!node || typeof node !== "object") return false
  const record = node as Record<string, unknown>
  return typeof record.slug === "string" && typeof record.alt === "string" && typeof record.width === "number"
}

/** Apply a file-exists check to every slot definition. The check itself stays outside this file. */
export function resolveImages(fileExists: (slug: string) => boolean): Images {
  function walk(node: unknown): unknown {
    if (Array.isArray(node)) return node.map((item) => walk(item))
    if (isSlotDef(node)) return slotFromDef(node, fileExists(node.slug))
    if (node && typeof node === "object") {
      const out: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(node)) out[key] = walk(value)
      return out
    }
    return node
  }
  return walk(IMAGE_DEFS) as Images
}

/** Flat list of every resolved slot, for scripts and dev-only warnings. */
export function listImageSlots(images: Images): { path: string; slot: ImageSlot }[] {
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
  walk(images, [])
  return out
}
