"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { useState, type FormEvent } from "react";
import { business } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

type Errors = Partial<Record<"name" | "contact" | "email" | "zip", string>>;

const SERVICES = [
  "Windows",
  "Doors",
  "Windows & doors",
  "Product only",
  "Not sure yet",
];

// Character limits, enforced by the inputs and again before sending
const MAX = { name: 100, phone: 30, email: 254, city: 80, zip: 5, message: 2000 } as const;

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

// The site is static (GitHub Pages), so requests go through FormSubmit, which
// emails them to the business inbox. The first request triggers a one-time
// activation email that has to be confirmed before requests are delivered.
async function sendQuote(data: FormData) {
  const value = (k: string) => {
    const v = String(data.get(k) ?? "").trim();
    return k in MAX ? v.slice(0, MAX[k as keyof typeof MAX]) : v;
  };
  if (value("_honey")) return; // filled by bots only
  const name = value("name");
  const res = await fetch(business.quoteEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `New estimate request from ${name}`,
      _template: "table",
      _captcha: "false",
      // Also checked by FormSubmit, which drops the request if it is filled
      _honey: value("_honey"),
      ...(value("email") ? { _replyto: value("email") } : {}),
      Name: name,
      Phone: value("phone") || "—",
      Email: value("email") || "—",
      City: value("city") || "—",
      "ZIP code": value("zip") || "—",
      Service: value("service"),
      "Project details": value("message") || "—",
    }),
  });
  const json = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
  if (!res.ok || String(json?.success) !== "true") throw new Error("Request not delivered");
}

const field =
  "mt-2 w-full rounded-[2px] border border-line bg-paper px-4 py-3 text-ink placeholder:text-slate/60 transition-colors duration-300 focus:border-ink focus:outline-none aria-[invalid=true]:border-royal";

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSending(true);
      setFailed(false);
      try {
        await sendQuote(data);
        form.reset();
        setSent(true);
      } catch {
        setFailed(true);
      } finally {
        setSending(false);
      }
      return;
    }
    // Move focus to the first field that needs fixing
    const first = (["name", "contact", "email", "zip"] as const).find((k) => found[k]);
    const target = first === "contact" ? "phone" : first;
    form.querySelector<HTMLInputElement>(`[name="${target}"]`)?.focus();
  };

  const err = (key: keyof Errors) =>
    errors[key] ? (
      <p id={`${key}-error`} role="alert" className="mt-1.5 text-sm text-royal-deep">
        {errors[key]}
      </p>
    ) : null;

  return (
    <section id="contact" className="bg-paper py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-4 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionLabel index="08">Free Quote</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] font-normal tracking-[-0.015em]">
            Tell us about <em className="text-royal">your project.</em>
          </h2>
          <p className="mt-6 max-w-md text-slate">
            Windows, doors or both: a few details are enough to start. We&apos;ll call you back to
            talk through the job and set up a time to measure.
          </p>

          <dl className="mt-10 border-t border-line">
            {[
              { k: "Call", v: business.phone, href: business.phoneHref },
              { k: "Email", v: business.email, href: `mailto:${business.email}` },
              { k: "Hours", v: business.hours },
            ].map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <dt className="label-mono text-slate">{row.k}</dt>
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

          <div className="relative mt-10 hidden aspect-[4/5] max-w-sm overflow-hidden lg:block">
            <Image
              src={asset("/images/work/entry-door-stone.jpg")}
              alt="White entry door with sidelites and a half-round transom installed by DJ's"
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          {/* The form sits inside a window frame */}
          <div className="border-[10px] border-mist bg-paper shadow-[inset_0_0_0_1px_var(--color-line),0_0_0_1px_var(--color-line)]">
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
                      stroke="var(--color-royal)"
                      strokeWidth={2}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease, delay: 0.2 }}
                    />
                  </svg>
                  <h3 className="mt-6 font-display text-4xl">Thanks, we&apos;ve got it.</h3>
                  <p className="mt-4 max-w-md text-slate">
                    Your request is on its way to the DJ&apos;s team. We usually call back within
                    one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="label-mono mt-8 text-royal-deep underline-offset-4 hover:underline"
                  >
                    Send Another Request
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
                  {/* Honeypot: hidden from people, filled in by spam bots */}
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                  <label className="sm:col-span-2">
                    <span className="label-mono text-slate">Full name</span>
                    <input
                      name="name"
                      autoComplete="name"
                      maxLength={MAX.name}
                      className={field}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {err("name")}
                  </label>
                  <label>
                    <span className="label-mono text-slate">Phone</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={MAX.phone}
                      className={field}
                      aria-invalid={!!errors.contact}
                      aria-describedby={errors.contact ? "contact-error" : undefined}
                    />
                  </label>
                  <label>
                    <span className="label-mono text-slate">Email</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      spellCheck={false}
                      maxLength={MAX.email}
                      className={field}
                      aria-invalid={!!errors.email || !!errors.contact}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {err("email")}
                  </label>
                  {errors.contact && <div className="-mt-4 sm:col-span-2">{err("contact")}</div>}
                  <label>
                    <span className="label-mono text-slate">City</span>
                    <input name="city" autoComplete="address-level2" maxLength={MAX.city} className={field} />
                  </label>
                  <label>
                    <span className="label-mono text-slate">ZIP code</span>
                    <input
                      name="zip"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={MAX.zip}
                      className={field}
                      aria-invalid={!!errors.zip}
                      aria-describedby={errors.zip ? "zip-error" : undefined}
                    />
                    {err("zip")}
                  </label>
                  <fieldset className="sm:col-span-2">
                    <legend className="label-mono text-slate">What do you need?</legend>
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
                          <span className="block rounded-[2px] border border-line px-4 py-2 text-[0.9375rem] pressable peer-checked:border-navy peer-checked:bg-navy peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-royal hover:border-ink">
                            {s}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <label className="sm:col-span-2">
                    <span className="label-mono text-slate">Project details (optional)</span>
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={MAX.message}
                      placeholder="e.g. 8 double-hung windows and a back door, about 36 × 60 in…"
                      className={`${field} resize-y`}
                    />
                  </label>
                  {failed && (
                    <p role="alert" className="text-sm text-royal-deep sm:col-span-2">
                      We couldn&apos;t send your request. Please try again, call{" "}
                      <a href={business.phoneHref} className="underline underline-offset-4">
                        {business.phone}
                      </a>{" "}
                      or email{" "}
                      <a href={`mailto:${business.email}`} className="break-all underline underline-offset-4">
                        {business.email}
                      </a>
                      .
                    </p>
                  )}
                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate">No obligation. We usually call back within one business day.</p>
                    <button
                      type="submit"
                      disabled={sending}
                      aria-busy={sending}
                      className="rounded-[2px] bg-royal px-8 py-4 font-medium text-paper pressable hover:bg-royal-deep disabled:cursor-wait disabled:opacity-70"
                    >
                      {sending ? "Sending…" : "Request My Free Quote"}
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
