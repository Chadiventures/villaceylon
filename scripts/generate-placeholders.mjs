// Generates designed (not broken-looking) cream/forest gradient SVG placeholders for
// every image slot in scripts/image-slots.mjs (kept in sync with lib/images.ts): a
// soft gradient, a subtle grain, and a small centred line-icon that hints at the
// slot's subject. These are NOT stock photos, and have no visible text, just enough
// design so the layout looks intentional until real photography replaces them.
// Re-run after adding slots: `node scripts/generate-placeholders.mjs`
import { mkdirSync, writeFileSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import { slots } from "./image-slots.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, "..", "public", "images", "placeholders")

const CREAM = "#F5EDDA"
const FOREST = "#243F34"
const AMBER = "#E3A24C"

mkdirSync(outDir, { recursive: true })

// Simple centred line-icon paths, drawn in a 0 0 100 100 box, stroke only, no fill.
const icons = {
  pool: '<path d="M14 62c6 6 12-6 18 0s12 6 18 0 12-6 18 0 12 6 18 0" /><path d="M14 78c6 6 12-6 18 0s12 6 18 0 12-6 18 0 12 6 18 0" /><path d="M30 30h8l-4 24h-4z" /><circle cx="34" cy="20" r="6" />',
  fork: '<path d="M32 16v30c0 5-4 9-9 9s-9-4-9-9V16" /><path d="M23 55v29" /><path d="M23 16v18" /><path d="M68 16c-7 0-11 7-11 18s4 14 11 14 11-3 11-14-4-18-11-18z" /><path d="M68 48v36" />',
  cocktail: '<path d="M20 22h60l-30 34z" /><path d="M50 56v28" /><path d="M36 84h28" /><path d="M30 22c4 6 10 6 14 0M56 22c4 6 10 6 14 0" />',
  palm: '<path d="M50 90V52" /><path d="M50 52c-10-14-28-16-38-10 8-2 24 2 30 14" /><path d="M50 52c10-14 28-16 38-10-8-2-24 2-30 14" /><path d="M50 52c-4-16 2-30 14-36-6 10-8 24-4 36" /><path d="M50 52c4-16-2-30-14-36 6 10 8 24 4 36" /><path d="M50 52c0-16 0-28 0-36" />',
  wave: '<path d="M10 54c8-10 16-10 24 0s16 10 24 0 16-10 24 0 16 10 24 0" /><path d="M10 68c8-10 16-10 24 0s16 10 24 0 16-10 24 0 16 10 24 0" /><path d="M10 40c8-10 16-10 24 0s16 10 24 0 16-10 24 0 16 10 24 0" opacity=".5" />',
}

function svgFor(width, height, title, iconKey) {
  const icon = icons[iconKey] || icons.palm
  const size = Math.min(width, height) * 0.22
  const cx = width / 2
  const cy = height / 2
  const scale = size / 100
  const tx = cx - size / 2
  const ty = cy - size / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img">
  <title>${title}</title>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${CREAM}" />
      <stop offset="1" stop-color="${FOREST}" />
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise" />
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.035 0" />
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)" />
  <rect width="${width}" height="${height}" filter="url(#grain)" />
  <g transform="translate(${tx} ${ty}) scale(${scale})" fill="none" stroke="${AMBER}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".55">
    ${icon}
  </g>
</svg>`
}

for (const { slug, width, height, description, icon } of slots) {
  const file = join(outDir, `${slug}.svg`)
  writeFileSync(file, svgFor(width, height, description, icon), "utf8")
}

console.log(`Generated ${slots.length} designed placeholder SVGs in ${outDir}`)
