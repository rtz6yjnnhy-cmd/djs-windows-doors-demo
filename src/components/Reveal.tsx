"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 28 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

// Image reveal: the frame opens from the bottom rail up. With reduced motion
// it becomes a plain fade (clip-path isn't covered by MotionConfig).
export function FrameReveal({ children, className, delay = 0 }: Omit<Props, "y">) {
  const reduce = useReducedMotion();
  const hidden = reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" };
  const shown = reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" };
  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.6 : 1.1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
