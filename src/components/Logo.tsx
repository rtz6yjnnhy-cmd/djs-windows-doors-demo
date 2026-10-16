import Image from "next/image";
import { asset } from "@/lib/asset";

// The official logo, cut from public/images/logo.png into transparent
// variants: "compact" (no tagline, for the header) and "full" (with
// INSTALLED RIGHT, for the footer), each in brand color and in white.
const SIZES = {
  compact: { width: 624, height: 240 },
  full: { width: 820, height: 360 },
};

type Props = {
  variant?: keyof typeof SIZES;
  tone?: "color" | "white";
  className?: string;
  preload?: boolean;
  /** Set when the brand name is already given nearby (e.g. a labelled link). */
  decorative?: boolean;
};

export function Logo({ variant = "compact", tone = "color", className = "", preload, decorative }: Props) {
  return (
    <Image
      src={asset(`/images/logo-${variant}-${tone}.png`)}
      alt={decorative ? "" : "DJ's Windows & Doors"}
      width={SIZES[variant].width}
      height={SIZES[variant].height}
      preload={preload}
      className={`w-auto ${className}`}
    />
  );
}
