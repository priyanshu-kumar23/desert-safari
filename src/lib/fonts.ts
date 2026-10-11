import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

/** Display serif — headings, logo, prices. Regular + italic (italic carries the accent word). */
export const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

/**
 * Sans — Satoshi (Fontshare, ITF Free Font License: free for commercial use).
 * Self-hosted from /public/fonts/satoshi. Falls back to Inter Tight / system sans in globals.css.
 */
export const sans = localFont({
  src: [
    { path: "../../public/fonts/satoshi/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/satoshi/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

/*
 * Optional premium swap (needs purchased licenses — drop the files in /public/fonts and use localFont):
 *   Display: "PP Editorial New"  |  "Canela"
 *   Sans:    "PP Neue Montreal"  |  "Neue Haas Grotesk"
 *
 * export const display = localFont({
 *   src: [
 *     { path: "../../public/fonts/PPEditorialNew-Regular.woff2", weight: "400", style: "normal" },
 *     { path: "../../public/fonts/PPEditorialNew-Italic.woff2", weight: "400", style: "italic" },
 *   ],
 *   variable: "--font-display",
 * });
 */
