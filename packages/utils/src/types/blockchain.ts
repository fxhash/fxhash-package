import { BlockchainType } from "@fxhash/shared"
import { enumKeys } from "./_index"

export type Blockchain = keyof typeof BlockchainType
export const BlockchainTypes = enumKeys(BlockchainType)
