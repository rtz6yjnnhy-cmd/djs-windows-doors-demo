import type { NextConfig } from "next";

// Served from the root of djswindowsanddoors.com (GitHub Pages custom domain),
// so there is no basePath.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // No image optimization server on a static host
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
