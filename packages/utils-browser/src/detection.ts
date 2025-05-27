/**
 * @returns Whether the code is executed in a browser context. (Test definition
 * of global window & document objects)
 */
export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined"
}
