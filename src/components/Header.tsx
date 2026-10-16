"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { business, nav } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Logo } from "./Logo";

export function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 80));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);


  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 py-3 text-paper transition-[background-color,box-shadow] duration-300 ease-frame ${
        solid || open ? "bg-navy/95 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8">
        <a href="#top" aria-label="DJ's Windows & Doors, back to top" onClick={() => setOpen(false)} className="shrink-0">
          <Logo tone="white" preload decorative className="h-11 lg:h-[52px]" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.9375rem] font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group relative py-1">
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-frame group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <a href={business.phoneHref} className="label-mono hidden text-paper/85 hover:text-paper md:inline">
            {business.phone}
          </a>
          <a
            href="#contact"
            className="hidden rounded-[2px] bg-royal px-5 py-2.5 text-[0.9375rem] font-medium text-paper pressable hover:bg-royal-deep sm:inline-block"
          >
            Get a Free Quote
          </a>
          <button
            type="button"
            className="relative h-10 w-10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute left-2 right-2 h-px bg-current transition-transform duration-500 ease-frame ${open ? "top-1/2 rotate-45" : "top-[40%]"}`}
            />
            <span
              className={`absolute left-2 right-2 h-px bg-current transition-transform duration-500 ease-frame ${open ? "top-1/2 -rotate-45" : "top-[60%]"}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute inset-x-0 top-full h-[calc(100dvh-68px)] overscroll-contain overflow-y-auto bg-paper px-4 pt-8 pb-28 text-ink lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.25, ease } }}
            transition={{ duration: 0.4, ease }}
          >
            <ul className="border-t border-line">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-b border-line"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.1 + i * 0.04 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 font-display text-3xl"
                  >
                    {item.label}
                    <span className="label-mono text-slate">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={business.phoneHref} className="label-mono mt-8 block text-slate">
              Call {business.phone}
            </a>
            <Logo variant="full" decorative className="mt-12 h-20" />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
