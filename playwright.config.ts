import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  use: { baseURL: "http://localhost:3100" },
  webServer: {
    command: "npx cross-env NEXT_DIST_DIR=.next-test next dev -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
