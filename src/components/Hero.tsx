"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { business } from "@/lib/content";
import { ease } from "@/lib/motion";

const line = { duration: 1.4, ease };

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax is scroll-linked, so MotionConfig does not switch it off by itself.
  const reduce = useReducedMotion();
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-limestone"
    >
      {/* The window opens from the center onto the house */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? { opacity: 0 } : { clipPath: "inset(18% 22% 18% 22%)" }}
        animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: reduce ? 0.8 : 1.8, ease, delay: reduce ? 0 : 0.5 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY }}
          initial={{ scale: 1.18 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 2.6, ease, delay: 0.5 }}
        >
          <Image
            src="/images/hero-craftsman-twilight.jpg"
            alt="Craftsman home at dusk with warm light glowing in every window"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[60%_center]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,27,25,0.82)_0%,rgba(28,27,25,0.45)_45%,rgba(28,27,25,0.05)_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 to-transparent" />
        {/* Warm glow, like the sun just below the roofline */}
        <motion.div
          aria-hidden
          className="absolute -right-[10%] top-[10%] h-[70%] w-[55%] rounded-full bg-sunlight/25 blur-[110px] mix-blend-soft-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, delay: 1.4 }}
        />
      </motion.div>

      {/* Mullion grid: the frame draws itself in */}
      <div aria-hidden className="pointer-events-none absolute inset-4 sm:inset-8">
        <motion.span
          className="absolute inset-x-0 top-0 h-px origin-left bg-limestone/35"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...line, delay: 0.1 }}
        />
        <motion.span
          className="absolute inset-x-0 bottom-0 h-px origin-right bg-limestone/35"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...line, delay: 0.1 }}
        />
        <motion.span
          className="absolute inset-y-0 left-0 w-px origin-top bg-limestone/35"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ ...line, delay: 0.25 }}
        />
        <motion.span
          className="absolute inset-y-0 right-0 w-px origin-bottom bg-limestone/35"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ ...line, delay: 0.25 }}
        />
        <motion.span
          className="absolute inset-y-0 left-[62%] hidden w-px origin-top bg-limestone/25 md:block"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ ...line, delay: 0.45 }}
        />
        <motion.span
          className="absolute left-[62%] right-0 top-[40%] hidden h-px origin-left bg-limestone/25 md:block"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...line, delay: 0.6 }}
        />
        <motion.p
          className="label-mono absolute left-[62%] top-[40%] ml-4 mt-3 hidden text-limestone/80 md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          Fig. 01 — Evening light
        </motion.p>
      </div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-8 pb-28 pt-32 sm:px-14 sm:pb-32"
      >
        <motion.p
          className="label-mono mb-6 text-sunlight"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.1 }}
        >
          Residential windows &amp; doors · Georgia
        </motion.p>

        <h1 className="max-w-[13ch] font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] font-light tracking-[-0.02em]">
          {["Let the", "Georgia"].map((word, i) => (
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
              light in.
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="mt-8 flex max-w-xl flex-col gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.7 }}
        >
          <p className="text-lg leading-relaxed text-limestone/85">
            Windows and doors measured, installed and sealed right, and the materials to go
            with them. Serving homeowners in every corner of the state.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-[2px] bg-clay px-7 py-4 font-medium text-limestone pressable hover:bg-clay-deep"
            >
              Get a Free Quote
            </a>
            <a
              href={business.phoneHref}
              className="group flex items-center gap-3 rounded-[2px] border border-limestone/40 px-7 py-4 font-medium pressable hover:border-limestone hover:bg-limestone/10"
            >
              Call {business.phone}
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Spec strip along the bottom rail */}
      <motion.div
        className="absolute inset-x-4 bottom-4 border-t border-limestone/20 sm:inset-x-8 sm:bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="label-mono flex items-center justify-between gap-6 px-4 py-3 text-limestone/85 sm:px-6">
          <span>Residential installation · Material sales · Statewide Georgia</span>
          <span className="hidden items-center gap-2 sm:flex">
            Scroll
            <motion.span
              aria-hidden
              className="block h-4 w-px bg-limestone/70"
              animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
