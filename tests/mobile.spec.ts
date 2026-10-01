import { expect, test, type Page } from "@playwright/test"
import path from "node:path"

const ROUTES = [
  { name: "home", path: "/" },
  { name: "rooms", path: "/rooms" },
  { name: "room-detail", path: "/rooms#double" },
  { name: "house", path: "/house" },
  { name: "guide", path: "/guide" },
  { name: "guide-surf", path: "/guide/surf" },
  { name: "guide-eat", path: "/guide/eat" },
  { name: "guide-things", path: "/guide/things-to-do" },
  { name: "guide-day-trips", path: "/guide/day-trips" },
  { name: "guide-getting-here", path: "/guide/getting-here" },
  { name: "guide-good-to-know", path: "/guide/good-things-to-know" },
  { name: "book", path: "/book" },
  { name: "faq", path: "/faq" },
] as const

const WIDTHS = [320, 360, 375, 390, 393, 412, 430, 768]
const SHOT_DIR = path.join(process.cwd(), "tests", "screenshots", "mobile")

const DEVICES = [
  { name: "iphone-se", width: 375, height: 667 },
  { name: "iphone-14", width: 390, height: 844 },
  { name: "iphone-15-pro-max", width: 430, height: 932 },
  { name: "pixel-7", width: 412, height: 915 },
  { name: "galaxy-s23", width: 360, height: 780 },
]

async function dismissChrome(page: Page) {
  const decline = page.getByRole("button", { name: /decline non-essential/i })
  if (await decline.isVisible().catch(() => false)) await decline.click()
}

async function assertNoOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const root = document.scrollingElement || document.documentElement
    return {
      scrollWidth: root.scrollWidth,
      innerWidth: window.innerWidth,
    }
  })
  expect(overflow.scrollWidth, `scrollWidth ${overflow.scrollWidth} > innerWidth ${overflow.innerWidth}`).toBeLessThanOrEqual(overflow.innerWidth)
}

async function openRoute(page: Page, route: string, width: number, height = 844) {
  await page.setViewportSize({ width, height })
  await page.goto(route, { waitUntil: "domcontentloaded" })
  await dismissChrome(page)
  await page.waitForTimeout(200)
}

test.describe("mobile overflow and screenshots", () => {
  test.skip(({ browserName }) => browserName === "webkit")
  for (const width of WIDTHS) {
    for (const route of ROUTES) {
      test(`${route.name} ${width}px has no horizontal overflow`, async ({ page }) => {
        await openRoute(page, route.path, width, width >= 768 ? 1024 : 844)
        await assertNoOverflow(page)
        await page.screenshot({
          path: path.join(SHOT_DIR, String(width), `${route.name}.png`),
          fullPage: true,
        })
      })
    }
  }
})

test.describe("device viewports", () => {
  for (const device of DEVICES) {
    test(`${device.name} home rooms book faq`, async ({ page }) => {
      for (const route of ["/", "/rooms", "/book", "/faq"]) {
        await page.setViewportSize({ width: device.width, height: device.height })
        await page.goto(route, { waitUntil: "domcontentloaded" })
        await dismissChrome(page)
        await assertNoOverflow(page)
      }
    })
  }
})

test("mobile date and guests sheets", async ({ page }) => {
  await openRoute(page, "/", 390, 844)
  await page.getByTestId("search-checkin").click()
  await expect(page.locator(".sheet-panel")).toBeVisible()
  await expect(page.getByTestId("search-datepicker")).toBeVisible()
  await expect(page.locator(".sheet-handle")).toBeVisible()
  await expect(page.locator(".dr-done")).toBeVisible()
  await page.locator(".sheet-backdrop").click({ position: { x: 10, y: 10 } })
  await expect(page.locator(".sheet-panel")).toHaveCount(0)
  await page.getByTestId("search-guests").click()
  await expect(page.locator(".sheet-panel")).toBeVisible()
  await expect(page.getByLabel("Increase guests")).toBeVisible()
  await page.getByRole("button", { name: "Done" }).click()
  await expect(page.locator(".sheet-panel")).toHaveCount(0)
})

test("sticky bar hidden on book and sheet", async ({ page }) => {
  await openRoute(page, "/", 390, 844)
  await expect(page.locator(".sticky-book.show")).toBeVisible()
  await page.getByTestId("search-checkin").click()
  await expect(page.locator(".sticky-book.show")).toHaveCount(0)
  await page.goto("/book", { waitUntil: "domcontentloaded" })
  await dismissChrome(page)
  await expect(page.locator(".sticky-book.show")).toHaveCount(0)
})

test("header drawer opens", async ({ page }) => {
  await openRoute(page, "/", 390, 844)
  await page.getByRole("button", { name: "Open menu" }).click()
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible()
  await expect(page.getByRole("link", { name: "WhatsApp us" })).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("dialog", { name: "Menu" })).toHaveCount(0)
})
