import {
  BlockchainType,
  TAnyContractOperation,
} from "services/operations/ContractOperation"
import { MintOperation, TMintOperationParams } from "services/operations/Mint"
import {
  MintV3Operation,
  TMintV3OperationParams,
} from "services/operations/MintV3"
import { IReserveConsumption } from "types/Reserve"
import {
  GenerativeToken,
  GenerativeTokenVersion,
} from "types/entities/GenerativeToken"
import { getChainFromToken } from "./generative-token"

interface MintTransformer<T> {
  operation: TAnyContractOperation<T>
  getParams: (data: {
    token: GenerativeToken
    price: number
    reserveConsumption: IReserveConsumption | null
  }) => T
}

const mintOpsByVersion = (
  blockchainType: BlockchainType
): Record<GenerativeTokenVersion, MintTransformer<any>> => ({
  PRE_V3: {
    operation: MintOperation.create(blockchainType),
    getParams: (data) => {
      return {
        token: data.token,
        price: data.price,
        consumeReserve: data.reserveConsumption,
      }
    },
  } as MintTransformer<TMintOperationParams>,
  V3: {
    operation: MintV3Operation.create(blockchainType),
    getParams: (data) => {
      return {
        token: data.token,
        price: data.price,
        consumeReserve: data.reserveConsumption,
        createTicket: data.token.inputBytesSize > 0,
        inputBytes: "",
      }
    },
  } as MintTransformer<TMintV3OperationParams>,
})

export const getMintOperationByToken = (
  token: GenerativeToken
): MintTransformer<any> =>
  mintOpsByVersion(getChainFromToken(token))[token.version]
