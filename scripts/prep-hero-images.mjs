// Builds the hero plates served by next/image.
// The supplied artwork is small (desktop 1536x1024, mobile 735x947), so we resample it with Lanczos3 plus a very
// light unsharp mask. This is interpolation, NOT new detail: for truly crisp 4K, replace the sources with >=2400px originals.
import sharp from "sharp";

const jobs = [
  { src: "public/images/hero/desktopbg.png", out: "public/images/hero/desktopbg-hq.jpg", width: 2304 },
  { src: "public/images/hero/mobilebg.jpg", out: "public/images/hero/mobilebg-hq.jpg", width: 1470 },
];
for (const { src, out, width } of jobs) {
  const info = await sharp(src)
    .resize({ width, kernel: "lanczos3" })
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 1.2 })
    .jpeg({ quality: 96, chromaSubsampling: "4:4:4", mozjpeg: true })
    .toFile(out);
  console.log(out, info.width, info.height, Math.round(info.size / 1024) + "KB");
}
