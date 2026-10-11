import sharp from "sharp";
const { data, info } = await sharp("public/images/hero/desktopbg.png").removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const sky = (x, y) => { const i = (y * W + x) * 3; return data[i + 2] > data[i] + 14; };
const STEP = 16;
const ys = [];
for (let x = 0; x <= W; x += STEP) {
  const xx = Math.min(x, W - 1);
  let hy = H * 0.5;
  for (let y = 0; y < H; y++) {
    let ground = true;
    for (let k = 0; k < 6 && y + k < H; k++) if (sky(xx, y + k)) ground = false;
    if (ground) { hy = y; break; }
  }
  ys.push(hy);
}
// light smoothing + 3px safety lift so the silhouette fully covers the sand edge
const sm = ys.map((_, i) => Math.round(((ys[i - 1] ?? ys[i]) + ys[i] * 2 + (ys[i + 1] ?? ys[i])) / 4) - 2);
const pts = sm.map((y, i) => `[${(Math.min(i * STEP, W) / W * 100).toFixed(2)}, ${(y / H * 100).toFixed(2)}]`);
console.log("// Generated from desktopbg.png by scripts/gen-hero-mask.mjs: horizon line (sky → dunes) as [x%, y%] of the image.");
console.log("export const horizonMask: [number, number][] = [" + pts.join(", ") + "];");
console.log("// leftmost 12 y%:", sm.slice(0, 12).map((y) => (y / H * 100).toFixed(1)).join(" "));
