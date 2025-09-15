/**
 * A singleton wrapper for functionnal programming. The function passed will
 * only be called once the first time the singleton is called, then the same
 * reference will be returned.
 *
 * @param generator A function which instanciates some object
 * @param warning Whether a console.warning with the given value should be
 * emitted when there's already an instance.
 *
 * @returns A function which will return an existing instance or call the
 * generator to instanciate object.
 *
 * @example
 *
 * ```ts
 * const Singleton = singleton((a: string) => {
 *   let rnd = Math.random()
 *   console.log(a)
 *   return {
 *     rnd,
 *   }
 * })
 *
 * const callA = Singleton("hello") // log "hello"
 * const callB = Singleton("world") // log "world"
 * callA.rnd === callB.rnd // true
 * ```
 */
export function singleton<T, U extends unknown[]>(
  generator: (...args: U) => T,
  warning?: string
): (...args: U) => T {
  const instance: T | null = null
  return (...args: U) => {
    if (instance) {
      if (warning) console.warn(warning)
      return instance
    }
    return generator(...args)
  }
}
