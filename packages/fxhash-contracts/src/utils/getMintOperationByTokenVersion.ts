import { TContractOperation } from "services/contract-operations/ContractOperation"
import {
  IReserveConsumption,
  MintOperation,
  TMintOperationParams,
} from "services/contract-operations/Mint"
import {
  MintV3Operation,
  TMintV3OperationParams,
} from "services/contract-operations/MintV3"
import {
  GenerativeToken,
  GenerativeTokenVersion,
} from "types/entities/GenerativeToken"

interface MintTransformer<T> {
  operation: TContractOperation<T>
  getParams: (data: {
    token: GenerativeToken
    price: number
    reserveConsumption: IReserveConsumption | null
  }) => T
}

export const mintOperationsByTokenVersion: Record<
  GenerativeTokenVersion,
  MintTransformer<any>
> = {
  PRE_V3: {
    operation: MintOperation,
    getParams: (data) => {
      return {
        token: data.token,
        price: data.price,
        consumeReserve: data.reserveConsumption,
      }
    },
  } as MintTransformer<TMintOperationParams>,
  V3: {
    operation: MintV3Operation,
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
}

export const getMintOperationByTokenVersion = (
  version: GenerativeTokenVersion
): MintTransformer<any> => mintOperationsByTokenVersion[version]

export const getMintOperationByToken = (
  token: GenerativeToken
): MintTransformer<any> => getMintOperationByTokenVersion(token.version)
