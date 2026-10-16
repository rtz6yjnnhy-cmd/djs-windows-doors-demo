import { reasons, stats } from "@/lib/content";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-pine py-24 text-limestone sm:py-36">
      {/* Faint mullion grid in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,var(--color-limestone)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-limestone)_1px,transparent_1px)] [background-size:25%_50%]"
      />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel index="02" tone="dark">
              Why DJ&apos;s
            </SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal tracking-[-0.015em]">
              Installed right.
              <br />
              <em className="text-sunlight">Sealed tight.</em>
            </h2>
            <p className="mt-8 max-w-md text-limestone/75">
              A window is only as good as its install. We treat every opening like it&apos;s in our
              own house, because the difference shows up on your power bill and in every storm.
            </p>
          </Reveal>

          <ol className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((reason, i) => (
              <li key={reason.title} className="border-t border-limestone/15 py-8">
                <Reveal delay={i * 0.08}>
                  <span className="font-display text-5xl font-light text-brass">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-2xl font-medium">{reason.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-limestone/70">
                    {reason.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <dl className="mt-20 grid border-y border-limestone/15 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse gap-2 py-10 sm:px-8 ${i > 0 ? "border-t border-limestone/15 sm:border-t-0 sm:border-l" : "sm:pl-0"}`}
            >
              <dt className="label-mono text-limestone/60">{stat.label}</dt>
              <dd className="font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none font-light text-brass">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
