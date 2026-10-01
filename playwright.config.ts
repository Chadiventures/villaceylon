import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3020",
    trace: "off",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit-ios", testMatch: /mobile\.spec\.ts/, use: { ...devices["iPhone 14"] } },
  ],
  webServer: {
    command: "npx next dev --port 3020",
    url: "http://localhost:3020",
    reuseExistingServer: true,
    timeout: 180_000,
    env: {
      NEXT_DIST_DIR: ".next-mobile-e2e",
    },
  },
})
