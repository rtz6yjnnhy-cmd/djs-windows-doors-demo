import { business, nav } from "@/lib/content";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-20 text-limestone md:pb-10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid gap-12 border-b border-limestone/15 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-6 max-w-sm font-display text-2xl font-light leading-snug text-limestone/85">
              Residential windows and doors, installed and sold across Georgia.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="label-mono text-limestone/50">Explore</p>
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
            <p className="label-mono text-limestone/50">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={business.phoneHref} className="hover:text-sunlight">
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="break-all hover:text-sunlight">
                  {business.email}
                </a>
              </li>
              <li className="text-limestone/70">{business.hours}</li>
              <li className="text-limestone/70">Serving all of Georgia</li>
            </ul>
          </div>
        </div>
        <div className="label-mono flex flex-col gap-2 pt-8 text-limestone/45 sm:flex-row sm:justify-between">
          <p>© 2026 {business.name}</p>
          <p>Demo site · Photography via Pexels</p>
        </div>
      </div>
    </footer>
  );
}
