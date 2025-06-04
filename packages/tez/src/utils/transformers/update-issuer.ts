import { UpdateIssuerForm } from "@fxhash/shared"
import { transformEditionsFormToNumbers } from "./gen-tok-input-form"

/**
 * Given a Generative Token Distribution string input, outputs its numbered
 * version (contract-friendly)
 */
export function transformUpdateIssuerFormToNumbers(
  input: UpdateIssuerForm<string>
): UpdateIssuerForm<number> {
  return {
    ...input,
    editions: transformEditionsFormToNumbers(input.editions),
    royalties: Math.floor(parseFloat(input.royalties!) * 10),
  }
}
