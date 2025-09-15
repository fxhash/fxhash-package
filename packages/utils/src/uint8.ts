/**
 * Outputs the lowercase hex string representation of a Uint8Array
 * @param uint8 A sequence of bytes to convert
 * @returns The lowercase hex string representation of the Uint8Array
 *
 * @example
 *
 * const arr = new Uint8Array(255, 0, 128, 0, 128, 255)
 * const hex = uint8(arr) // "ff00800080ff"
 */
export function u8hex(uint8: Uint8Array): string {
  return [...uint8].map(x => x.toString(16).padStart(2, "0")).join("")
}
