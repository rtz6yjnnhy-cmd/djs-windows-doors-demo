"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { business, heroPhotos } from "@/lib/content";

// Entrance timing for the CSS `.enter` classes (globals.css): delay and duration.
const t = (d: number, dur = 1000) => ({ "--d": `${d}ms`, "--dur": `${dur}ms` }) as CSSProperties;

// Split hero: the promise on the left, two real DJ's jobs on the right (one
// window, one door) opening like frames. Portrait phone photos stay sharp
// this way instead of being stretched across a full-bleed band.
//
// Entrances are plain CSS so the headline paints before JavaScript loads
// (good LCP on slow phones); only the scroll parallax uses Framer Motion.
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax is scroll-linked, so MotionConfig does not switch it off by itself.
  const reduce = useReducedMotion();
  const leadY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-8%"]);
  const trailY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "6%"]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden bg-navy text-paper">
      {/* Warm evening light from the right, behind the photos */}
      <div
        aria-hidden
        className="enter enter-fade absolute -right-[10%] top-[5%] -z-10 h-[80%] w-[60%] rounded-full bg-sunlight/15 blur-[120px]"
        style={t(300, 2000)}
      />

      {/* Mullion grid: the frame draws itself in */}
      <div aria-hidden className="pointer-events-none absolute inset-4 sm:inset-8">
        {[
          { cls: "enter-draw-x inset-x-0 top-0 h-px origin-left", d: 0 },
          { cls: "enter-draw-x inset-x-0 bottom-0 h-px origin-right", d: 0 },
          { cls: "enter-draw-y inset-y-0 left-0 w-px origin-top", d: 120 },
          { cls: "enter-draw-y inset-y-0 right-0 w-px origin-bottom", d: 120 },
          { cls: "enter-draw-y inset-y-0 left-1/2 hidden w-px origin-top lg:block", d: 240 },
        ].map((l) => (
          <span key={l.cls} className={`enter absolute bg-paper/15 ${l.cls}`} style={t(l.d, 1300)} />
        ))}
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-10 px-8 pb-28 pt-28 sm:px-14 lg:grid-cols-12 lg:gap-12 lg:pb-32 lg:pt-32">
        {/* The two frames: a window and a door */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:order-last lg:col-span-6 lg:gap-6">
          {heroPhotos.map((photo, i) => (
            <motion.figure key={photo.image} style={{ y: i === 0 ? leadY : trailY }} className={i === 1 ? "mt-10 lg:mt-20" : ""}>
              <div
                className="enter enter-open relative aspect-[3/4] overflow-hidden bg-navy-800 ring-1 ring-paper/15"
                style={t(150 + i * 150, 1400)}
              >
                <div className="enter enter-settle absolute inset-0" style={t(150 + i * 150, 2200)}>
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    preload
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="enter enter-fade label-mono mt-3 flex justify-between text-paper/70" style={t(900 + i * 120, 800)}>
                <span>
                  Fig. 0{i + 1} — {photo.caption}
                </span>
                <span className="hidden sm:inline">DJ&apos;s job</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div style={{ y: textY, opacity: fade }} className="lg:col-span-6">
          <p className="enter enter-fade-up label-mono mb-6 text-sunlight" style={t(50, 800)}>
            Windows &amp; doors · Metro Atlanta, GA
          </p>

          <h1 className="max-w-[14ch] font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] font-light tracking-[-0.02em]">
            {["New windows.", "New doors."].map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.06em]">
                <span className="enter enter-rise block" style={t(100 + i * 100)}>
                  {word}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="enter enter-rise block italic text-sunlight" style={t(300)}>
                Installed right.
              </span>
            </span>
          </h1>

          <div className="enter enter-fade-up mt-8 flex max-w-xl flex-col gap-8" style={t(450, 900)}>
            <p className="text-lg leading-relaxed text-paper/85">
              Replacement windows, entry doors and patio doors, sold and installed by one crew.
              Based in Metro Atlanta, serving homeowners across Georgia.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="pressable rounded-[2px] bg-royal px-7 py-4 font-medium text-paper hover:bg-royal-deep"
              >
                Get a Free Quote
              </a>
              <a
                href={business.phoneHref}
                className="pressable rounded-[2px] border border-paper/40 px-7 py-4 font-medium hover:border-paper hover:bg-paper/10"
              >
                Call {business.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spec strip along the bottom rail */}
      <div className="enter enter-fade absolute inset-x-4 bottom-4 border-t border-paper/15 sm:inset-x-8 sm:bottom-8" style={t(700)}>
        <div className="label-mono flex items-center justify-between gap-6 px-4 py-3 text-paper/85 sm:px-6">
          <span>Windows · Entry doors · Patio doors · Sales &amp; installation</span>
          <span className="hidden items-center gap-2 sm:flex">
            Scroll
            <motion.span
              aria-hidden
              className="block h-4 w-px bg-paper/70"
              animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
