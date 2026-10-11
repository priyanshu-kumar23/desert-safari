import type { Metadata, Viewport } from "next";
import { display, sans } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { siteConfig } from "@/data/site";
import "./globals.css";

const title = `${siteConfig.name} | Dubai Desert Safari, Tours & Experiences`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [
    "Dubai desert safari",
    "dune buggy Dubai",
    "dhow cruise Dubai Marina",
    "yacht charter Dubai",
    "Hummer desert safari",
    "Abu Dhabi city tour",
    "Hatta tour",
  ],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/desktop_bg.png",
        width: 1600,
        height: 984,
        alt: "Red Sand Adventure — Land Cruiser dune bashing through red dunes at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: ["/desktop_bg.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#c8361f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
