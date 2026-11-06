/** Resolve a public/ path against the deployment base (works on GitHub Pages sub-paths). */
export const asset = (path: string): string => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
