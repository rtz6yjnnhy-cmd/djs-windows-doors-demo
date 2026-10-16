"use client";

import { motion, useReducedMotion } from "framer-motion";
import { regions } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

// Simplified Georgia border as [lon, lat], clockwise from the NW corner.
const BORDER: [number, number][] = [
  [-85.61, 35.0], [-83.11, 35.0], [-83.32, 34.8], [-83.35, 34.7], [-83.05, 34.48],
  [-82.82, 34.16], [-82.6, 33.95], [-82.22, 33.65], [-82.0, 33.47], [-81.85, 33.25],
  [-81.5, 33.0], [-81.4, 32.7], [-81.15, 32.45], [-81.0, 32.1], [-80.84, 32.03],
  [-81.05, 31.75], [-81.18, 31.5], [-81.3, 31.2], [-81.42, 30.95], [-81.45, 30.71],
  [-81.72, 30.75], [-82.0, 30.55], [-82.04, 30.37], [-82.21, 30.57], [-83.0, 30.63],
  [-83.6, 30.65], [-84.4, 30.69], [-84.86, 30.71], [-84.96, 31.0], [-85.1, 31.3],
  [-85.06, 31.6], [-85.06, 32.0], [-84.95, 32.3], [-85.0, 32.55], [-85.18, 32.86],
];

const CITIES: { name: string; at: [number, number]; major?: boolean }[] = [
  { name: "Atlanta", at: [-84.39, 33.75], major: true },
  { name: "Savannah", at: [-81.09, 32.08], major: true },
  { name: "Augusta", at: [-81.97, 33.47] },
  { name: "Macon", at: [-83.63, 32.84] },
  { name: "Columbus", at: [-84.99, 32.46] },
  { name: "Athens", at: [-83.38, 33.96] },
  { name: "Gainesville", at: [-83.82, 34.3] },
  { name: "Dalton", at: [-84.97, 34.77] },
  { name: "Albany", at: [-84.16, 31.58] },
  { name: "Valdosta", at: [-83.28, 30.83] },
  { name: "Brunswick", at: [-81.49, 31.15] },
];

// Equirectangular projection, corrected for Georgia's latitude.
const SCALE = 92;
const COS = Math.cos((32.7 * Math.PI) / 180);
const project = ([lon, lat]: [number, number]) => ({
  x: 24 + (lon + 85.75) * COS * SCALE,
  y: 24 + (35.1 - lat) * SCALE,
});
const outline =
  BORDER.map((p, i) => {
    const { x, y } = project(p);
    return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ") + " Z";

export function ServiceArea() {
  const reduce = useReducedMotion();
  return (
    <section id="area" className="relative overflow-hidden bg-pine py-24 text-limestone sm:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-4 sm:px-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel index="06" tone="dark">
              Service Area
            </SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal tracking-[-0.015em]">
              From the mountains
              <br />
              <em className="text-sunlight">to the coast.</em>
            </h2>
            <p className="mt-8 max-w-md text-limestone/75">
              We install and deliver statewide. Wherever your home is in Georgia, the quote and
              the crew come to you.
            </p>
          </Reveal>

          <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
            {regions.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.06} className="border-t border-limestone/15 py-5">
                <dt className="font-display text-xl">{r.name}</dt>
                <dd className="label-mono mt-1.5 text-limestone/60">{r.cities}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6">
          <svg
            viewBox="0 0 440 480"
            role="img"
            aria-label="Map of Georgia showing service across the whole state"
            className="mx-auto w-full max-w-[520px]"
          >
            <motion.path
              d={outline}
              fill="rgba(195,154,91,0.06)"
              stroke="var(--color-brass)"
              strokeWidth={1.25}
              strokeLinejoin="round"
              initial={{ pathLength: 0, fillOpacity: 0 }}
              whileInView={{ pathLength: 1, fillOpacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ pathLength: { duration: 2.4, ease }, fillOpacity: { duration: 1, delay: 2 } }}
            />
            {CITIES.map((c, i) => {
              const { x, y } = project(c.at);
              const delay = 1.2 + i * 0.12;
              return (
                <motion.g
                  key={c.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                  transition={{ duration: 0.6, delay }}
                >
                  {!reduce && (
                    <motion.circle
                      cx={x}
                      cy={y}
                      r={c.major ? 14 : 10}
                      fill="var(--color-sunlight)"
                      initial={{ scale: 0.3, opacity: 0.5 }}
                      animate={{ scale: 1.4, opacity: 0 }}
                      transition={{ duration: 2.4, repeat: Infinity, delay, ease: "easeOut" }}
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    />
                  )}
                  <circle cx={x} cy={y} r={c.major ? 4.5 : 3} fill="var(--color-sunlight)" />
                  <text
                    x={x + 9}
                    y={y + 3.5}
                    fill="var(--color-limestone)"
                    fillOpacity={0.8}
                    fontSize={c.major ? 12 : 10}
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.06em"
                  >
                    {c.name.toUpperCase()}
                  </text>
                </motion.g>
              );
            })}
          </svg>
          <p className="label-mono mt-4 text-center text-limestone/50">
            Fig. 10 — State of Georgia · 159 counties
          </p>
        </div>
      </div>
    </section>
  );
}
