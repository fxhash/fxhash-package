import { ReserveListEntry } from "./minters"

export type MintPassReserveData = {
  signer: `0x${string}`
  consumedMintPasses: ReserveListEntry[]
}
