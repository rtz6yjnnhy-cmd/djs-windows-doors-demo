// Runs after `next build`. public/ is copied into the static export as-is, so
// drop the source files that are kept in the repo but never shown on the page:
// the original job photos (backup of public/images/work) and the raw logo PNG.
import { rmSync } from "node:fs";

for (const path of ["out/images/real", "out/images/logo.png"]) {
  rmSync(path, { recursive: true, force: true });
  console.log(`pruned ${path}`);
}
