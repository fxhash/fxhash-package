import {
  LiveMintingEvent,
  LiveMintingPass,
} from "../types/entities/LiveMinting"

/**
 * The LiveMinting context exposes informations about an event and some extra
 * data required for the whole live minting pipeline.
 */

export interface ILiveMintingContext {
  loading: boolean
  event: LiveMintingEvent | null
  mintPass: LiveMintingPass | null
  error: string | null
}
