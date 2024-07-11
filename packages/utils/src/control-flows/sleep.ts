/**
 * @author fxhash <dev@fxhash.xyz>
 * @license MIT
 *
 * Control commands.
 */

/**
 * Returns a promise which resolves after given time.
 * @param ms The number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}
