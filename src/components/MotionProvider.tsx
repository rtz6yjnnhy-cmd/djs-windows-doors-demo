"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// "user" drops transform animations for people who ask for reduced motion,
// keeping only opacity fades.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
