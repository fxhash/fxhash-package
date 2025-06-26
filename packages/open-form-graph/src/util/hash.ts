import { float2hex, xorshiftString } from "@fxhash/utils"

export function quickHash(data: string): string {
  return float2hex(xorshiftString(data))
}
