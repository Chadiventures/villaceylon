// Image gate. Safe to run on every normal build/deploy: it never fails just because
// real photos are still missing, it only warns. Set LAUNCH_CHECK=1 to additionally
// fail when any slot is still a placeholder (use that right before a real launch).
//   node scripts/check-images.mjs
//   LAUNCH_CHECK=1 node scripts/check-images.mjs
import { existsSync, readFileSync, readdirSync, statSync } from "fs"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import { slots } from "./image-slots.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const launchCheck = process.env.LAUNCH_CHECK === "1"

const BANNED = ["istock", "gettyimages", "getty images", "shutterstock"]

let hardFailed = false

function walk(dir, onFile) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, onFile)
    } else {
      onFile(full)
    }
  }
}

// Always fatal, on every build: no file anywhere in the repo may reference a
// stock-photo vendor by name, in its path or its own content/metadata.
walk(root, (file) => {
  const lower = file.toLowerCase()
  for (const term of BANNED) {
    if (lower.includes(term.replace(" ", ""))) {
      console.error(`[check-images] FAIL: file path mentions a stock vendor: ${file}`)
      hardFailed = true
    }
  }
  if (/\.(jpe?g|png|webp|gif)$/i.test(file) && statSync(file).size > 0) {
    try {
      const head = readFileSync(file, { encoding: "latin1", flag: "r" }).slice(0, 200000)
      for (const term of BANNED) {
        if (head.toLowerCase().includes(term)) {
          console.error(`[check-images] FAIL: ${file} appears to contain the text "${term}" (possible watermark/metadata).`)
          hardFailed = true
        }
      }
    } catch {
      // unreadable as text, ignore
    }
  }
})

// Placeholder slots: always reported, only fatal when LAUNCH_CHECK=1.
const missingSlots = slots.filter((entry) => !existsSync(join(root, "public", "images", `${entry.slug}.jpg`)))

if (missingSlots.length > 0) {
  console.log(
    `[check-images] ${missingSlots.length} of ${slots.length} image slot(s) are still on a placeholder:\n` +
      missingSlots.map((entry) => `  - IMAGES.${entry.imagesPath} → public/images/${entry.slug}.jpg`).join("\n"),
  )
} else {
  console.log(`[check-images] All ${slots.length} image slot(s) have a real photo in place.`)
}

if (launchCheck && missingSlots.length > 0) {
  console.error(
    "[check-images] FAIL (LAUNCH_CHECK=1): one or more slots still resolve to a placeholder. " +
      "Add the missing photos listed above (see docs/IMAGE-SLOTS.md) before launch.",
  )
  hardFailed = true
} else if (!launchCheck) {
  console.warn(
    "[check-images] NOTE: the placeholder check above is a warning only in this run (LAUNCH_CHECK is not set). " +
      "Run with LAUNCH_CHECK=1 before a real launch to make missing photos a hard failure.",
  )
}

if (hardFailed) {
  console.error("\n[check-images] One or more checks failed. See above.")
  process.exit(1)
} else {
  console.log("[check-images] OK: no stock-vendor references found" + (launchCheck ? ", and no placeholder slots remain." : "."))
}
