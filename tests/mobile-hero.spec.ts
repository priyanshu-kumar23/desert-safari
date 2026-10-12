import { execSync } from "node:child_process";
import { expect, test } from "@playwright/test";

const phones = [
  [320, 568],
  [360, 740],
  [375, 667],
  [390, 844],
  [412, 915],
  [430, 932],
] as const;

for (const [w, h] of phones) {
  test(`mobile hero fits @ ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");
    await page.waitForSelector("#hero");
    await page.waitForTimeout(3300);
    await page.screenshot({ path: `screenshots/mobile-${w}x${h}.png` });

    const d = await page.evaluate(() => {
      const r = (el: Element | null) => {
        const b = el?.getBoundingClientRect();
        return b ? { x: b.x, y: b.y, w: b.width, h: b.height, r: b.right, b: b.bottom } : null;
      };
      const dock = document.querySelector("[data-hero-item=dock]");
      const book = Array.from(dock!.querySelectorAll("a")).find((a) => /Book now/.test(a.textContent ?? ""));
      const chat = dock!.querySelector('a[aria-label="Chat with us on WhatsApp"]');
      const chips = Array.from(dock!.querySelectorAll("ul a")).map((a) => ({
        text: a.textContent,
        h: a.getBoundingClientRect().height,
        clipped: a.scrollWidth > a.clientWidth + 1,
        wraps: a.getBoundingClientRect().height > 40,
      }));
      const textBoxes = Array.from(document.querySelectorAll("[data-hero-item=eyebrow], [data-hero-item=headline] span.block > span, [data-hero-item=subtext]"))
        .filter((e) => e.getBoundingClientRect().height > 0 && getComputedStyle(e).display !== "none")
        .map((e) => e.getBoundingClientRect().bottom);
      const below = [document.querySelector("[data-hero-item=marquee]"), dock].filter((e) => e && e.getBoundingClientRect().height > 0) as Element[];
      return {
        vw: innerWidth,
        sw: document.documentElement.scrollWidth,
        dock: r(dock),
        book: r(book ?? null),
        chat: r(chat),
        chips,
        copyBottom: Math.max(...textBoxes),
        belowTop: Math.min(...below.map((e) => e.getBoundingClientRect().top)),
        heroH: document.getElementById("hero")!.getBoundingClientRect().height,
      };
    });

    expect(d.sw, "horizontal scroll").toBe(d.vw);
    const header = await page.evaluate(() => Array.from(document.querySelectorAll("[data-site-header] > div > * *")).filter((e) => e.getBoundingClientRect().width > 0).map((e) => e.getBoundingClientRect().right));
    expect(Math.max(...header), "header content inside viewport").toBeLessThanOrEqual(w);
    expect(d.dock!.x, "dock left").toBeGreaterThanOrEqual(11.5);
    expect(d.dock!.r, "dock right").toBeLessThanOrEqual(d.vw - 11.5);
    expect(d.dock!.b, "dock bottom").toBeLessThanOrEqual(h - 11.5);
    for (const c of d.chips) {
      expect(c.clipped, `chip "${c.text}" clipped`).toBe(false);
      expect(c.wraps, `chip "${c.text}" wraps`).toBe(false);
      expect(Math.round(c.h), `chip "${c.text}" height`).toBe(36);
    }
    expect(Math.abs(d.book!.h - d.chat!.h), "Book vs chat height").toBeLessThanOrEqual(0.5);
    expect(d.chat!.h, "chat ≥48").toBeGreaterThanOrEqual(48);
    expect(d.book!.h, "book ≥48").toBeGreaterThanOrEqual(48);
    expect(d.belowTop - d.copyBottom, "gap between headline block and dock").toBeGreaterThanOrEqual(24);
    expect(d.heroH).toBeLessThanOrEqual(h + 1);
  });
}

test("desktop 1440x900: hero + scrolled section, floating stack clear of interactive elements", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForSelector("#hero");
  await page.waitForTimeout(3300);
  await page.screenshot({ path: "screenshots/desktop-1440x900-hero.png" });

  for (const [i, y] of [900 * 1.4, 900 * 2.6].entries()) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `screenshots/desktop-1440x900-scrolled${i + 1}.png` });
    const stack = await page.evaluate(() => {
      const box = document.querySelector("[data-floating-actions]")!;
      const kids = Array.from(box.querySelectorAll("a, button")).map((e) => {
        const b = e.getBoundingClientRect();
        return { label: e.getAttribute("aria-label"), x: b.x, y: b.y, w: b.width, h: b.height };
      });
      const hit = (a: { x: number; y: number; w: number; h: number }, b: DOMRect) =>
        a.x < b.right && b.x < a.x + a.w && a.y < b.bottom && b.y < a.y + a.h;
      const clash: string[] = [];
      document.querySelectorAll("a, button, input, textarea, select").forEach((el) => {
        if (box.contains(el)) return;
        const b = el.getBoundingClientRect();
        if (b.width < 2 || b.height < 2 || getComputedStyle(el).visibility === "hidden") return;
        if (kids.some((k) => hit(k, b))) clash.push((el.getAttribute("aria-label") ?? el.textContent ?? el.tagName).trim().slice(0, 30));
      });
      return { kids, clash, vh: innerHeight, vw: innerWidth };
    });
    expect(stack.kids.length, "chat + top buttons visible").toBe(2);
    const [top, chat] = stack.kids;
    expect(Math.abs(top.w - chat.w)).toBeLessThanOrEqual(0.5);
    expect(Math.round(chat.y - (top.y + top.h)), "12px gap").toBe(12);
    expect(stack.clash, "floating buttons overlap interactive elements").toEqual([]);
  }
});

test("no green WhatsApp logo left in the source", () => {
  const out = execSync('git grep --untracked -n -i -E "WhatsAppIcon|M20.52 3.48A11.9" -- src || true', { encoding: "utf8" });
  expect(out.trim()).toBe("");
});

test("no light-sweep layer left", () => {
  const out = execSync('git grep --untracked -n -i "hero-sweep" -- src || true', { encoding: "utf8" });
  expect(out.trim()).toBe("");
});
