import { xorshiftString } from "@fxhash/utils"

export function quickHash(data: string): string {
  return xorshiftString(data).toString(16)
}
