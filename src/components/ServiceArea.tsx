"use client";

import { motion, useReducedMotion } from "framer-motion";
import { metroCities, otherRegions } from "@/lib/content";
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

// Metro Atlanta is the home market; the rest of Georgia is shown, quieter.
const ATLANTA: [number, number] = [-84.39, 33.75];
const CITIES: { name: string; at: [number, number] }[] = [
  { name: "Savannah", at: [-81.09, 32.08] },
  { name: "Augusta", at: [-81.97, 33.47] },
  { name: "Macon", at: [-83.63, 32.84] },
  { name: "Columbus", at: [-84.99, 32.46] },
  { name: "Athens", at: [-83.38, 33.96] },
  { name: "Dalton", at: [-84.97, 34.77] },
  { name: "Albany", at: [-84.16, 31.58] },
  { name: "Valdosta", at: [-83.28, 30.83] },
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
  const atl = project(ATLANTA);
  const view = { once: true, margin: "0px 0px -20% 0px" };
  return (
    <section id="area" className="relative overflow-hidden bg-navy py-24 text-paper sm:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-4 sm:px-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel index="07" tone="dark">
              Service Area
            </SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal tracking-[-0.015em]">
              Atlanta &amp; the
              <br />
              <em className="text-sunlight">metro area.</em>
            </h2>
            <p className="mt-8 max-w-md text-paper/80">
              Metro Atlanta is home. Most of our windows and doors go into houses within an hour
              of the city, so we&apos;re close by for the quote, the install and anything after.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 border-t border-paper/15 pt-8">
            <h3 className="label-mono text-amber">Metro Atlanta cities we serve</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 font-display text-xl sm:grid-cols-3">
              {metroCities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 border-t border-paper/15 pt-6">
            <p className="text-[0.9375rem] text-paper/65">
              <span className="text-paper/85">Also serving the rest of Georgia</span> for larger
              projects: {otherRegions}.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <svg
            viewBox="0 0 440 480"
            role="img"
            aria-label="Map of Georgia with Metro Atlanta highlighted as the main service area"
            className="mx-auto w-full max-w-[520px]"
          >
            <motion.path
              d={outline}
              fill="rgba(212,162,76,0.05)"
              stroke="var(--color-amber)"
              strokeOpacity={0.55}
              strokeWidth={1.25}
              strokeLinejoin="round"
              initial={{ pathLength: 0, fillOpacity: 0 }}
              whileInView={{ pathLength: 1, fillOpacity: 1 }}
              viewport={view}
              transition={{ pathLength: { duration: 2.4, ease }, fillOpacity: { duration: 1, delay: 2 } }}
            />

            {/* The rest of the state: small, quiet markers */}
            {CITIES.map((c, i) => {
              const { x, y } = project(c.at);
              return (
                <motion.g
                  key={c.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={view}
                  transition={{ duration: 0.6, delay: 1.8 + i * 0.08 }}
                >
                  <circle cx={x} cy={y} r={2.5} fill="var(--color-paper)" fillOpacity={0.6} />
                  <text x={x + 7} y={y + 3} fill="var(--color-paper)" fillOpacity={0.6} fontSize={9} fontFamily="var(--font-mono)" letterSpacing="0.06em">
                    {c.name.toUpperCase()}
                  </text>
                </motion.g>
              );
            })}

            {/* Metro Atlanta: the home market */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={view}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <circle cx={atl.x} cy={atl.y} r={44} fill="var(--color-royal)" fillOpacity={0.35} stroke="var(--color-sky)" strokeOpacity={0.6} strokeDasharray="3 4" />
              {!reduce && (
                <motion.circle
                  cx={atl.x}
                  cy={atl.y}
                  r={20}
                  fill="var(--color-sunlight)"
                  initial={{ scale: 0.4, opacity: 0.55 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 1 }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
              )}
              <circle cx={atl.x} cy={atl.y} r={6} fill="var(--color-sunlight)" />
              <text x={atl.x} y={atl.y + 66} textAnchor="middle" fill="var(--color-paper)" fontSize={15} fontFamily="var(--font-mono)" fontWeight={500} letterSpacing="0.08em">
                METRO ATLANTA
              </text>
              <text x={atl.x} y={atl.y + 82} textAnchor="middle" fill="var(--color-amber)" fontSize={10} fontFamily="var(--font-mono)" letterSpacing="0.08em">
                HOME BASE
              </text>
            </motion.g>
          </svg>
          <p className="label-mono mt-4 text-center text-paper/55">
            Fig. 10 — Metro Atlanta, with statewide service
          </p>
        </div>
      </div>
    </section>
  );
}
