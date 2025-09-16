/**
 * Hash a string with sha256 using the native `crypto.suble` browser API.
 * @param message A string to hash
 * @returns Hashed messaged
 */
export async function sha256(message: string): Promise<string> {
  const buffer = new TextEncoder().encode(message)
  const hash = await crypto.subtle.digest("SHA-256", buffer)
  const hashArray = Array.from(new Uint8Array(hash))
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
}
