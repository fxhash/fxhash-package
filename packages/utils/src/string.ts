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
