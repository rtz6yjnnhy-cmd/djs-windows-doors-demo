import { business, nav } from "@/lib/content";
import { CurrentYear } from "./CurrentYear";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy pb-28 pt-20 text-paper md:pb-10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid gap-12 border-b border-paper/15 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="full" tone="white" className="h-24 sm:h-28" />
            <p className="mt-8 max-w-sm font-display text-2xl font-light leading-snug text-paper/85">
              Windows and doors, sold and installed in Metro Atlanta and across Georgia.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="label-mono text-paper/50">Explore</p>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-sunlight">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="label-mono text-paper/50">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={business.phoneHref} className="hover:text-sunlight" aria-label={`Call ${business.phone}`}>
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="break-all hover:text-sunlight">
                  {business.email}
                </a>
              </li>
              <li className="text-paper/70">{business.hours}</li>
              <li className="text-paper/70">Metro Atlanta · statewide on request</li>
            </ul>
          </div>
        </div>
        <div className="label-mono flex flex-col gap-2 pt-8 text-paper/60 sm:flex-row sm:justify-between">
          <p>
            © <CurrentYear /> {business.name} · <a href={business.phoneHref} className="hover:text-sunlight">{business.phone}</a>
          </p>
          <p>Demo site · Photos from DJ&apos;s jobs</p>
        </div>
      </div>
    </footer>
  );
}
