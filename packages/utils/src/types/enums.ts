/**
 * Returns a typed array of every enum properties there is in the enum.
 * @param obj An enum object
 * @returns An array of every enum properties
 */
export function enumKeys<O extends object, K extends keyof O = keyof O>(
  obj: O
): K[] {
  return Object.keys(obj).filter(k => !Number.isNaN(k)) as K[]
}

export type _Key<T extends { [k: string]: any }> = Extract<keyof T, string>
