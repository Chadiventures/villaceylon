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

const footer = readFileSync(join(root, "components", "Footer.tsx"), "utf8")
const footerGuideLinks = [...footer.matchAll(/href\s*=\s*["']\/guide["']/g)]
if (footerGuideLinks.length !== 1) {
  console.error(`[check:links] FAIL: footer must contain exactly one /guide link, found ${footerGuideLinks.length}.`)
  process.exit(1)
}
if (/PdfDownloadLink|\.pdf|Download the guide/i.test(footer) || /<h4>\s*Guide\s*<\/h4>/.test(footer)) {
  console.error("[check:links] FAIL: footer must not contain a Guide column or a PDF download.")
  process.exit(1)
}

const PDF_ALLOWED = new Set([
  "app/page.tsx",
  "app/guide/page.tsx",
  "app/book/page.tsx",
  "components/GuideCard.tsx",
  "components/GuideStickyPdf.tsx",
  "components/PdfDownloadLink.tsx",
])
const PDF_MARK = /the-papaya-tree-ahangama-guide\.pdf|PdfDownloadLink|GuidePdfLink|GUIDE_PDF_HREF|Download the guide \(PDF\)/
const pdfHits = []
const bandHits = []

function walkPlacement(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      walkPlacement(full)
      continue
    }
    if (SKIP_FILES.has(entry.name) || !SOURCE_EXT.test(entry.name)) continue
    const rel = relative(root, full).replaceAll("\\", "/")
    const text = readFileSync(full, "utf8")
    if (PDF_MARK.test(text) && !PDF_ALLOWED.has(rel)) pdfHits.push(rel)
    if (/<GuideBand\b/.test(text) && rel !== "app/page.tsx" && rel !== "components/GuideCard.tsx") bandHits.push(rel)
  }
}

walkPlacement(join(root, "app"))
walkPlacement(join(root, "components"))

if (pdfHits.length || bandHits.length) {
  console.error("[check:links] FAIL: PDF download is only allowed on home, /guide, and /book.")
  for (const file of pdfHits) console.error(`  - unexpected PDF in ${file}`)
  for (const file of bandHits) console.error(`  - unexpected GuideBand in ${file}`)
  process.exit(1)
}

const guidePage = readFileSync(join(root, "app", "guide", "page.tsx"), "utf8")
const guideCss = readFileSync(join(root, "app", "guide", "guide.css"), "utf8")
if (/guide-cover|gp-close|position=["']closing["']/.test(guidePage) || /guide-cover|gp-close/.test(guideCss)) {
  console.error("[check:links] FAIL: /guide must not include the PDF cover or the dark closing block.")
  process.exit(1)
}
if (!/position=["']intro["']/.test(guidePage) || !/position=["']sticky["']/.test(readFileSync(join(root, "components", "GuideStickyPdf.tsx"), "utf8"))) {
  console.error("[check:links] FAIL: /guide must track the PDF download from the intro and the sticky bar.")
  process.exit(1)
}

const book = readFileSync(join(root, "app", "book", "page.tsx"), "utf8")
if (!/PdfDownloadLink/.test(book) || /guide-cover|GuideBand/.test(book)) {
  console.error("[check:links] FAIL: /book must keep a small PDF text link and no cover section.")
  process.exit(1)
}

const home = readFileSync(join(root, "app", "page.tsx"), "utf8")
if (!/<GuideBand\b/.test(home)) {
  console.error("[check:links] FAIL: home must keep the GuideBand PDF section.")
  process.exit(1)
}

console.log(`[check:links] OK: guide destinations are limited to ${ALLOWED_ROUTES.join(" and ")}. Footer has one /guide link and no PDF. PDF downloads stay on home, /guide, and /book.`)
