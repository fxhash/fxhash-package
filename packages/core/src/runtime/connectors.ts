import sha1 from "sha1"
import { ProjectState, RuntimeConnector } from "./_types.js"
import { config, proxyUrl } from "@fxhash/config"
import { fxParamsAsQueryParams } from "./utils.js"

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
        paramsString += `&fxparamsUpdate=${sha1(inputBytes)}`
      }
      paramsString += `#0x${inputBytes}`
    }
  }
  return paramsString
}

export const iframeConnector: RuntimeConnector = iframe => ({
  getUrl: (state: ProjectState, urlParams?: URLSearchParams) => {
    const { cid, snippetVersion, ...projectState } = state
    const baseUrl = proxyUrl(cid)
    const params = getURLSearchParams(projectState, {
      additionalParams: urlParams,
      fxParamsAsQueryParams: fxParamsAsQueryParams(snippetVersion),
    })
    return `${baseUrl}?${params}`
  },
  useSync: (runtimeUrl: string) => {
    iframe.contentWindow?.location.replace(runtimeUrl)
  },
})

export const fsEmulatorConnector: RuntimeConnector = iframe => ({
  getUrl: (state: ProjectState, urlParams?: URLSearchParams) => {
    const { cid, snippetVersion, ...projectState } = state
    const baseUrl = `${config.apis.fsEmulator}/resolve/${cid}/`
    const params = getURLSearchParams(projectState, {
      additionalParams: urlParams,
      fxParamsAsQueryParams: fxParamsAsQueryParams(snippetVersion),
    })

    return `${baseUrl}?${params}`
  },
  useSync: (runtimeUrl: string) => {
    iframe.contentWindow?.location.replace(runtimeUrl)
  },
})
