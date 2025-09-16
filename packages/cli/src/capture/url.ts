import sha1 from "sha1"

// TODO: Refactor into reusable package
export function urlWithHashAndParams(
  cid: string,
  urlParams: {
    fxhash?: string
    fxiteration?: number | string
    fxminter?: string
    fxparams?: string | null
    fxParamsAsQueryParams?: boolean
    fxcontext?: string
    noFxParamsUpdateQuery?: boolean
  },
  transform: (cid: string) => string
) {
  let url = `${transform(cid)}/?fxhash=${urlParams.fxhash}&fxiteration=${
    urlParams.fxiteration
  }&fxminter=${urlParams.fxminter}`
  if (urlParams.fxcontext) url += `&fxcontext=${urlParams.fxcontext}`
  if (urlParams.fxparams) {
    if (urlParams.fxParamsAsQueryParams) {
      url += `&fxparams=${urlParams.fxparams}`
    } else {
      if (!urlParams.noFxParamsUpdateQuery) {
        url += `&fxparamsUpdate=${sha1(urlParams.fxparams)}`
      }
      url += `#0x${urlParams.fxparams}`
    }
  }
  return url
}
