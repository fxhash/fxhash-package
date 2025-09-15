/**
 * @author Titian Cernicova-Dragomir
 * @source <https://stackoverflow.com/a/55539616>
 */

type Primitive =
  | string
  | Function
  | number
  | boolean
  | Symbol
  | undefined
  | null
type DeepOmitHelper<T, K extends keyof T> = {
  [P in K]: T[P] extends infer TP //extra level of indirection needed to trigger homomorhic behavior // distribute over unions
    ? TP extends Primitive
      ? TP // leave primitives and functions alone
      : TP extends any[]
        ? DeepOmitArray<TP, K> // Array special handling
        : DeepOmit<TP, K>
    : never
}

type DeepOmitArray<T extends any[], K> = {
  [P in keyof T]: DeepOmit<T[P], K>
}

/**
 * Omit a nested key in a type, while keeping the type structure.
 *
 * @author Titian Cernicova-Dragomir
 * @source <https://stackoverflow.com/a/55539616>
 *
 * @example
 *
 * ```ts
 * type A = {
 *   prop: string
 *   nested: {
 *     toRemove: string
 *     ok: string
 *   }
 * }
 *
 * type A2 = DeepOmit<A, "toRemove">
 * // {
 * //   prop: string
 * //   nested: {
 * //     ok: string
 * //   }
 * // }
 * ```
 */
export type DeepOmit<T, K> = T extends Primitive
  ? T
  : DeepOmitHelper<T, Exclude<keyof T, K>>
