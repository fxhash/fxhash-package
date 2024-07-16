import { BlockchainType } from "@fxhash/shared"
import { enumKeys } from "."

export type Blockchain = keyof typeof BlockchainType
export const BlockchainTypes = enumKeys(BlockchainType)
