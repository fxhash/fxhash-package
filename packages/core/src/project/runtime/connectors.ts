import { ProjectState } from "./_types.js"
import { config, proxyUrl } from "@fxhash/config"
import { fxParamsAsQueryParams } from "./utils.js"
import { RuntimeConnector } from "./_interfaces.js"
import { float2hex, xorshiftString } from "@fxhash/utils"

const QUERY_KEYS: Record<string, string> = {
  hash: "fxhash",
  chain: "fxchain",
  minter: "fxminter",
  iteration: "fxiteration",
  context: "fxcontext",
}

export function getURLSearchParams(
  state: Omit<ProjectState, "cid" | "snippetVersion">,
  options: {
    fxParamsAsQueryParams?: boolean
    noFxParamsUpdateQuery?: boolean
    additionalParams?: URLSearchParams
  }
): string {
  const { inputBytes, ...stateWithoutParams } = state
  const urlSearchParams = new URLSearchParams({
    ...Object.entries(stateWithoutParams).reduce((acc, [key, value]) => {
      const newKey = QUERY_KEYS[key] || key
      return { ...acc, [newKey]: value }
    }, {}),
    ...Object.fromEntries(options.additionalParams || []),
  })
  let paramsString = urlSearchParams.toString()
  // I older version params where query params
  // in newer version they are in hash
  if (inputBytes) {
    if (options.fxParamsAsQueryParams) {
      paramsString += `&fxparams=${inputBytes}`
    } else {
      if (!options.noFxParamsUpdateQuery) {
        paramsString += `&fxparamsUpdate=${float2hex(xorshiftString(inputBytes))}`
      }
      paramsString += `#0x${inputBytes}`
    }
  }
  return paramsString
}

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

export const proxyConnector: RuntimeConnector = {
  getUrl: (state: ProjectState, urlParams?: URLSearchParams) =>
    getProjectUrl(proxyUrl(state.cid), state, urlParams),
}

export const fsEmulatorConnector: RuntimeConnector = {
  getUrl: (state: ProjectState, urlParams?: URLSearchParams) =>
    getProjectUrl(
      `${config.apis.fsEmulator}/resolve/${state.cid}`,
      state,
      urlParams
    ),
}
