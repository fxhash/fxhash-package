import { LiveMintingEvent, LiveMintingPass } from "@fxhash/shared"

export interface ILiveMintingContext {
  loading: boolean
  event: LiveMintingEvent | null
  mintPass: LiveMintingPass | null
  authToken: string | null
  paidLiveMinting: boolean | null
  error: string | null
}
