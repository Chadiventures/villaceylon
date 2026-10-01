import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const testFile = fileURLToPath(new URL("../lib/faq.test.ts", import.meta.url))
const result = spawnSync(
  process.execPath,
  ["--experimental-strip-types", "--test", testFile],
  { stdio: "inherit" },
)

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}
