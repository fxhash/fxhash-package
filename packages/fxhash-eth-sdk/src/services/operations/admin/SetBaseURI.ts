import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { encodeFunctionData, getAddress } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types"
import { proposeSafeTransaction } from "@/services/Safe"
import { getHashFromIPFSCID } from "@/utils"
import { TransactionType } from "@fxhash/contracts-shared"
import { getCurrentChain } from "@/services/Wallet"

/**
 * The above type represents the parameters for setting the base URI for an Ethereum V1 operation.
 * @property {`0x${string}`} token - A hexadecimal string representing a token. The `0x` prefix indicates that the
 * string is in hexadecimal format.
 * @property {string} baseURI - The `baseURI` property is a string that represents the base URI for a
 * token. It is used to construct the URI for each individual token by appending the token's unique
 * identifier to the base URI.
 * @property {string} collabAddress - A string representing the address of a collaboration.
 */
export type TSetBaseURIEthV1OperationParams = {
  token: `0x${string}`
  baseURI: string
  collabAddress?: string
}

export function getSafeTxData(): MetaTransactionData {
  return {
    to: getAddress(this.params.token),
    data: encodeFunctionData({
      abi: FX_GEN_ART_721_ABI,
      functionName: "setBaseURI",
      args: [this.params.baseURI],
    }),
    value: "0",
  }
}

/* The SetBaseURIEthV1Operation class is used to set the base URI for a specific token on the Ethereum
blockchain. */
export class SetBaseURIEthV1Operation extends EthereumContractOperation<TSetBaseURIEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const parsedCID = this.params.baseURI.startsWith("ipfs://")
      ? getHashFromIPFSCID(this.params.baseURI.split("ipfs://")[1])
      : getHashFromIPFSCID(this.params.baseURI)
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
      const transactionHash = await proposeSafeTransaction(
        this.chain,
        [getSafeTxData()],
        this.manager
      )
      return {
        type: TransactionType.OFFCHAIN,
        hash: transactionHash,
      }
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: this.params.token,
        abi: FX_GEN_ART_721_ABI,
        functionName: "setBaseURI",
        args: [parsedCID],
        account: this.manager.address as `0x${string}`,
        chain: getCurrentChain(this.chain),
      }
      const transactionHash = await simulateAndExecuteContract(
        this.manager,
        args
      )
      return {
        type: TransactionType.ONCHAIN,
        hash: transactionHash,
      }
    }
  }

  success(): string {
    return `Successfully set base URI for token ${this.params.token}`
  }
}
