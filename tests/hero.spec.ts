import { expect, test, type Page } from "@playwright/test";
import sharp from "sharp";

/**
 * Hero v4 checks, per viewport:
 *  - one screen (or the photo's own shape on ~3:2 screens), nothing outside the viewport, nothing overlapping
 *  - copy never sits on the convoy / lead Land Cruiser; the tag never sits on the cars at the right
 *  - the plate is scale 1 and the browser got the largest variant it can use
 *  - text contrast (measured against the real pixels behind each text run, text hidden)
 *  - FAB hidden while the hero is on screen; Enquire button = nav item height
 * Screenshots land in ./screenshots/.
 */
const viewports = [
  [1920, 1080],
  [1536, 864],
  [1440, 900],
  [1366, 768],
  [1280, 720],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
  [375, 667],
  [360, 740],
] as const;

// Where things are in desktopbg (fractions of the 1536x1024 artwork)
const CONVOY = { x0: 0.16, x1: 0.345, y0: 0.254, y1: 0.381 }; // crest convoy incl. dust
const LEAD = { x0: 0.215, x1: 0.352, y0: 0.594, y1: 0.77 }; // lead Land Cruiser
const CARS_R = { x0: 0.78, x1: 0.876, y0: 0.45, y1: 0.527 }; // cars on the right

type Box = { name: string; x: number; y: number; w: number; h: number };
const hit = (a: Box, b: Box, tol = 0.5) =>
  a.x < b.x + b.w - tol && b.x < a.x + a.w - tol && a.y < b.y + b.h - tol && b.y < a.y + a.h - tol;

const lum = (r: number, g: number, b: number) => {
  const f = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

async function collect(page: Page) {
  return page.evaluate(() => {
    const boxes: { name: string; x: number; y: number; w: number; h: number; text: boolean }[] = [];
    const push = (name: string, r: DOMRect, text: boolean) => {
      if (r.width >= 1 && r.height >= 1) boxes.push({ name, x: r.x, y: r.y, w: r.width, h: r.height, text });
    };
    const visible = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
    };
    const textRect = (el: Element) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return range.getBoundingClientRect();
    };
    for (const el of Array.from(document.querySelectorAll("[data-hero-item]"))) {
      const n = el.getAttribute("data-hero-item")!;
      if (!visible(el)) continue;
      if (n === "headline") {
        // every visible line, measured by its text (not the full-width block)
        // x-extent from the glyphs, y-extent from the line box (a Range's own height is the font's content area)
        let n = 0;
        el.querySelectorAll(":scope > span > span").forEach((wrap) => {
          if (!visible(wrap)) return;
          const t = textRect(wrap);
          const wr = wrap.getBoundingClientRect();
          const fs = parseFloat(getComputedStyle(el).fontSize);
          // glyph ink only (these lines have no descenders): 0.06em below the line-box top to 0.80em
          push(`headline-line${++n}`, new DOMRect(t.x, wr.y + 0.06 * fs, t.width, 0.74 * fs), true);
        });
      } else if (n === "eyebrow" || n === "subtext") push(n, el.getBoundingClientRect(), true);
      else if (n === "ticks") push(n, el.getBoundingClientRect(), true);
      else push(n, el.getBoundingClientRect(), false);
    }
    // the glass panel that holds subtext + ticks
    const panel = document.querySelector(".hero-shift-sub");
    if (panel && visible(panel)) push("copy-panel", panel.getBoundingClientRect(), true);
    document.querySelectorAll("[data-site-header] > div > *").forEach((el, i) => {
      if (visible(el)) push(`header-${i}`, el.getBoundingClientRect(), false);
    });

    const hero = document.getElementById("hero")!.getBoundingClientRect();
    const img = document.querySelector<HTMLImageElement>("#hero picture img")!;
    const ir = img.getBoundingClientRect();
    const pos = getComputedStyle(img).objectPosition.split(" ").map((v) => (v.endsWith("%") ? parseFloat(v) / 100 : 0.5));
    const nat = { w: img.naturalWidth, h: img.naturalHeight };
    const src = img.currentSrc;
    const transform = getComputedStyle(img).transform;
    const fabEl = document.querySelector<HTMLElement>('a[aria-label="Chat with us on WhatsApp"]');
    const enquire = Array.from(document.querySelectorAll<HTMLElement>("[data-header-actions] a")).find((a) => /Enquire/.test(a.textContent ?? ""));
    const navItem = document.querySelector<HTMLElement>("[data-header-nav] button, [data-header-nav] a");
    return {
      boxes,
      hero: { top: hero.top, bottom: hero.bottom, w: hero.width, h: hero.height },
      img: { x: ir.x, y: ir.y, w: ir.width, h: ir.height, px: pos[0], py: pos[1], nat, src, transform, dpr: devicePixelRatio, filter: getComputedStyle(img).filter },
      vw: innerWidth,
      vh: innerHeight,
      scrollW: document.documentElement.scrollWidth,
      fab: fabEl ? { opacity: getComputedStyle(fabEl).opacity, hidden: fabEl.getAttribute("aria-hidden") } : null,
      enquireH: enquire?.getBoundingClientRect().height ?? null,
      navH: navItem && visible(navItem) ? navItem.getBoundingClientRect().height : null,
    };
  });
}

/** Rect of a feature of the 3:2 artwork in viewport px (object-fit: cover maths). */
function feature(d: Awaited<ReturnType<typeof collect>>, f: { x0: number; x1: number; y0: number; y1: number }): Box {
  const { img } = d;
  const s = Math.max(img.w / 1536, img.h / 1024);
  const bw = 1536 * s;
  const bh = 1024 * s;
  const ox = img.x + (img.w - bw) * img.px;
  const oy = img.y + (img.h - bh) * img.py;
  return { name: "feature", x: ox + f.x0 * bw, y: oy + f.y0 * bh, w: (f.x1 - f.x0) * bw, h: (f.y1 - f.y0) * bh };
}

for (const [w, h] of viewports) {
  test(`hero v4 @ ${w}x${h}`, async ({ page }, info) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/");
    await page.waitForSelector("#hero");
    await page.waitForTimeout(3300); // entrance animations (≤2s) + image fade
    await page.screenshot({ path: `screenshots/hero-${w}x${h}.png` });
    const d = await collect(page);
    const aspect = w / h;
    const wide = w >= 768;

    // 1 · size: 100svh, or (≈3:2 viewports) the photo's own shape, never below 94svh
    const hh = d.hero.bottom - d.hero.top;
    expect(hh, "hero height").toBeGreaterThanOrEqual(Math.min(d.vh * 0.94, 560) - 1);
    expect(d.hero.bottom, "hero bottom").toBeLessThanOrEqual(d.vh + 1);
    if (!(wide && aspect >= 1.4 && aspect <= 1.6)) expect(Math.round(hh)).toBeGreaterThanOrEqual(Math.min(d.vh, 560) - 1);
    expect(d.scrollW, "horizontal scroll").toBeLessThanOrEqual(d.vw);

    // 2 · plate: scale 1 (no zoom), fully sharp, best variant loaded
    expect(d.img.transform === "none" || d.img.transform === "matrix(1, 0, 0, 1, 0, 0)", "plate has no scale transform").toBe(true);
    expect(["none", "blur(0px)"], "blur finished").toContain(d.img.filter);
    const rendered = wide ? Math.max(d.img.w, (d.img.h * 1536) / 1024) : d.img.w;
    const want = rendered * d.img.dpr;
    const src = wide ? 1536 : 735; // original artwork widths
    const hq = wide ? 2304 : 1470; // the resampled plate we serve
    const upscale = want / src;
    const loaded = Math.min(Number(new URL(d.img.src).searchParams.get("w")), hq);
    info.annotations.push({ type: "upscale", description: `${w}x${h}: ${upscale.toFixed(2)}x of the original artwork (served ${loaded}px wide for ${Math.round(want)}px needed)` });
    expect(loaded, "served variant is as large as the screen can use").toBeGreaterThanOrEqual(Math.min(want, hq) * 0.97);

    // 3 · inside viewport + no overlaps
    for (const b of d.boxes) {
      expect(b.x, `${b.name} left`).toBeGreaterThanOrEqual(-0.5);
      expect(b.y, `${b.name} top`).toBeGreaterThanOrEqual(-0.5);
      expect(b.x + b.w, `${b.name} right`).toBeLessThanOrEqual(d.vw + 0.5);
      expect(b.y + b.h, `${b.name} bottom`).toBeLessThanOrEqual(d.vh + 0.5);
    }
    const blocks = d.boxes.filter((b) => !(b.name === "subtext" || b.name === "ticks")); // inside copy-panel
    const sameGroup = (a: Box, b: Box) => a.name.startsWith("headline") && b.name.startsWith("headline");
    for (let i = 0; i < blocks.length; i++)
      for (let j = i + 1; j < blocks.length; j++) {
        const [a, b] = [blocks[i], blocks[j]];
        if (a.name.startsWith("header") && b.name.startsWith("header")) continue;
        if (sameGroup(a, b)) continue;
        expect(hit(a, b), `${a.name} overlaps ${b.name}`).toBe(false);
      }

    // 4 · copy stays off the convoy / lead car; tag stays off the cars at the right
    if (wide) {
      const convoy = feature(d, CONVOY);
      const lead = feature(d, LEAD);
      const carsR = feature(d, CARS_R);
      for (const b of d.boxes.filter((x) => x.text && !x.name.startsWith("header"))) {
        expect(hit(b, convoy, 0), `${b.name} sits on the convoy`).toBe(false);
        expect(hit(b, lead, 0), `${b.name} sits on the lead Land Cruiser`).toBe(false);
      }
      for (const b of d.boxes.filter((x) => x.name === "popular" || x.name === "bar" || x.name === "dock")) {
        expect(hit(b, carsR, 0), `${b.name} covers the cars on the right`).toBe(false);
      }
      const bar = d.boxes.find((b) => b.name === "bar" || b.name === "dock");
      if (bar) {
        const overlap = Math.max(0, lead.y + lead.h - bar.y);
        info.annotations.push({ type: "note", description: `bar overlaps the lead car's lowest ${Math.round(overlap)}px (dust/tyres)` });
      }
    } else {
      // phones: the dune ridge stays clear — at least 20% of the screen between the copy and the dock
      const copyBottom = Math.max(...d.boxes.filter((b) => b.text).map((b) => b.y + b.h));
      const dockTop = Math.min(...d.boxes.filter((b) => b.name === "dock" || b.name === "marquee").map((b) => b.y));
      expect(dockTop - copyBottom, "clear ridge between copy and dock").toBeGreaterThanOrEqual(d.vh * 0.2);
    }

    // 5 · FAB hidden while the hero is on screen
    if (d.fab) {
      expect(d.fab.hidden).toBe("true");
      expect(Number(d.fab.opacity)).toBe(0);
    }

    // 6 · Enquire matches the nav item height
    if (w >= 1024) expect(Math.abs((d.enquireH ?? 0) - (d.navH ?? 0)), "Enquire vs nav item height").toBeLessThanOrEqual(1);

    // 7 · contrast: hide all hero text, re-shoot, measure the pixels under each text run
    const runs = await page.evaluate(() => {
      const out: { name: string; x: number; y: number; w: number; h: number; rgba: number[]; large: boolean }[] = [];
      const cv = document.createElement("canvas");
      cv.width = cv.height = 1;
      const g = cv.getContext("2d", { willReadFrequently: true })!;
      const rgba = (css: string) => {
        g.clearRect(0, 0, 1, 1);
        g.fillStyle = css;
        g.fillRect(0, 0, 1, 1);
        const p = g.getImageData(0, 0, 1, 1).data;
        return [p[0], p[1], p[2], p[3] / 255];
      };
      const roots = [document.getElementById("hero")!, ...Array.from(document.querySelectorAll("[data-site-header]"))];
      for (const root of roots) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const t = n.textContent?.trim();
          const el = n.parentElement;
          if (!t || !el || el.closest("[aria-hidden='true'], .sr-only, canvas, [style*='display: none']")) continue;
          if (getComputedStyle(el).display === "none" || el.getClientRects().length === 0) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          const r = range.getBoundingClientRect();
          if (r.width < 4 || r.height < 4) continue;
          const cs = getComputedStyle(el);
          const px = parseFloat(cs.fontSize);
          const bold = parseInt(cs.fontWeight) >= 700;
          out.push({
            name: `${el.closest("[data-hero-item]")?.getAttribute("data-hero-item") ?? (root.id || "header")}:${t.slice(0, 22)}`,
            x: r.x, y: r.y, w: r.width, h: r.height,
            rgba: rgba(cs.color),
            large: px >= 24 || (bold && px >= 18.66),
          });
        }
      }
      return out;
    });
    const withText = await sharp(await page.screenshot()).raw().toBuffer({ resolveWithObject: true });
    await page.addStyleTag({ content: "#hero *, [data-site-header] *{color:transparent!important;text-shadow:none!important;-webkit-text-stroke:0!important} #hero svg, [data-site-header] svg{opacity:0!important}" });
    await page.waitForTimeout(250);
    const bg = await sharp(await page.screenshot()).raw().toBuffer({ resolveWithObject: true });
    const { width: W, channels: C } = bg.info;
    const results: { name: string; min: number; need: number }[] = [];
    for (const run of runs) {
      const x0 = Math.max(0, Math.floor(run.x)), x1 = Math.min(W, Math.ceil(run.x + run.w));
      const y0 = Math.max(0, Math.floor(run.y)), y1 = Math.min(bg.info.height, Math.ceil(run.y + run.h));
      const ratios: number[] = [];
      // "ink core" pixels = pixels that show the text colour itself (not the anti-aliased fringe); each is compared
      // with the same pixel of the text-free shot, so the number is the real contrast the visitor sees.
      for (let y = y0; y < y1; y++)
        for (let x = x0; x < x1; x++) {
          const i = (y * W + x) * C;
          const a = run.rgba[3];
          const exp = [0, 1, 2].map((k) => run.rgba[k] * a + bg.data[i + k] * (1 - a));
          const near = [0, 1, 2].every((k) => Math.abs(withText.data[i + k] - exp[k]) <= 14);
          if (!near) continue;
          ratios.push(ratio(lum(withText.data[i], withText.data[i + 1], withText.data[i + 2]), lum(bg.data[i], bg.data[i + 1], bg.data[i + 2])));
        }
      if (ratios.length < 6) continue;
      ratios.sort((p, q) => p - q);
      results.push({ name: run.name, min: ratios[Math.floor(ratios.length * 0.03)], need: run.large ? 3 : 4.5 });
    }
    const worst = [...results].sort((p, q) => p.min / p.need - q.min / q.need).slice(0, 4);
    info.annotations.push({ type: "contrast", description: worst.map((r) => `${r.name} ${r.min.toFixed(2)} (need ${r.need})`).join(" | ") });
    for (const r of results) expect(r.min, `contrast ${r.name}`).toBeGreaterThanOrEqual(r.need);
  });
}

test("reduced motion: no atmosphere, no blur-in, content visible", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.waitForSelector("#hero");
  await page.waitForTimeout(600);
  await expect(page.locator("[data-active]").first()).toHaveAttribute("data-active", "false");
  await expect(page.locator("h1")).toBeVisible();
  await ctx.close();
});

test("atmosphere pauses when the hero is off-screen", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.waitForSelector("#hero");
  await page.waitForTimeout(800);
  await expect(page.locator("[data-active]").first()).toHaveAttribute("data-active", "true");
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(600);
  await expect(page.locator("[data-active]").first()).toHaveAttribute("data-active", "false");
  await ctx.close();
});
