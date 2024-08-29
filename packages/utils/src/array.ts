export function arrayRemove<T>(array: T[], item: T): T[]
export function arrayRemove<T>(
  array: T[],
  findFn: (item: T) => boolean,
  onlyOnce?: boolean
): T[]
export function arrayRemove<T>(
  array: T[],
  par2: T | ((item: T) => boolean),
  onlyOnce = false
) {
  if (typeof par2 === "function") {
    const test = par2 as (item: T) => boolean
    for (let i = array.length - 1; i >= 0; i--) {
      if (test(array[i])) {
        array.splice(i, 1)
        if (onlyOnce) break
      }
    }
  } else {
    const idx = array.indexOf(par2)
    if (idx > -1) {
      array.splice(idx, 1)
    }
  }
  return array
}

/**
 * Returns the array position (0-based) of an element in an array, tested using
 * a test function. If the test function returns true for an element in the
 * array, its index will be returned. Array is parsed from left to right.
 *
 * @returns Index of the element or -1 if not in the array
 */
export function arrayIndexOf<T>(arr: T[], test: (item: T) => boolean): number {
  let idx = -1
  for (let i = 0; i < arr.length; i++) {
    if (test(arr[i])) {
      idx = i
      break
    }
  }
  return idx
}
