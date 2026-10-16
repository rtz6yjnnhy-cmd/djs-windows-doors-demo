import Image from "next/image";
import { services } from "@/lib/content";
import { FrameReveal, Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { SunRays } from "./SunRays";

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-limestone py-24 sm:py-36">
      <SunRays intensity={0.9} />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid gap-10 border-b border-mullion pb-14 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <SectionLabel index="01">Services</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal tracking-[-0.015em]">
              Every opening, <em className="text-clay">done right.</em>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="max-w-md text-graphite">
              Whether it&apos;s one sticking patio door or every window in the house, the job gets
              the same care: exact measurements, a clean install and a seal that lasts.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-mullion">
          {services.map((service, i) => (
            <li
              key={service.code}
              className="group border-b border-mullion py-10 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:last:pr-0"
            >
              <FrameReveal delay={i * 0.1} className="relative aspect-[4/5] overflow-hidden bg-plaster">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-frame group-hover:scale-[1.04]"
                />
                {/* Warm light washes in on hover */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(242,200,121,0.55),rgba(242,200,121,0)_60%)] opacity-0 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-100" />
                <span className="label-mono absolute left-3 top-3 bg-limestone/90 px-2 py-1 text-ink">
                  {service.code}
                </span>
              </FrameReveal>
              <Reveal delay={0.15 + i * 0.08}>
                <h3 className="mt-7 font-display text-2xl font-medium tracking-[-0.01em]">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-graphite">{service.text}</p>
                <a
                  href="#contact"
                  className="label-mono mt-6 inline-flex items-center gap-2 text-clay-deep"
                >
                  Request a quote
                  <span aria-hidden className="transition-transform duration-500 ease-frame group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
