import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { TransactionReceipt } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"

import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

/**
 * The above type represents the parameters for setting the base URI for an Ethereum V1 operation.
 * @property {`0x${string}`} token - A hexadecimal string representing a token. The `0x` prefix indicates that the
 * string is in hexadecimal format.
 * @property {string} baseURI - The `baseURI` property is a string that represents the base URI for a
 * token. It is used to construct the URI for each individual token by appending the token's unique
 * identifier to the base URI.
 */
export type TSetBaseURIEthV1OperationParams = {
  token: `0x${string}`
  baseURI: string
}

/* The SetBaseURIEthV1Operation class is used to set the base URI for a specific token on the Ethereum
blockchain. */
export class SetBaseURIEthV1Operation extends EthereumContractOperation<TSetBaseURIEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.token,
      abi: FX_GEN_ART_721_ABI,
      functionName: "setBaseURI",
      args: [this.params.baseURI],
      account: this.manager.address,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully set base URI for token ${this.params.token}`
  }
}
