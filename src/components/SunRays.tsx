"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  className?: string;
  intensity?: number;
};

// Late-afternoon light falling across the section. Drifts with scroll;
// only transform and opacity animate.
export function SunRays({ className = "", intensity = 1 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, intensity, intensity, 0]);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div style={{ x, opacity }} className="absolute -inset-x-1/4 -top-1/4 h-[150%]">
        {[
          { left: "8%", width: "9%", alpha: 0.55 },
          { left: "21%", width: "4%", alpha: 0.4 },
          { left: "30%", width: "12%", alpha: 0.5 },
          { left: "47%", width: "5%", alpha: 0.35 },
        ].map((ray) => (
          <div
            key={ray.left}
            className="absolute top-0 h-full -skew-x-[32deg] blur-2xl"
            style={{
              left: ray.left,
              width: ray.width,
              background: `linear-gradient(180deg, rgba(242,200,121,${ray.alpha}) 0%, rgba(242,200,121,0) 85%)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
