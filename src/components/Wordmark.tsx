// Provisional typographic wordmark until the client has a logo.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span translate="no" className={`flex items-baseline gap-2.5 ${className}`}>
      <span className="font-display text-[1.75rem] leading-none font-normal italic tracking-tight">
        DJ&apos;s
      </span>
      <span className="label-mono hidden text-[0.6875rem] opacity-80 sm:inline">
        Windows &amp; Doors
      </span>
    </span>
  );
}
