import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { TransactionReceipt } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"

/**
 * The above type represents the parameters for the SetImageURIEthV1 operation, including a token and
 * an image URI.
 * @property {`0x${string}`} token - A hexadecimal string representing a token.
 * @property {string} imageURI - A string representing the URI (Uniform Resource Identifier) of an
 * image.
 */
export type TSetImageURIEthV1OperationParams = {
  token: `0x${string}`
  imageURI: string
}

/* The SetImageURIEthV1Operation class is used to set the image URI for a specific token on the
Ethereum blockchain. */
export class SetImageURIEthV1Operation extends EthereumContractOperation<TSetImageURIEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt | string> {
    const args: SimulateAndExecuteContractRequest = {
      address: this.params.token,
      abi: FX_GEN_ART_721_ABI,
      functionName: "setImageURI",
      args: [this.params.imageURI],
      account: this.manager.address,
    }
    return simulateAndExecuteContract(this.manager, args)
  }

  success(): string {
    return `Successfully set image URI for token ${this.params.token}`
  }
}
