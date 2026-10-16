"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { projects } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

// Simulated "before": same photo, aged and dulled. Labeled as such on the page.
const BEFORE_FILTER = "grayscale(0.65) sepia(0.4) brightness(0.68) contrast(0.85) blur(0.6px)";

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const inView = useInView(frameRef, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotion();

  // Sash position, 0 (all after) to 1 (all before)
  const pos = useMotionValue(0.5);
  const [ariaPos, setAriaPos] = useState(50);
  useMotionValueEvent(pos, "change", (v) => setAriaPos(Math.round(v * 100)));

  const beforeClip = useTransform(pos, (p) => `inset(0% ${(1 - p) * 100}% 0% 0%)`);
  const sashLeft = useTransform(pos, (p) => `${p * 100}%`);

  // Hint the interaction once: the sash slides open and settles back.
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(pos, [0.5, 0.22, 0.7, 0.5], {
      duration: 2.6,
      ease: "easeInOut",
      delay: 0.4,
    });
    return () => controls.stop();
  }, [inView, reduce, pos]);

  const setFromPointer = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    pos.stop();
    pos.set(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromPointer(e.clientX);
  };

  // Keyboard moves are instant: animating repeated key presses only adds lag.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 0.1 : 0.04;
    const from = pos.get();
    const moves: Record<string, number> = {
      ArrowLeft: from - step,
      ArrowRight: from + step,
      Home: 0,
      End: 1,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    pos.stop();
    pos.set(Math.min(1, Math.max(0, moves[e.key])));
  };

  return (
    <section id="projects" className="bg-plaster py-24 sm:py-36">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="03">Before &amp; After</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal tracking-[-0.015em]">
              Slide the sash. <em className="text-clay">See the difference.</em>
            </h2>
          </div>
          <p className="max-w-md text-graphite md:col-span-5">
            Drag the frame like a sliding window to compare the house before and after new
            windows and doors.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8" y={40}>
            <div
              ref={frameRef}
              className="relative aspect-[4/3] cursor-ew-resize touch-pan-y select-none overflow-hidden bg-ink sm:aspect-[16/10]"
              onPointerDown={onPointerDown}
              onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
              onPointerUp={() => (dragging.current = false)}
              onPointerCancel={() => (dragging.current = false)}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={project.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <Image
                    src={project.image}
                    alt={`After: ${project.alt}`}
                    fill
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    className="pointer-events-none object-cover"
                    draggable={false}
                  />
                  <motion.div className="absolute inset-0" style={{ clipPath: beforeClip }}>
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="pointer-events-none scale-[1.01] object-cover"
                      style={{ filter: BEFORE_FILTER }}
                      draggable={false}
                    />
                    {/* Hazy, weathered glass */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(232,224,210,0.18),rgba(28,27,25,0.25))]" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <span className="label-mono pointer-events-none absolute left-4 top-4 z-10 bg-ink/80 px-2 py-1 text-limestone">
                Before
              </span>
              <span className="label-mono pointer-events-none absolute right-4 top-4 z-10 bg-limestone/90 px-2 py-1 text-ink">
                After
              </span>

              {/* The sash: frame rail with a brass pull */}
              <motion.div
                role="slider"
                tabIndex={0}
                aria-label="Before and after comparison"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={ariaPos}
                aria-valuetext={`${ariaPos}% before`}
                onKeyDown={onKeyDown}
                style={{ left: sashLeft }}
                className="absolute inset-y-0 z-20 w-3 -translate-x-1/2 bg-limestone shadow-[0_0_0_1px_rgba(28,27,25,0.25),0_0_30px_rgba(0,0,0,0.35)] outline-offset-0"
              >
                <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-mullion" />
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 flex h-16 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2px] bg-limestone shadow-[0_0_0_1px_var(--color-mullion)]"
                >
                  <span className="h-9 w-1.5 rounded-full bg-brass" />
                </span>
              </motion.div>
            </div>
            <p className="label-mono mt-4 text-graphite">
              Illustrative preview · “Before” is a simulated treatment of the same photo.
              Real DJ&apos;s project photos will replace these.
            </p>
          </Reveal>

          <div className="lg:col-span-4">
            <p className="label-mono text-graphite">Select a project</p>
            <ul className="mt-4 border-t border-mullion">
              {projects.map((p, i) => {
                const selected = i === active;
                return (
                  <li key={p.id} className="border-b border-mullion">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActive(i)}
                      className="group relative w-full py-6 pl-6 text-left"
                    >
                      <motion.span
                        aria-hidden
                        className="absolute inset-y-4 left-0 w-0.5 origin-top bg-clay"
                        initial={false}
                        animate={{ scaleY: selected ? 1 : 0 }}
                        transition={{ duration: 0.5, ease }}
                      />
                      <span className="label-mono text-graphite">
                        Sample project {p.id}
                      </span>
                      <span
                        className={`mt-2 block font-display text-2xl transition-colors duration-300 ${selected ? "text-ink" : "text-graphite group-hover:text-ink"}`}
                      >
                        {p.title}
                      </span>
                      <span className="label-mono mt-2 block text-clay-deep">
                        {p.spec}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
