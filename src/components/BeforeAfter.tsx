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
    <section id="projects" className="bg-mist py-24 sm:py-36">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="04">Before &amp; After</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal tracking-[-0.015em]">
              Slide the sash. <em className="text-royal">See the difference.</em>
            </h2>
          </div>
          <p className="max-w-md text-slate md:col-span-5">
            Real DJ&apos;s jobs, photographed on site. Drag the frame like a sliding window to compare
            the same window or door before and after.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Reveal className="mx-auto w-full max-w-[560px] lg:col-span-6 lg:max-w-none xl:col-span-5" y={40}>
            <div
              ref={frameRef}
              className="relative aspect-[4/5] cursor-ew-resize touch-pan-y select-none overflow-hidden bg-navy"
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
                    src={project.after}
                    alt={`After: ${project.alt}`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="pointer-events-none object-cover"
                    draggable={false}
                  />
                  <motion.div className="absolute inset-0" style={{ clipPath: beforeClip }}>
                    <Image
                      src={project.before}
                      alt={`${project.beforeLabel}: ${project.alt}`}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="pointer-events-none object-cover"
                      draggable={false}
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <span className="label-mono pointer-events-none absolute left-4 top-4 z-10 bg-navy/85 px-2 py-1 text-paper">
                {project.beforeLabel}
              </span>
              <span className="label-mono pointer-events-none absolute right-4 top-4 z-10 bg-paper/90 px-2 py-1 text-ink">
                After
              </span>

              {/* The sash: frame rail with an amber pull */}
              <motion.div
                role="slider"
                tabIndex={0}
                aria-label="Before and after comparison"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={ariaPos}
                aria-valuetext={`${ariaPos}% ${project.beforeLabel.toLowerCase()}`}
                onKeyDown={onKeyDown}
                style={{ left: sashLeft }}
                className="absolute inset-y-0 z-20 w-3 -translate-x-1/2 bg-paper shadow-[0_0_0_1px_rgba(10,22,40,0.25),0_0_30px_rgba(0,0,0,0.35)] outline-offset-0"
              >
                <span aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" />
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 flex h-16 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2px] bg-paper shadow-[0_0_0_1px_var(--color-line)]"
                >
                  <span className="h-9 w-1.5 rounded-full bg-amber" />
                </span>
              </motion.div>
            </div>
            <p className="label-mono mt-4 text-slate">
              Real DJ&apos;s projects · Same opening, photographed on site
              {project.beforeLabel === "During" ? " during and after the install" : " before and after"}
            </p>
          </Reveal>

          <div className="lg:col-span-6 xl:col-span-6 xl:col-start-7">
            <p className="label-mono text-slate">Select a project</p>
            <ul className="mt-4 border-t border-line">
              {projects.map((p, i) => {
                const selected = i === active;
                return (
                  <li key={p.id} className="border-b border-line">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActive(i)}
                      className="group relative w-full py-6 pl-6 text-left"
                    >
                      <motion.span
                        aria-hidden
                        className="absolute inset-y-4 left-0 w-0.5 origin-top bg-royal"
                        initial={false}
                        animate={{ scaleY: selected ? 1 : 0 }}
                        transition={{ duration: 0.5, ease }}
                      />
                      <span className="label-mono text-slate">
                        Project {p.id} · {p.beforeLabel} &amp; after
                      </span>
                      <span
                        className={`mt-2 block font-display text-2xl transition-colors duration-300 ${selected ? "text-ink" : "text-slate group-hover:text-ink"}`}
                      >
                        {p.title}
                      </span>
                      <span className="label-mono mt-2 block text-royal-deep">
                        {p.spec}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-10 bg-paper p-6 sm:p-8">
              <p className="font-display text-2xl">Want this on your house?</p>
              <p className="mt-2 max-w-md text-slate">
                Tell us which windows or doors you&apos;re thinking about and we&apos;ll come measure.
              </p>
              <a
                href="#contact"
                className="pressable mt-6 inline-block rounded-[2px] bg-royal px-6 py-3 font-medium text-paper hover:bg-royal-deep"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
