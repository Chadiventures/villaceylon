import { expect, test, type Locator, type Page } from "@playwright/test"
import path from "node:path"

const CHECK_IN = "2026-10-17"
const INVALID_OUT = "2026-10-15"
const CHECK_OUT = "2026-10-19"

function hero(page: Page) {
  return page.locator(".hero")
}

async function openCheckIn(page: Page) {
  const checkIn = hero(page).getByTestId("search-checkin")
  await expect(checkIn).toBeVisible()
  await page.waitForLoadState("networkidle")
  await checkIn.click({ force: true })
  const expanded = await checkIn.getAttribute("aria-expanded")
  if (expanded !== "true") {
    await checkIn.dispatchEvent("click")
  }
  await expect(checkIn).toHaveAttribute("aria-expanded", "true")
  const picker = page.getByTestId("search-datepicker")
  await expect(picker).toBeVisible()
  return picker
}

async function showDate(page: Page, iso: string) {
  const picker = page.getByTestId("search-datepicker")
  await expect(picker).toBeVisible()
  const day = picker.locator(`[data-date="${iso}"]`)
  for (let i = 0; i < 18; i++) {
    if ((await day.count()) > 0) return day.first()
    await picker.getByLabel("Next month").click()
  }
  return day.first()
}

async function centerY(locator: Locator) {
  const box = await locator.boundingBox()
  expect(box, "expected a visible box").toBeTruthy()
  return box!.y + box!.height / 2
}

test("search bar dates, disabled checkout, labels and alignment", async ({ page }) => {
  page.on("pageerror", (error) => {
    console.log("PAGEERROR", error.message)
  })
  page.on("console", (msg) => {
    if (msg.type() === "error") console.log("CONSOLE", msg.text())
  })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/")
  const bar = hero(page)
  const checkIn = bar.getByTestId("search-checkin")
  const checkOut = bar.getByTestId("search-checkout")
  const guests = bar.getByTestId("search-guests")
  const submit = bar.getByTestId("search-submit")

  await expect(checkIn).toBeVisible()
  await expect(bar.locator('input[type="date"]')).toHaveCount(0)
  await expect(submit).toHaveText("Check availability")

  await openCheckIn(page)
  await (await showDate(page, CHECK_IN)).click()
  await expect(page.getByTestId("search-datepicker")).toBeVisible()
  await expect(await showDate(page, INVALID_OUT)).toBeDisabled()
  await (await showDate(page, CHECK_OUT)).click()

  await expect(checkIn).toContainText("Sat 17 Oct")
  await expect(checkOut).toContainText("Mon 19 Oct")
  await expect(checkIn).not.toContainText("2026-10-17")
  await expect(checkOut).not.toContainText("2026-10-19")
  await expect(checkOut).toContainText("2 nights")

  const yCheckIn = await centerY(checkIn)
  const yCheckOut = await centerY(checkOut)
  const yGuests = await centerY(guests)
  const ySubmit = await centerY(submit)
  expect(Math.abs(yCheckIn - yCheckOut)).toBeLessThanOrEqual(2)
  expect(Math.abs(yCheckIn - yGuests)).toBeLessThanOrEqual(2)
  expect(Math.abs(yCheckIn - ySubmit)).toBeLessThanOrEqual(2)

  const shots = path.join(process.cwd(), "tests", "screenshots")
  await page.screenshot({ path: path.join(shots, "search-bar-1440.png"), fullPage: false })
  await bar.locator(".search-wrap").screenshot({ path: path.join(shots, "search-bar-hero-1440.png") })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: path.join(shots, "search-bar-390.png"), fullPage: false })
  await bar.locator(".search-wrap").screenshot({ path: path.join(shots, "search-bar-hero-390.png") })
})
