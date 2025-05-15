// TODO: REFACTOR into package

export const alphabet =
  "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"

function b58dec(str: string): number {
  return [...str].reduce(function (p: number, c: string): number {
    return (p * alphabet.length + alphabet.indexOf(c)) | 0
  }, 0)
}

export function getRandomHash(n: number): string {
  return Array(n)
    .fill(0)
    .map(function () {
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
