import type { MetadataRoute } from "next";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// Web app manifest: home-screen name and icons on Android.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: asset("/"),
    scope: asset("/"),
    display: "browser",
    background_color: "#0a1628",
    theme_color: "#0a1628",
    icons: [
      { src: asset("/icons/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/icons/icon-512.png"), sizes: "512x512", type: "image/png" },
      { src: asset("/icons/icon-maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
