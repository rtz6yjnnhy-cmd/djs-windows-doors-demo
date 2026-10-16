"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { business } from "@/lib/content";
import { ease } from "@/lib/motion";

// Phone-only bar: Call and Free Quote always one tap away once past the hero.
export function MobileCtaBar() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > window.innerHeight * 0.8));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-paper/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%", transition: { duration: 0.2, ease } }}
          transition={{ duration: 0.35, ease }}
        >
          <a
            href={business.phoneHref}
            className="pressable rounded-[2px] border border-ink py-3.5 text-center font-medium text-ink"
          >
            Call
          </a>
          <a href="#contact" className="pressable rounded-[2px] bg-royal py-3.5 text-center font-medium text-paper">
            Free Quote
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
