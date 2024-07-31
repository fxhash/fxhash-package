/**
 * Very quick string hashing algorithm where each character is passed through
 * some xorshift variant to produce some 64bit hash represented as a number.
 * Can be useful when there is a need to derive some unique ID for unique
 * strings in a fast way.
 *
 * @param str A string as input
 *
 * @returns A hash as a 64bit number for faster processing
 *
 * @example
 * ```ts
 * const hash = xorshiftString("hello world") // 7d2fb77d
 * const hash = xorshiftString("hey")          // 216e3ffa
 * const hash = xorshiftString("a")            // 704e3821
 * const hash = xorshiftString("b")            // 4e37a71e
 * ```
 */
export function xorshiftString(str: string): number {
  let x = 0x0
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i)
    x ^= c
    x ^= x << 13
    x ^= x >> 7
    x ^= x << 17
  }
  return x
}
