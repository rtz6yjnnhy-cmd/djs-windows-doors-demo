import Image from "next/image";
import { gallery } from "@/lib/content";
import { FrameReveal, Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Gallery() {
  return (
    <section aria-labelledby="gallery-title" className="bg-limestone py-24 sm:py-36">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 border-b border-mullion pb-10 md:flex-row md:items-end">
          <div>
            <SectionLabel index="04">Gallery</SectionLabel>
            <h2
              id="gallery-title"
              className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal tracking-[-0.015em]"
            >
              Framed in <em className="text-clay">good light.</em>
            </h2>
          </div>
          <p className="label-mono text-graphite">Representative photography</p>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-12 md:gap-y-12">
          {gallery.map((item, i) => (
            <figure key={item.image} className={`${item.span} ${i % 2 === 1 ? "md:mt-16" : ""}`}>
              <FrameReveal className={`group relative overflow-hidden bg-plaster ${item.aspect}`}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-frame group-hover:scale-[1.03]"
                />
              </FrameReveal>
              <figcaption className="label-mono mt-3 flex justify-between text-graphite">
                <span>{item.caption}</span>
                <span aria-hidden>{String(i + 4).padStart(3, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
