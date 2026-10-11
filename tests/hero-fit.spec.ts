import { expect, test } from "@playwright/test";

const viewports = [
  [1920, 1080],
  [1536, 864],
  [1440, 900],
  [1366, 768],
  [1280, 720],
  [1024, 768],
  [768, 1024],
  [390, 844],
  [375, 667],
  [844, 390],
] as const;

type Box = { name: string; x: number; y: number; w: number; h: number };

for (const [w, h] of viewports) {
  test(`hero fits one screen with no overlaps @ ${w}x${h}`, async ({ page }, info) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");
    await page.waitForSelector("#hero");
    await page.waitForTimeout(3500); // let the entrance animations finish
    await page.screenshot({ path: `test-results/hero-${w}x${h}.png` });
    info.annotations.push({ type: "shot", description: `hero-${w}x${h}.png` });

    const data = await page.evaluate(() => {
      const boxes: Box[] = [];
      const add = (name: string, el: Element) => {
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) return;
        boxes.push({ name, x: r.x, y: r.y, w: r.width, h: r.height });
      };
      document.querySelectorAll("[data-hero-item]").forEach((el) => {
        const n = el.getAttribute("data-hero-item")!;
        if (n === "wordmark") {
          // the <p> is full-width; measure the glyph extents (first 8 letter spans) instead
          const spans = Array.from(el.children).slice(0, 8).map((c) => c.getBoundingClientRect());
          if (spans[0] && spans[0].width) {
            const x0 = Math.min(...spans.map((r) => r.left)), x1 = Math.max(...spans.map((r) => r.right));
            const y0 = Math.min(...spans.map((r) => r.top)), y1 = Math.max(...spans.map((r) => r.bottom));
            boxes.push({ name: n, x: x0, y: y0, w: x1 - x0, h: y1 - y0 });
          }
        } else if (n !== "nav-space") add(n, el);
      });
      document.querySelectorAll("[data-site-header] > div > *").forEach((el, i) => add(`header-${i}`, el));
      const hero = document.getElementById("hero")!.getBoundingClientRect();
      return { boxes, hero: { top: hero.top, bottom: hero.bottom }, vw: innerWidth, vh: innerHeight };
    });

    // hero is exactly one screen (or the 560px floor on very short viewports)
    expect(Math.round(data.hero.bottom - data.hero.top)).toBeGreaterThanOrEqual(Math.min(data.vh, 560) - 1);
    expect(data.hero.bottom).toBeLessThanOrEqual(data.vh + 1);

    const tol = 0.5;
    for (const b of data.boxes) {
      expect(b.x, `${b.name} left`).toBeGreaterThanOrEqual(-tol);
      expect(b.y, `${b.name} top`).toBeGreaterThanOrEqual(-tol);
      expect(b.x + b.w, `${b.name} right`).toBeLessThanOrEqual(data.vw + tol);
      expect(b.y + b.h, `${b.name} bottom`).toBeLessThanOrEqual(data.vh + tol);
    }
    const hit = (a: Box, b: Box) => a.x < b.x + b.w - tol && b.x < a.x + a.w - tol && a.y < b.y + b.h - tol && b.y < a.y + a.h - tol;
    const hero = data.boxes.filter((b) => !b.name.startsWith("header"));
    const all = data.boxes;
    for (let i = 0; i < all.length; i++)
      for (let j = i + 1; j < all.length; j++) {
        const [a, b] = [all[i], all[j]];
        if (a.name.startsWith("header") && b.name.startsWith("header")) continue; // covered by header-overlap.spec
        expect(hit(a, b), `${a.name} overlaps ${b.name}`).toBe(false);
      }
    expect(hero.length).toBeGreaterThan(2);
  });
}
