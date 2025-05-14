type Cleaner = () => void

/**
 * Simple cleanup utility.
 *
 * @example
 *
 * ```ts
 * const clean = cleanup()
 * //...
 * clean.add(
 *   () => document.removeEventListener("click", clickHandler),
 *   () => document.removeEventListener("mousemove", mouseHandler),
 * )
 * //...
 * clean.clear()
 * ```
 */
export function cleanup() {
  const _toClean: Cleaner[] = []
  return {
    add: (...cleaners: Cleaner[]) => _toClean.push(...cleaners),
    clear: () => {
      _toClean.forEach(fn => fn())
      _toClean.length = 0
    },
  }
}
