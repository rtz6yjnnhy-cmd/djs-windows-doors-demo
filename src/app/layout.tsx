import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Newsreader } from "next/font/google";
import { asset } from "@/lib/asset";
import { businessJsonLd, site, SITE_URL } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Icons are declared here (not as app/ file conventions) so every size is
// listed in one place. The web app manifest comes from manifest.ts.
export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: site.title,
  description: site.description,
  applicationName: site.shortName,
  alternates: { canonical: "./" },
  formatDetection: { telephone: true },
  // GitHub Pages cannot send HTTP headers, so the referrer policy is a meta tag
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [
      { url: asset("/favicon.ico"), sizes: "16x16 32x32 48x48" },
      { url: asset("/icons/icon-192.png"), sizes: "192x192", type: "image/png" },
      { url: asset("/icons/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: asset("/icons/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "./",
    siteName: site.shortName,
    title: site.title,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [{ url: site.ogImage, alt: site.ogImageAlt }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1628",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable} ${jetbrains.variable} antialiased`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
