/**
 * Make the fields of an object NonNullable
 */
export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>
}
/**
 *
 * @example
 *
 * ```ts
 * interface MyInterface {
 *   prop1?: string;
 *   prop2?: number;
 * }
 *
 * // Use the utility type to create a new type that enforces the constraint
 * type TOne = AtLeastOne<MyInterface>;
 *
 * const example1: TOne = { prop1: "Hello" }; // Valid
 * const example2: TOne = { prop2: 42 }; // Valid
 * const example3: TOne = { prop1: "Hello", prop2: 42 }; // Valid
 * const example4: TOne = {}; // Error: At least one property required
 */
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U]

type Only<T, U> = {
  [P in keyof T]: T[P]
} & {
  [P in keyof U]?: never
}

/**
 * When you need either interface, but don't want to accept both.
 *
 * @example
 *
 * ```ts
 * interface One {
 *   a: string
 * }
 * interface Two {
 *   b: string
 * }
 * type OneOrTwo = Either<One, Two>
 *
 * function f(par: OneOrTwo) {}
 *
 * f({ a: "" }) // ok
 * f({ b: "" }) // ok
 * f({ a: "", b: "" }) // not ok
 * ```
 */
export type Either<T, U> = Only<T, U> | Only<U, T>
