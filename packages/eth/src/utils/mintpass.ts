import { ReserveListEntry } from "./minters.js"

export type MintPassReserveData = {
  signer: `0x${string}`
  consumedMintPasses: ReserveListEntry[]
}
