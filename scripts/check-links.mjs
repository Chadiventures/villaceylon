// Guide destinations must be /guide or the PDF. Old /guide/surf style URLs stay
// as redirects only, never as linked hrefs in app source.
import { readFileSync, readdirSync } from "fs"
import { dirname, join, relative } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const SKIP_DIRS = new Set(["node_modules", ".next", ".next-e2e", ".next-mobile-build", ".next-mobile-e2e", ".git", "test-results", "playwright-report"])
const SKIP_FILES = new Set(["check-links.mjs", "next.config.ts"])
const SOURCE_EXT = /\.(tsx|ts|js|mjs|jsx)$/
const BANNED = /(?:href|to|path)\s*[:=]\s*["'`](\/guide\/[a-z0-9-]+|\/(?:surf|eat|things-to-do|day-trips|getting-here|good-things-to-know))(?:["'`?#]|$)/g
const BANNED_BARE = /["'`](\/guide\/[a-z0-9-]+)["'`]/g
const ALLOWED_ROUTES = ["/guide", "/the-papaya-tree-ahangama-guide.pdf"]

const hits = []

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
      continue
    }
    if (SKIP_FILES.has(entry.name) || !SOURCE_EXT.test(entry.name)) continue
    const rel = relative(root, full).replaceAll("\\", "/")
    const text = readFileSync(full, "utf8")
    for (const match of text.matchAll(BANNED)) {
      hits.push({ file: rel, url: match[1] })
    }
    for (const match of text.matchAll(BANNED_BARE)) {
      if (ALLOWED_ROUTES.includes(match[1])) continue
      if (hits.some((hit) => hit.file === rel && hit.url === match[1])) continue
      hits.push({ file: rel, url: match[1] })
    }
  }
}

walk(join(root, "app"))
walk(join(root, "components"))
walk(join(root, "lib"))
walk(join(root, "tests"))

if (hits.length) {
  console.error("[check:links] FAIL: leftover guide subpage links found:")
  for (const hit of hits) {
    console.error(`  - ${hit.file}: ${hit.url}`)
  }
  process.exit(1)
}

console.log(`[check:links] OK: guide destinations are limited to ${ALLOWED_ROUTES.join(" and ")}.`)
