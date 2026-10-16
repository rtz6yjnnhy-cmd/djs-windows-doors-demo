"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { testimonials } from "@/lib/content";
import { ease } from "@/lib/motion";
import { SectionLabel } from "./SectionLabel";
import { SunRays } from "./SunRays";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const t = testimonials[index];

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearTimeout(id);
  }, [index, paused, count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <section
      aria-labelledby="reviews-title"
      className="relative overflow-hidden border-t border-mullion bg-limestone py-24 sm:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <SunRays intensity={1} />
      <div className="relative mx-auto max-w-[1100px] px-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="05">Reviews</SectionLabel>
          <p className="label-mono text-graphite">Sample reviews for this demo</p>
        </div>
        <h2 id="reviews-title" className="sr-only">
          What homeowners say
        </h2>

        <div className="mt-14 min-h-[19rem] sm:min-h-[16rem]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.8, ease }}
            >
              <div aria-label="5 out of 5 stars" role="img" className="flex gap-1 text-brass">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-8 font-display text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.2] font-light italic tracking-[-0.01em]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="label-mono mt-8 text-graphite">— {t.who}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-mullion pt-6">
          <p className="label-mono tabular-nums text-graphite">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            {[
              { label: "Previous review", delta: -1, glyph: "←" },
              { label: "Next review", delta: 1, glyph: "→" },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={() => go(b.delta)}
                className="flex h-12 w-12 items-center justify-center rounded-[2px] border border-mullion transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-limestone"
              >
                {b.glyph}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
