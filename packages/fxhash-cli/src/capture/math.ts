// TODO: REFACTOR into package

export const alphabet =
  "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"

function b58dec(str: string): number {
  return [...str].reduce(function (p: number, c: string): number {
    return (p * alphabet.length + alphabet.indexOf(c)) | 0
  }, 0)
}

function sfc32(seed: number[]): () => number {
  let a = seed[0] | 0
  let b = seed[1] | 0
  let c = seed[2] | 0
  let d = seed[3] | 0
  return function () {
    a |= 0
    b |= 0
    c |= 0
    d |= 0
    const t = (((a + b) | 0) + d) | 0
    d = (d + 1) | 0
    a = b ^ (b >>> 9)
    b = (c + (c << 3)) | 0
    c = (c << 21) | (c >>> 11)
    c = (c + t) | 0
    return (t >>> 0) / 4294967296
  }
}

function matcher(str: string, start: number): number[] {
  return str
    .slice(start)
    .match(new RegExp(".{" + ((str.length - start) >> 2) + "}", "g"))
    .map(function (substring: string): number {
      return b58dec(substring)
    })
}

export function getRandomHash(n: number): string {
  return Array(n)
    .fill(0)
    .map(function (_) {
      return alphabet[(Math.random() * alphabet.length) | 0]
    })
    .join("")
}

export function getRandomFxhash() {
  return "oo" + getRandomHash(49)
}

export function getRandomTezosAddress() {
  return "tz1" + getRandomHash(33)
}
