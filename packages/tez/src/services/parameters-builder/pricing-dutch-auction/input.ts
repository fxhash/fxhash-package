import { MichelsonMap } from "@taquito/michelson-encoder"

export type TInputPricingDutchAuction<N = number> = {
  levels: MichelsonMap<number, N>
  decrement_duration: N
  opens_at: string | null
}
