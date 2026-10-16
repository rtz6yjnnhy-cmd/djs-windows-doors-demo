// next/image doesn't prefix basePath onto src, so public files go through here.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
