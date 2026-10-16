import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Newsreader } from "next/font/google";
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

export const metadata: Metadata = {
  title: "DJ's Windows and Doors Installation | Georgia",
  description:
    "Residential window and door installation and material sales across Georgia. Measured, installed and sealed right. Request a free quote.",
};

export const viewport: Viewport = {
  themeColor: "#1c1b19",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${hanken.variable} ${jetbrains.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
