"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { business, heroPhotos } from "@/lib/content";
import { ease } from "@/lib/motion";

const line = { duration: 1.4, ease };

// Split hero: the promise on the left, two real DJ's jobs on the right (one
// window, one door) opening like frames. Portrait phone photos stay sharp
// this way instead of being stretched across a full-bleed band.
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
      <motion.div
        aria-hidden
        className="absolute -right-[10%] top-[5%] -z-10 h-[80%] w-[60%] rounded-full bg-sunlight/15 blur-[120px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, delay: 0.8 }}
      />

      {/* Mullion grid: the frame draws itself in */}
      <div aria-hidden className="pointer-events-none absolute inset-4 sm:inset-8">
        {[
          { cls: "inset-x-0 top-0 h-px origin-left", axis: "x", delay: 0.1 },
          { cls: "inset-x-0 bottom-0 h-px origin-right", axis: "x", delay: 0.1 },
          { cls: "inset-y-0 left-0 w-px origin-top", axis: "y", delay: 0.25 },
          { cls: "inset-y-0 right-0 w-px origin-bottom", axis: "y", delay: 0.25 },
          { cls: "inset-y-0 left-1/2 hidden w-px origin-top lg:block", axis: "y", delay: 0.45 },
        ].map((l) => (
          <motion.span
            key={l.cls}
            className={`absolute bg-paper/15 ${l.cls}`}
            initial={l.axis === "x" ? { scaleX: 0 } : { scaleY: 0 }}
            animate={l.axis === "x" ? { scaleX: 1 } : { scaleY: 1 }}
            transition={{ ...line, delay: l.delay }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-10 px-8 pb-28 pt-28 sm:px-14 lg:grid-cols-12 lg:gap-12 lg:pb-32 lg:pt-32">
        {/* The two frames: a window and a door */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:order-last lg:col-span-6 lg:gap-6">
          {heroPhotos.map((photo, i) => (
            <motion.figure key={photo.image} style={{ y: i === 0 ? leadY : trailY }} className={i === 1 ? "mt-10 lg:mt-20" : ""}>
              <motion.div
                className="relative aspect-[3/4] overflow-hidden bg-navy-800 ring-1 ring-paper/15"
                initial={reduce ? { opacity: 0 } : { clipPath: "inset(50% 50% 50% 50%)" }}
                animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: reduce ? 0.8 : 1.6, ease, delay: 0.5 + i * 0.2 }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2.4, ease, delay: 0.5 + i * 0.2 }}
                >
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    preload
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
              <motion.figcaption
                className="label-mono mt-3 flex justify-between text-paper/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 + i * 0.15 }}
              >
                <span>
                  Fig. 0{i + 1} — {photo.caption}
                </span>
                <span className="hidden sm:inline">DJ&apos;s job</span>
              </motion.figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div style={{ y: textY, opacity: fade }} className="lg:col-span-6">
          <motion.p
            className="label-mono mb-6 text-sunlight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.1 }}
          >
            Windows &amp; doors · Metro Atlanta, GA
          </motion.p>

          <h1 className="max-w-[14ch] font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] font-light tracking-[-0.02em]">
            {["New windows.", "New doors."].map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, ease, delay: 1.2 + i * 0.12 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block italic text-sunlight"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease, delay: 1.44 }}
              >
                Installed right.
              </motion.span>
            </span>
          </h1>

          <motion.div
            className="mt-8 flex max-w-xl flex-col gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.7 }}
          >
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
          </motion.div>
        </motion.div>
      </div>

      {/* Spec strip along the bottom rail */}
      <motion.div
        className="absolute inset-x-4 bottom-4 border-t border-paper/15 sm:inset-x-8 sm:bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
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
      </motion.div>
    </section>
  );
}
