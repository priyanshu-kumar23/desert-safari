import { expect, test } from "@playwright/test";

const widths = [360, 390, 768, 1024, 1100, 1280, 1366, 1440, 1536, 1920];

type Box = { name: string; x: number; y: number; w: number; h: number };

for (const width of widths) {
  test(`header has no overlapping siblings @ ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.waitForSelector("[data-site-header]");

    const result = await page.evaluate(() => {
      const grid = document.querySelector("[data-site-header] > div") as HTMLElement;
      const boxes: Box[] = [];
      for (const el of Array.from(grid.children) as HTMLElement[]) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue; // display:none
        boxes.push({ name: el.getAttribute("data-header-nav") !== null ? "nav" : el.getAttribute("data-header-actions") !== null ? "actions" : "logo", x: r.x, y: r.y, w: r.width, h: r.height });
      }
      // also the visible direct children of nav + actions must not collide with each other
      const leaves: Box[] = [];
      for (const sel of ["[data-header-nav] ul > li:not([style*='display: none'])", "[data-header-actions] > *"]) {
        for (const el of Array.from(document.querySelectorAll(sel)) as HTMLElement[]) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          leaves.push({ name: el.textContent?.trim().slice(0, 20) || el.getAttribute("aria-label") || sel, x: r.x, y: r.y, w: r.width, h: r.height });
        }
      }
      return { boxes, leaves, scrollW: document.documentElement.scrollWidth, innerW: window.innerWidth };
    });

    const hit = (a: Box, b: Box) => a.x < b.x + b.w - 0.5 && b.x < a.x + a.w - 0.5 && a.y < b.y + b.h - 0.5 && b.y < a.y + a.h - 0.5;
    for (const set of [result.boxes, result.leaves]) {
      for (let i = 0; i < set.length; i++)
        for (let j = i + 1; j < set.length; j++)
          expect(hit(set[i], set[j]), `${set[i].name} overlaps ${set[j].name}`).toBe(false);
    }
    for (const b of result.boxes) expect(b.x + b.w, `${b.name} overflows viewport`).toBeLessThanOrEqual(result.innerW + 0.5);
    expect(result.scrollW, "horizontal overflow").toBeLessThanOrEqual(result.innerW);
  });
}
