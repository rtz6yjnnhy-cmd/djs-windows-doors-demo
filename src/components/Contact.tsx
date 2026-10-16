"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { business } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

type Errors = Partial<Record<"name" | "contact" | "email" | "zip", string>>;

const SERVICES = [
  "Window installation",
  "Door installation",
  "Replacement / retrofit",
  "Materials only",
  "Not sure yet",
];

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const zip = String(data.get("zip") ?? "").trim();
  if (!name) errors.name = "Tell us your name.";
  if (!phone && !email) errors.contact = "Add a phone number or an email so we can reach you.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "That email doesn't look right.";
  if (zip && !/^\d{5}$/.test(zip)) errors.zip = "Use a 5-digit ZIP code.";
  return errors;
}

const field =
  "mt-2 w-full rounded-[2px] border border-mullion bg-limestone px-4 py-3 text-ink placeholder:text-graphite/60 transition-colors duration-300 focus:border-ink focus:outline-none aria-[invalid=true]:border-clay";

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(new FormData(e.currentTarget));
    setErrors(found);
    if (Object.keys(found).length === 0) setSent(true);
  };

  const err = (key: keyof Errors) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-1.5 text-sm text-clay-deep">
        {errors[key]}
      </p>
    ) : null;

  return (
    <section id="contact" className="bg-limestone py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-4 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionLabel index="07">Free Quote</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal tracking-[-0.015em]">
            Tell us about <em className="text-clay">your windows.</em>
          </h2>
          <p className="mt-6 max-w-md text-graphite">
            A few details are enough to start. We&apos;ll call you back to talk through the job
            and set up a time to measure.
          </p>

          <dl className="mt-10 border-t border-mullion">
            {[
              { k: "Call", v: business.phone, href: business.phoneHref },
              { k: "Email", v: business.email, href: `mailto:${business.email}` },
              { k: "Hours", v: business.hours },
            ].map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-6 border-b border-mullion py-4">
                <dt className="label-mono text-graphite">{row.k}</dt>
                <dd className="text-right">
                  {row.href ? (
                    <a href={row.href} className="break-all underline-offset-4 hover:underline">
                      {row.v}
                    </a>
                  ) : (
                    row.v
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="relative mt-10 hidden aspect-[16/10] overflow-hidden lg:block">
            <Image
              src="/images/contact-interior.jpg"
              alt="Sunlit living room with tall windows"
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          {/* The form sits inside a window frame */}
          <div className="border-[10px] border-plaster bg-limestone shadow-[inset_0_0_0_1px_var(--color-mullion),0_0_0_1px_var(--color-mullion)]">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  role="status"
                  className="flex min-h-[560px] flex-col items-start justify-center p-8 sm:p-12"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease }}
                >
                  <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
                    <motion.path
                      d="M10 25l9 9 19-20"
                      fill="none"
                      stroke="var(--color-clay)"
                      strokeWidth={2}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease, delay: 0.2 }}
                    />
                  </svg>
                  <h3 className="mt-6 font-display text-4xl">Thanks, we&apos;ve got it.</h3>
                  <p className="mt-4 max-w-md text-graphite">
                    This is a demo, so nothing was actually sent. On the live site, your request
                    goes straight to the DJ&apos;s team.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="label-mono mt-8 text-clay-deep underline-offset-4 hover:underline"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  className="grid gap-6 p-6 sm:grid-cols-2 sm:p-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <label className="sm:col-span-2">
                    <span className="label-mono text-graphite">Full name</span>
                    <input
                      name="name"
                      autoComplete="name"
                      className={field}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {err("name")}
                  </label>
                  <label>
                    <span className="label-mono text-graphite">Phone</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      className={field}
                      aria-invalid={!!errors.contact}
                      aria-describedby={errors.contact ? "contact-error" : undefined}
                    />
                  </label>
                  <label>
                    <span className="label-mono text-graphite">Email</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={field}
                      aria-invalid={!!errors.email || !!errors.contact}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {err("email")}
                  </label>
                  {errors.contact && <div className="-mt-4 sm:col-span-2">{err("contact")}</div>}
                  <label>
                    <span className="label-mono text-graphite">City</span>
                    <input name="city" autoComplete="address-level2" className={field} />
                  </label>
                  <label>
                    <span className="label-mono text-graphite">ZIP code</span>
                    <input
                      name="zip"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      className={field}
                      aria-invalid={!!errors.zip}
                      aria-describedby={errors.zip ? "zip-error" : undefined}
                    />
                    {err("zip")}
                  </label>
                  <fieldset className="sm:col-span-2">
                    <legend className="label-mono text-graphite">What do you need?</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SERVICES.map((s, i) => (
                        <label key={s} className="cursor-pointer">
                          <input
                            type="radio"
                            name="service"
                            value={s}
                            defaultChecked={i === 0}
                            className="peer sr-only"
                          />
                          <span className="block rounded-[2px] border border-mullion px-4 py-2 text-[0.9375rem] transition-colors duration-300 peer-checked:border-pine peer-checked:bg-pine peer-checked:text-limestone peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay hover:border-ink">
                            {s}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="sm:col-span-2">
                    <span className="label-mono text-graphite">Project details (optional)</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="How many windows or doors, rough sizes, anything we should know."
                      className={`${field} resize-y`}
                    />
                  </label>
                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-graphite">No obligation. We usually call back within one business day.</p>
                    <button
                      type="submit"
                      className="rounded-[2px] bg-clay px-8 py-4 font-medium text-limestone transition-colors duration-300 hover:bg-clay-deep"
                    >
                      Request my free quote
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
