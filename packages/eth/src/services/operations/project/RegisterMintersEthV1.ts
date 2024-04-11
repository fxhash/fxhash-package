import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { encodeFunctionData, getAddress } from "viem"
import { FX_GEN_ART_721_ABI } from "@/abi/FxGenArt721"
import { FX_TICKETS_ABI } from "@/abi/FxTicket"
import {
  DutchAuctionMintInfoArgs,
  FixedPriceMintInfoArgs,
  FreeMintingMintInfoArgs,
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
  TicketMintInfoArgs,
} from "@/services/operations/EthCommon"
import { proposeSafeTransaction } from "@/services/Safe"
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types"
import { processAndFormatMintInfos } from "@/utils/minters"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet"

export type TRegisterMintersEthV1OperationParams = {
  token: `0x${string}`
  mintInfo: (
    | FixedPriceMintInfoArgs
    | DutchAuctionMintInfoArgs
    | TicketMintInfoArgs
    | FreeMintingMintInfoArgs
  )[]
  isTicket: boolean
  collabAddress?: string
}

/**
 * Register minters for a project
 * (update pricing, reserves, etc)
 */
export class RegisterMintersEthV1Operation extends EthereumContractOperation<TRegisterMintersEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const payloadArgs = await processAndFormatMintInfos(
      this.params.mintInfo,
      this.manager,
      this.chain
    )
    if (this.params.collabAddress) {
      await this.manager.connectSafe(this.params.collabAddress)
      const safeTransactionData: MetaTransactionData = {
        to: getAddress(this.params.token),
        data: encodeFunctionData({
          abi: this.params.isTicket ? FX_TICKETS_ABI : FX_GEN_ART_721_ABI,
          functionName: "registerMinters",
          args: [payloadArgs],
        }),
        value: "0",
      }
      const transactionHash = await proposeSafeTransaction(
        this.chain,
        [safeTransactionData],
        this.manager
      )
      return {
        type: TransactionType.OFFCHAIN,
        hash: transactionHash,
      }
    } else {
      const args: SimulateAndExecuteContractRequest = {
        address: this.params.token,
        abi: this.params.isTicket ? FX_TICKETS_ABI : FX_GEN_ART_721_ABI,
        functionName: "registerMinters",
        args: [payloadArgs],
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
    return `Successfully updated minters for ${this.params.token}`
  }
}
