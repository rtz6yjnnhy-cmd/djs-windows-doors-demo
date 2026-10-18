// Public files go through here because next/image doesn't add a basePath to
// src. The site lives at the domain root, so the prefix is empty today.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
