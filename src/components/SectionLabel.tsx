type Props = {
  index: string;
  children: string;
  tone?: "light" | "dark";
};

// Drawing-sheet style label: "02 — SERVICES" with a short rule.
export function SectionLabel({ index, children, tone = "light" }: Props) {
  const color = tone === "dark" ? "text-brass" : "text-clay-deep";
  return (
    <p className={`label-mono flex items-center gap-3 ${color}`}>
      <span>{index}</span>
      <span aria-hidden className="h-px w-8 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  );
}
