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

export type TArrayCompareFn<T = any> = (a: T, b: T) => boolean
export type TArrayCopyFn<T = any> = (array: T[]) => T[]

export function arrayRemoveDuplicates<T = any>(
  array: T[],
  isSame: TArrayCompareFn<T> = (a, b) => a === b,
  arrayCopy: TArrayCopyFn<T> = arr => arr
): T[] {
  const ret = arrayCopy(array)
  for1: for (let i = array.length - 1; i >= 1; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (isSame(array[i], array[j])) {
        ret.splice(i, 1)
        continue for1
      }
    }
  }
  return ret
}

export function extendedRange(
  arr: number[],
  total: number,
  before: number = 5,
  after: number = 5
): number[] {
  if (!arr.length) return []

  const start = Math.max(Math.min(...arr) - before, 0)
  const end = Math.min(Math.max(...arr) + after, total - 1)

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function mapToIndex(value: number, arrayLength: number): number {
  if (arrayLength <= 0) {
    throw new Error("Array length must be greater than 0.")
  }
  const clamped = Math.max(0, Math.min(1, value))
  const index = Math.floor(clamped * arrayLength)
  return Math.min(index, arrayLength - 1)
}
