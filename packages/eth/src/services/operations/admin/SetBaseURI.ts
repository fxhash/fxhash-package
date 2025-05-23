import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import { encodeFunctionData, getAddress } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import type { MetaTransactionData } from "@safe-global/safe-core-sdk-types"
import { proposeSafeTransaction } from "@/services/Safe.js"
import { getHashFromIPFSCID } from "@/utils/index.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"

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

function getSafeTxData(
  params: TSetBaseURIEthV1OperationParams
): MetaTransactionData {
  return {
    to: getAddress(params.token),
    data: encodeFunctionData({
      abi: FX_GEN_ART_721_ABI,
      functionName: "setBaseURI",
      args: [params.baseURI as `0x${string}`],
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
        [getSafeTxData(this.params)],
        this.manager
      )
      return {
        type: TransactionType.OFFCHAIN,
        hash: transactionHash,
      }
    }

    const args: SimulateAndExecuteContractRequest<
      typeof FX_GEN_ART_721_ABI,
      "setBaseURI"
    > = {
      address: this.params.token,
      abi: FX_GEN_ART_721_ABI,
      functionName: "setBaseURI",
      args: [parsedCID as `0x${string}`],
      account: this.manager.address as `0x${string}`,
      chain: getCurrentChain(this.chain),
    }
    const transactionHash = await simulateAndExecuteContract(this.manager, args)
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return `Successfully set base URI for token ${this.params.token}`
  }
}
