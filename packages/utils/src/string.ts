/**
 * Turn the first character of a string into an UPPERCASE letter.
 * @param str String to capitalize
 * @returns Capitalized string
 *
 * @example
 *
 * capitalize("abcde") // "Abcde"
 */
export function capitalize(str: string): string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncateMiddle(
  str: string,
  length: number,
  ellipsis: string = "..."
): string {
  if (length * 2 >= str.length) {
    return str
  }

  const start = str.slice(0, length)
  const end = str.slice(-length)

  return `${start}${ellipsis}${end}`
}

/**
 * Generates a *unique* string ID, using `Date.now()` and `Math.random()`. IDs
 * may not have the same length.
 *
 * **Warning: not cryptographically secure!**
 *
 * @returns A *unique* string ID
 */
export function uniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

/**
 * Splits a string in 2 sections at a given index, and returns these 2 sections.
 */
export function splitStringAt(str: string, index: number): [string, string] {
  return [str.slice(0, index), str.slice(index)]
}
/**
 * convert a string of tags separated by commas into an array of tags
 * @param str String of tags separated by commas
 * @returns Array<string> of tags
 */

export function tagsFromString(str: string): string[] {
  return str
    .split(",")
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
}

/**
 * convert an array of bytes into a string
 * @param byteArray Array of numbers to
 * @returns String
 */

export function bytesToString(byteArray: number[]): string {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2)
  }).join("")
}

/**
 * convert string to byte string
 * @param str String to convert
 * @returns Byte string
 */

export function stringToByteString(str: string): string {
  const bytes = []
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i))
  }
  return bytesToString(bytes)
}
