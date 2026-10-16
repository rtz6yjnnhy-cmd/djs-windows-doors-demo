import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { business } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page not found | DJ's Windows & Doors",
  robots: { index: false },
};

// Exported as 404.html, which GitHub Pages serves for any unknown URL.
export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy text-paper">
      <div aria-hidden className="absolute -right-[15%] top-[10%] -z-10 h-[70%] w-[55%] rounded-full bg-sunlight/12 blur-[120px]" />
      {/* The same window frame as the home page */}
      <div aria-hidden className="pointer-events-none absolute inset-4 border border-paper/15 sm:inset-8">
        <span className="absolute inset-y-0 left-1/2 hidden w-px bg-paper/10 md:block" />
      </div>

      <header className="relative px-8 pt-10 sm:px-14 sm:pt-14">
        <Link href="/" aria-label="DJ's Windows & Doors, home" className="inline-block">
          <Logo tone="white" decorative className="h-11 lg:h-[52px]" />
        </Link>
      </header>

      <div className="relative flex flex-1 flex-col justify-center px-8 pb-24 sm:px-14">
        <p className="label-mono text-sunlight">Error 404 · Page not found</p>
        <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98] font-light tracking-[-0.02em]">
          This opening is empty. <em className="text-sunlight">Let&apos;s get you home.</em>
        </h1>
        <p className="mt-8 max-w-lg text-lg text-paper/80">
          The page you were looking for doesn&apos;t exist or has moved. Head back to the home page,
          or tell us about your windows and doors.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/" className="pressable rounded-[2px] bg-royal px-7 py-4 font-medium text-paper hover:bg-royal-deep">
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className="pressable rounded-[2px] border border-paper/40 px-7 py-4 font-medium hover:border-paper hover:bg-paper/10"
          >
            Get a Free Quote
          </Link>
          <a href={business.phoneHref} className="label-mono ml-1 text-paper/80 underline-offset-4 hover:text-paper hover:underline">
            Call {business.phone}
          </a>
        </div>
      </div>
    </main>
  );
}
