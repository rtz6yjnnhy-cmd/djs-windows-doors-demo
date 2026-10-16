"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { processSteps } from "@/lib/content";
import { ease } from "@/lib/motion";
import type { Kind, ProcessScene } from "./process/scene";
import { SectionLabel } from "./SectionLabel";

const KINDS: { id: Kind; label: string }[] = [
  { id: "window", label: "Window" },
  { id: "door", label: "Door" },
];

// Scroll position (0–1 through the pinned section) at the middle of each step.
const STEP_AT = [0.08, 0.33, 0.6, 0.9];
const stepFor = (p: number) => (p < 0.2 ? 0 : p < 0.46 ? 1 : p < 0.72 ? 2 : 3);

export function Process3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ProcessScene | null>(null);
  const reduce = useReducedMotion();

  const [kind, setKind] = useState<Kind>("window");
  const [step, setStep] = useState(0);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    sceneRef.current?.setProgress(p);
    setStep(stepFor(p));
  });

  // Load Three.js only when this section is about to be seen.
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    let disposed = false;
    let scene: ProcessScene | null = null;

    const visibility = new IntersectionObserver(([entry]) => scene?.setActive(entry.isIntersecting));
    // Prepare the scene well before it scrolls into view, in idle time, so the
    // setup never lands in the middle of a scroll.
    const idle = (fn: () => void) =>
      typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200);
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || scene) return;
        loader.disconnect();
        idle(async () => {
          try {
            const { createProcessScene } = await import("./process/scene");
            if (disposed) return;
            scene = createProcessScene(canvas, { reduceMotion: !!reduce });
            sceneRef.current = scene;
            scene.setKind(kind);
            scene.setProgress(scrollYProgress.get());
            await scene.ready;
            if (disposed) return;
            visibility.observe(section);
            setReady(true);
          } catch {
            setFailed(true);
          }
        });
      },
      { rootMargin: "150% 0px" },
    );
    loader.observe(section);

    const onResize = () => scene?.resize();
    window.addEventListener("resize", onResize);
    return () => {
      disposed = true;
      loader.disconnect();
      visibility.disconnect();
      window.removeEventListener("resize", onResize);
      scene?.dispose();
      sceneRef.current = null;
    };
    // The scene is created once; kind and progress are pushed in separately.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    sceneRef.current?.setKind(kind);
  }, [kind]);

  const goToStep = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * STEP_AT[i], behavior: reduce ? "auto" : "smooth" });
  };

  const current = processSteps[step];
  const label = `${kind === "window" ? "A window" : "A door"} being replaced, step ${step + 1} of 4: ${current.title}.`;

  return (
    <section ref={sectionRef} id="process" className="relative h-[260vh] bg-mist" aria-labelledby="process-title">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[68px] lg:pt-[76px]">
        <div className="mx-auto grid h-full w-full max-w-[1440px] grid-rows-[auto_1fr] gap-4 px-4 py-6 sm:px-8 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-10 lg:py-10">
          <div className="lg:col-span-5">
            <SectionLabel index="02">The Process</SectionLabel>
            <h2
              id="process-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-normal tracking-[-0.015em] lg:mt-6"
            >
              See the result <em className="text-royal">before you sign.</em>
            </h2>
            <p className="mt-4 hidden max-w-md text-slate lg:block">
              Scroll to watch an old unit come out and a new one go in, the way we do it on every
              job. Switch between a window and a door.
            </p>

            <div role="group" aria-label="Show the process for" className="mt-5 inline-flex rounded-[2px] bg-paper p-1 shadow-[inset_0_0_0_1px_var(--color-line)] lg:mt-8">
              {KINDS.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  aria-pressed={kind === k.id}
                  onClick={() => setKind(k.id)}
                  className={`pressable rounded-[2px] px-5 py-2 text-[0.9375rem] font-medium ${
                    kind === k.id ? "bg-navy text-paper" : "text-slate hover:text-ink"
                  }`}
                >
                  {k.label}
                </button>
              ))}
            </div>

            <ol className="mt-5 flex gap-1 lg:mt-10 lg:flex-col lg:gap-0 lg:border-t lg:border-line">
              {processSteps.map((s, i) => {
                const on = i === step;
                return (
                  <li key={s.title} className="flex-1 lg:border-b lg:border-line">
                    <button
                      type="button"
                      onClick={() => goToStep(i)}
                      aria-current={on ? "step" : undefined}
                      className="group flex w-full flex-col items-start gap-1 border-t-2 py-2 text-left transition-colors duration-300 lg:flex-row lg:items-baseline lg:gap-4 lg:border-t-0 lg:py-4"
                      style={{ borderColor: on ? "var(--color-royal)" : "var(--color-line)" }}
                    >
                      <span className={`label-mono ${on ? "text-royal" : "text-slate"}`}>0{i + 1}</span>
                      <span
                        className={`text-[0.9375rem] font-medium transition-colors duration-300 lg:font-display lg:text-2xl lg:font-normal ${
                          on ? "text-ink" : "text-slate group-hover:text-ink"
                        }`}
                      >
                        {s.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-3 min-h-[3.25rem] lg:mt-6" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={step}
                  className="max-w-md text-[0.9375rem] text-slate lg:text-base"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, ease }}
                >
                  {current.text}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="relative min-h-0 lg:col-span-7 lg:h-[78%]"
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              sceneRef.current?.setPointer(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
            }}
            onPointerLeave={() => sceneRef.current?.setPointer(0, 0)}
          >
            <div className="absolute inset-0 rounded-[2px] bg-[radial-gradient(ellipse_at_50%_30%,#1d3a6b_0%,var(--color-navy)_75%)]" />
            {failed ? (
              <Image
                src={asset("/images/work/arched-window-new.jpg")}
                alt="New arched window installed by DJ's"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            ) : (
              <canvas ref={canvasRef} role="img" aria-label={label} className="absolute inset-0 h-full w-full" />
            )}
            {!ready && !failed && (
              <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                {/* A small window whose sash slides while Three.js loads */}
                <span aria-hidden className="relative block h-16 w-12 overflow-hidden border border-paper/40">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-paper/25" />
                  <span className="absolute inset-y-0 left-1/2 w-px bg-paper/25" />
                  <span className="absolute inset-x-0 bottom-0 h-1/2 animate-[sash_1.6s_var(--ease-frame)_infinite_alternate] bg-sunlight/30 motion-reduce:animate-none" />
                </span>
                <span className="label-mono text-paper/70">Loading 3D view…</span>
              </div>
            )}
            <p className="label-mono pointer-events-none absolute bottom-3 left-4 text-paper/70">
              Fig. 02 — {kind === "window" ? "Window" : "Door"} replacement · step {step + 1}/4
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
