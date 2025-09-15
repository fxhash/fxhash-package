export type RandFunction = () => number

export interface ResettableRandFunction extends RandFunction {
  reset?: () => void
}
