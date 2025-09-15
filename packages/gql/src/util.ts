export type DeepNonNullable<T> = T extends (infer U)[]
  ? DeepNonNullable<U>[] // Recursively apply to array elements
  : T extends object
    ? { [K in keyof T]-?: T[K] } // Apply recursively to object properties
    : T // Directly apply to non-object types

export type ExtractNested<
  T,
  Path extends string,
> = Path extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? T[K] extends (infer U)[]
      ? ExtractNested<DeepNonNullable<U>, R> // Drill into array elements
      : ExtractNested<DeepNonNullable<NonNullable<T[K]>>, R> // Drill into non-array elements
    : never
  : Path extends keyof T
    ? NonNullable<T[Path]> extends (infer U)[]
      ? NonNullable<U> // If it's an array, extract the element type
      : NonNullable<T[Path]> // Otherwise, directly extract
    : never

export type ExtractFromQuery<T, Path extends string> = ExtractNested<
  DeepNonNullable<T>,
  Path
>
