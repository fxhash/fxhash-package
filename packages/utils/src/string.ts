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
