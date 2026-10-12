// Usage: node scripts/hero-shots.mjs [w x h ...]   → screenshots/hero-<w>x<h>.png (viewport only)
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const all = ["1920x1080", "1536x864", "1440x900", "1366x768", "1280x720", "1024x768", "768x1024", "430x932", "390x844", "375x667", "360x740"];
const sizes = (process.argv.length > 2 ? process.argv.slice(2) : all).map((s) => s.split("x").map(Number));
mkdirSync("screenshots", { recursive: true });
const b = await chromium.launch();
for (const [w, h] of sizes) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3100/", { waitUntil: "load", timeout: 180000 });
  await p.waitForTimeout(3200);
  await p.screenshot({ path: `screenshots/hero-${w}x${h}.png` });
  console.log("ok", w, h);
  await ctx.close();
}
await b.close();
