// Prints the image slot table to the console and writes it to docs/IMAGE-SLOTS.md.
// Run after changing scripts/image-slots.mjs: `node scripts/print-image-slots.mjs`
import { mkdirSync, writeFileSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import { slots } from "./image-slots.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

function aspect(width, height) {
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b)
  }
  const d = gcd(width, height)
  return `${width / d}:${height / d}`
}

const rows = slots.map((s) => ({
  slot: `IMAGES.${s.imagesPath}`,
  path: `/public/images/${s.slug}.jpg`,
  size: `${s.width}×${s.height}`,
  aspect: aspect(s.width, s.height),
  description: s.description,
}))

const header = ["Slot", "File path", "Recommended size", "Aspect ratio", "What the photo must show"]
const widths = header.map((h, i) => Math.max(h.length, ...rows.map((r) => Object.values(r)[i].length)))

function printRow(cells) {
  return "| " + cells.map((cell, i) => cell.padEnd(widths[i])).join(" | ") + " |"
}

const consoleLines = [printRow(header), printRow(widths.map((w) => "-".repeat(w)))]
rows.forEach((r) => consoleLines.push(printRow(Object.values(r))))
console.log(consoleLines.join("\n"))

const md = `# Image slots

Every image on the site comes from a single typed manifest: \`lib/images.ts\`. Drop a
file at the exact path below and rebuild. The placeholder for that slot is replaced
automatically, no code changes needed.

- All photo slots expect a \`.jpg\` file at the path shown.
- The hero video (not listed below) expects \`/public/video/hero.mp4\` and, optionally,
  \`/public/video/hero.webm\` (10 to 15 seconds, 1080p max, under 3MB each, no audio).
  While neither exists, the hero shows the poster placeholder instead, with no broken
  video box.
- Run \`node scripts/check-images.mjs\` any time to see which slots are still
  placeholders. Run \`LAUNCH_CHECK=1 node scripts/check-images.mjs\` before a real
  launch to make missing photos fail the command.

| Slot | File path | Recommended size | Aspect ratio | What the photo must show |
| --- | --- | --- | --- | --- |
${rows.map((r) => `| \`${r.slot}\` | \`${r.path}\` | ${r.size}px | ${r.aspect} | ${r.description} |`).join("\n")}
`

mkdirSync(join(root, "docs"), { recursive: true })
writeFileSync(join(root, "docs", "IMAGE-SLOTS.md"), md, "utf8")
console.log(`\nWrote docs/IMAGE-SLOTS.md (${rows.length} slots)`)
