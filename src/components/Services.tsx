import Image from "next/image";
import { productLines, supportServices } from "@/lib/content";
import { FrameReveal, Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { SunRays } from "./SunRays";

// Windows and doors are two identical panels side by side: same size, same
// structure, same call to action, so neither reads as the secondary line.
export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-paper py-24 sm:py-36">
      <SunRays intensity={0.45} />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid gap-10 border-b border-line pb-14 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <SectionLabel index="01">Services</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal tracking-[-0.015em]">
              Windows and doors, <em className="text-royal">one crew.</em>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="max-w-md text-slate">
              We sell and install both. Whether it&apos;s one sticking patio door or every window
              in the house, the job gets the same care: exact measurements, a clean install and a
              seal that lasts.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-12 pt-12 md:grid-cols-2 md:gap-8 lg:gap-12">
          {productLines.map((line, i) => (
            <li key={line.code} className="group flex flex-col">
              <FrameReveal delay={i * 0.12} className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={line.image}
                  alt={line.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-frame group-hover:scale-[1.04]"
                />
                {/* Warm light washes in on hover */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(242,200,121,0.5),rgba(242,200,121,0)_60%)] opacity-0 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-100" />
                <span className="label-mono absolute left-4 top-4 bg-navy px-3 py-1.5 text-paper">
                  {line.code}
                </span>
              </FrameReveal>
              <Reveal delay={0.15 + i * 0.1} className="flex flex-1 flex-col">
                <h3 className="mt-8 font-display text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-[-0.01em]">
                  {line.title}
                </h3>
                <p className="mt-4 max-w-xl text-slate">{line.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${line.code} we install`}>
                  {line.types.map((t) => (
                    <li key={t} className="rounded-[2px] bg-mist px-3 py-1.5 text-[0.9375rem] text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="label-mono mt-8 inline-flex items-center gap-2 self-start text-royal"
                >
                  Quote my {line.code.toLowerCase()}
                  <span aria-hidden className="transition-transform duration-500 ease-frame group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <ul className="mt-16 grid border-t border-line md:grid-cols-2 md:divide-x md:divide-line">
          {supportServices.map((s, i) => (
            <li key={s.title} className="border-b border-line py-8 md:border-b-0 md:px-8 md:first:pl-0">
              <Reveal delay={i * 0.08}>
                <h3 className="font-display text-2xl font-medium">{s.title}</h3>
                <p className="mt-3 max-w-md text-slate">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
