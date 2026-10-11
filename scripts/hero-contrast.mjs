import { chromium } from "@playwright/test";
import sharp from "sharp";
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const L = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
const sizes = [[1024,768],[1366,768]];
const b = await chromium.launch();
for (const [w, h] of sizes) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto("http://localhost:3100/", { waitUntil: "load", timeout: 120000 });
  await p.waitForTimeout(3500);
  // collect text elements + colours, then hide text and screenshot the backdrop
  const items = await p.evaluate(() => {
    const out = [];
    const sel = "[data-hero-item=eyebrow], [data-hero-item=headline] span.block > span.block, [data-hero-item=headline] em, [data-hero-item=ticks] li, [data-hero-item=popular] p, [data-hero-item=popular] a, [data-hero-item=popular-strip] p, [data-hero-item=popular-strip] a, [data-hero-item=ctas] a, [data-hero-item=book] a, [data-hero-item=hotspot-label] p, [data-hero-item=meta] a, [data-hero-item=meta] p, [data-hero-item=wordmark] > span:nth-child(-n+8)";
    document.querySelectorAll(sel).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) return;
      const cv = document.createElement("canvas"); cv.width = cv.height = 1;
      const g = cv.getContext("2d", { willReadFrequently: true });
      const norm = (css) => { g.clearRect(0, 0, 1, 1); g.fillStyle = "#000"; g.fillStyle = css; g.fillRect(0, 0, 1, 1); const d = g.getImageData(0, 0, 1, 1).data; return `rgba(${d[0]},${d[1]},${d[2]},${(d[3] / 255).toFixed(3)})`; };
      let c = norm(getComputedStyle(el).color);
      const em = el.querySelector("em"); // accent word
      out.push({ name: ((el.closest("[data-hero-item]")?.getAttribute("data-hero-item") ?? "") + ":" + el.textContent.trim().slice(0, 18)), c, x: r.x, y: r.y, w: r.width, h: r.height, accent: em ? norm(getComputedStyle(em).color) : null });
    });
    return out;
  });
  const withText = await p.screenshot();
  await p.addStyleTag({ content: "#hero [data-hero-item] *, #hero [data-hero-item]{color:transparent!important;text-shadow:none!important;-webkit-text-stroke:0!important} #hero [data-hero-item] svg{opacity:0!important}" });
  await p.waitForTimeout(300);
  const noText = await p.screenshot();
  const A = await sharp(withText).raw().toBuffer({ resolveWithObject: true });
  const B = await sharp(noText).raw().toBuffer({ resolveWithObject: true });
  const info = A.info;
  const rows = [];
  for (const it of items) {
    const x0 = Math.max(0, Math.floor(it.x)), y0 = Math.max(0, Math.floor(it.y)), x1 = Math.min(info.width, Math.ceil(it.x + it.w)), y1 = Math.min(info.height, Math.ceil(it.y + it.h));
    const rs = [];
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const i = (y * info.width + x) * info.channels;
      const d = Math.abs(A.data[i] - B.data[i]) + Math.abs(A.data[i + 1] - B.data[i + 1]) + Math.abs(A.data[i + 2] - B.data[i + 2]);
      if (d < 90) continue; // glyph pixels only
      const fgc = it.c.match(/[\d.]+/g).map(Number);
      // only fully-covered glyph pixels (colour ≈ the text colour), not anti-aliased edges or glows
      if (Math.abs(A.data[i] - fgc[0]) + Math.abs(A.data[i + 1] - fgc[1]) + Math.abs(A.data[i + 2] - fgc[2]) > 36) continue;
      rs.push(ratio(L(A.data[i], A.data[i + 1], A.data[i + 2]), L(B.data[i], B.data[i + 1], B.data[i + 2])));
    }
    if (rs.length < 20) continue;
    rs.sort((a, b) => a - b);
    rows.push([it.name, rs[Math.floor(rs.length * 0.1)].toFixed(2), rs[Math.floor(rs.length * 0.5)].toFixed(2)]);
  }
  const bad = rows.filter((r) => +r[1] < (r[0].startsWith("wordmark") ? 3 : 4.5));
  console.log(`${w}x${h}  checked=${rows.length}  below-threshold(p10):`, bad.length ? JSON.stringify(bad) : "none", " wordmark:", JSON.stringify(rows.find((r) => r[0].startsWith("wordmark"))));
  await p.close();
}
await b.close();
