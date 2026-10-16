"use client";

import { useSyncExternalStore } from "react";

// The static export renders the build year; once hydrated, the visitor's
// clock takes over, so the copyright stays current between deploys.
const BUILD_YEAR = new Date().getFullYear();
const noop = () => () => {};

export function CurrentYear() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => BUILD_YEAR);
  return <>{year}</>;
}
