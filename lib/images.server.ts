import "server-only"
import { existsSync } from "fs"
import { join } from "path"
import { listImageSlots, resolveImages, type Images } from "./images"

const PUBLIC_DIR = join(process.cwd(), "public")

function realFileExists(slug: string) {
  return existsSync(join(PUBLIC_DIR, "images", `${slug}.jpg`))
}

/** Each slot, with src pointing at the real photo or the placeholder. */
export function getResolvedImages(): Images {
  return resolveImages(realFileExists)
}

/** Slugs (IMAGES.* paths) still showing a placeholder instead of a real photo. */
export function placeholderSlots(): string[] {
  return listImageSlots(getResolvedImages())
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
