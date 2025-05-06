export type HashParams = {
  hash: string;
  lineage: string[];
}

export function parseHashParams(url: string): HashParams {
  const hashIndex = url.indexOf('#');

  if (hashIndex === -1) {
    return { hash: '', lineage: [] };
  }

  const hash = url.slice(hashIndex + 1);

  // old params only #0x{bytes}
  if (hash.startsWith('0x')) {
    return { hash, lineage: [] };
  }

  // new extensible hash params #lineage=...&params=...
  const params = new URLSearchParams(hash);

  // handle hash lineage param
  let lineage: string[] = [];
  const lineageParam = params.get('lineage');

  if (lineageParam) {
    lineage = lineageParam.split(',').map((l) => l.trim());
  }

  return {
    hash: params.get('hash') || hash,
    lineage
  };
}
