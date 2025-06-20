import { ProjectState } from "./_types.js"
import fxhashConfig, { config, proxyUrl } from "@fxhash/config"
import { fxParamsAsQueryParams, quickHash } from "./utils.js"
import { IRuntimeConnector } from "./_interfaces.js"

/**
 * A static map of the project state properties to their respective
 * url parameter query key.
 */
const QUERY_KEYS: Record<string, string> = Object.freeze({
  hash: "fxhash",
  chain: "fxchain",
  minter: "fxminter",
  iteration: "fxiteration",
  context: "fxcontext",
})

/**
 * Get the URLSearchParams from a project given its state.
 * @param state - The project state
 * @param options
 * @param options.fxParamsAsQueryParams - If the fx(params)
 * should be passed as query params
 * @param options.noFxParamsUpdateQuery - If the fx(params)
 * should not be updated in the query
 * @param options.additionalParams - Additional params
 * to be added to the URLSearchParams
 * @returns The URLSearchParams string
 */
export function getURLSearchParams(
  state: Omit<ProjectState, "cid" | "snippetVersion">,
  options: {
    fxParamsAsQueryParams?: boolean
    noFxParamsUpdateQuery?: boolean
    additionalParams?: URLSearchParams
    noParentHashUpdateQuery?: boolean
  } = {}
): string {
  const { inputBytes, parentHashes, ...stateWithoutParamsAndLineage } = state
  const urlSearchParams = new URLSearchParams({
    ...Object.entries(stateWithoutParamsAndLineage).reduce(
      (acc, [key, value]) => {
        const newKey = QUERY_KEYS[key] || key
        return { ...acc, [newKey]: value }
      },
      {}
    ),
    ...Object.fromEntries(options.additionalParams || []),
  })
  let paramsString = urlSearchParams.toString()
  const hasLineage = parentHashes && parentHashes.length > 0
  if (hasLineage) {
    if (!options.noParentHashUpdateQuery) {
      paramsString += `&parentHashesUpdate=${quickHash(parentHashes.join(""))}`
    }
    paramsString += `#lineage=${parentHashes.join(",")}`
  }
  if (inputBytes) {
    // I older version params where query params
    // in newer version they are in hash
    if (options.fxParamsAsQueryParams) {
      paramsString += `&fxparams=${inputBytes}`
    } else {
      if (!options.noFxParamsUpdateQuery) {
        paramsString += `&fxparamsUpdate=${quickHash(inputBytes)}`
      }
      if (!hasLineage) {
        paramsString += `#0x${inputBytes}`
      } else {
        paramsString += `&params=0x${inputBytes}`
      }
    }
  }
  return paramsString
}

/**
 * Given a base url and a project state, return the project URL.
 * @param baseUrl - The base URL of the project
 * @param state - The project state
 * @param urlParams - Additional URLSearchParams
 * @returns The project URL
 */

export const getProjectUrl = (
  baseUrl: string,
  state: ProjectState,
  urlParams?: URLSearchParams
) => {
  const { snippetVersion, ...projectState } = state
  const params = getURLSearchParams(projectState, {
    additionalParams: urlParams,
    fxParamsAsQueryParams: fxParamsAsQueryParams(snippetVersion),
  })
  return `${baseUrl}/?${params}`
}

/**
 * A connector for the proxy environment.
 */
export const proxyConnector: IRuntimeConnector = {
  getUrl: (state: ProjectState, urlParams?: URLSearchParams) =>
    getProjectUrl(proxyUrl(state.cid), state, urlParams),
}

/**
 * A connector for the fs emulator environment.
 */
export const fsEmulatorConnector: IRuntimeConnector = {
  getUrl: (state: ProjectState, urlParams?: URLSearchParams) =>
    getProjectUrl(
      `${fxhashConfig.envs.dev.apis.fsEmulator}/resolve/${state.cid}`,
      state,
      urlParams
    ),
}
