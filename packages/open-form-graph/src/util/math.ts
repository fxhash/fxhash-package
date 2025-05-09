
export function normalize(
  val: number,
  min: number,
  max: number,
  minOut: number,
  maxOut: number
): number {
  if (max === min) return (minOut + maxOut) / 2
  return minOut + ((val - min) / (max - min)) * (maxOut - minOut)
}
