export type HashParams = {
  params: string;
  lineage: string[];
}

export function parseHashParams(url: string): HashParams {
  const hashIndex = url.indexOf('#');

  if (hashIndex === -1) {
    return { params: '', lineage: [] };
  }

  const params = url.slice(hashIndex + 1);

  // old params only #0x{bytes}
  if (params.startsWith('0x')) {
    return { params, lineage: [] };
  }

  // new extensible params params #lineage=...&params=...
  const urlSearchParams = new URLSearchParams(params);

  // handle params lineage param
  let lineage: string[] = [];
  const lineageParam = urlSearchParams.get('lineage');

  if (lineageParam) {
    lineage = lineageParam.split(',').map((l) => l.trim());
  }

  return {
    params: urlSearchParams.get('params') || params,
    lineage
  };
}
