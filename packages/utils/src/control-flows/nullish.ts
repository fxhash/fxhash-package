/**
 * Check if `x` is not null or undefined. If not, narrows `x` type with a
 * `NonNullable<x>` predicate.
 * @param x The variable to test
 * @returns A boolean which indicates whether `x` is nullable or not
 */
export function nonNullable<T>(x: T): x is NonNullable<T> {
  return typeof x !== "undefined" && x !== null
}
