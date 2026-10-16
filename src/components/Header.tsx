"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { business, nav } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Wordmark } from "./Wordmark";

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

  const light = solid || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,padding] duration-500 ease-frame ${
        light
          ? "bg-limestone/90 py-3 text-ink shadow-[0_1px_0_var(--color-mullion)] backdrop-blur-md"
          : "py-5 text-limestone"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 sm:px-8">
        <a href="#top" aria-label="DJ's Windows and Doors, back to top" onClick={() => setOpen(false)}>
          <Wordmark />
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
          <a href={business.phoneHref} className="label-mono hidden md:inline">
            {business.phone}
          </a>
          <a
            href="#contact"
            className="hidden rounded-[2px] bg-clay px-5 py-2.5 text-[0.9375rem] font-medium text-limestone transition-colors duration-300 hover:bg-clay-deep sm:inline-block"
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
            className="fixed inset-x-0 top-[64px] bottom-0 bg-limestone px-4 pt-8 pb-28 lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease }}
          >
            <ul className="border-t border-mullion">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  className="border-b border-mullion"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 font-display text-3xl"
                  >
                    {item.label}
                    <span className="label-mono text-graphite">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={business.phoneHref} className="label-mono mt-8 block text-graphite">
              Call {business.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
