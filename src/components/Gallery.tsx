import Image from "next/image";
import { gallery } from "@/lib/content";
import { FrameReveal, Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

// Real job photos are all portrait, so the grid is three tall frames per row
// with the middle column dropped, like panes hung at different heights.
export function Gallery() {
  return (
    <section aria-labelledby="gallery-title" className="bg-paper py-24 sm:py-36">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 border-b border-line pb-10 md:flex-row md:items-end">
          <div>
            <SectionLabel index="05">Gallery</SectionLabel>
            <h2
              id="gallery-title"
              className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal tracking-[-0.015em]"
            >
              Recent windows <em className="text-royal">&amp; doors.</em>
            </h2>
          </div>
          <p className="max-w-sm text-slate">
            Entry doors, patio doors and replacement windows we&apos;ve installed. Every photo is
            a DJ&apos;s job.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14">
          {gallery.map((item, i) => (
            <figure key={item.image} className={i % 3 === 1 ? "md:mt-20" : ""}>
              <FrameReveal delay={(i % 3) * 0.08} className="group relative aspect-[3/4] overflow-hidden bg-mist">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1.4s] ease-frame group-hover:scale-[1.03]"
                />
              </FrameReveal>
              <figcaption className="label-mono mt-3 flex justify-between gap-3 text-slate">
                <span>{item.caption}</span>
                <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
