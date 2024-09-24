import {
  FxParamDefinition,
  FxParamType,
  FxParamsData,
  jsonStringifyBigint,
} from "@fxhash/params"
import sha1 from "sha1"
import { RuntimeState } from "./_types.js"
import semver from "semver"
import { mergeWith } from "lodash"

/**
 * Returns a boolean based on the provided snippet version. The boolean
 * determines if the inputBytes of fx(params) should be passed as query
 * params the the project url or not. Start from versions larger than 3.2.0,
 * the inputBytes should be passed as hash to the url.
 */
export function fxParamsAsQueryParams(snippetVersion: string): boolean {
  return !semver.valid(snippetVersion) || semver.lte(snippetVersion, "3.2.0")
}

/**
 * Hashes a runtime state using sha1
 */
export function hashRuntimeState(state: RuntimeState) {
  return sha1(jsonStringifyBigint(state))
}

/**
 * Hashes the hard-refresh properties of a runtime state:
 * - hash
 * - minter address
 * - params in update mode "page-reload"
 */
export function hashRuntimeHardState(
  state: RuntimeState,
  definition: FxParamDefinition<FxParamType>[] | null
) {
  const staticParams: FxParamsData = {}
  for (const id in state.params) {
    const def = definition?.find(def => def.id === id)
    // if no definition, or update == "page-reload" (which is default value)
    if (!def || !def.update || def.update === "page-reload") {
      staticParams[id] = state.params[id]
    }
  }
  return hashRuntimeState({
    ...state,
    params: staticParams,
  })
}

function mergeCustomizer(_: any, source: any) {
  if (source instanceof Uint8Array) {
    return new Uint8Array(source)
  }
  return undefined
}

export const mergeWithKeepingUint8ArrayType = (object: any, source: any) =>
  mergeWith(object, source, mergeCustomizer)
