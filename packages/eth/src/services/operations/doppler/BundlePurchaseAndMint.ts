import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import {
  simulateAndExecuteContract,
  type SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { TransactionType } from "@fxhash/shared"
import { getCurrentChain } from "@/services/Wallet.js"
import { fxDopplerFactoryAbi } from "@/__generated__/wagmi.js"
import { config } from "@fxhash/config"

export type TBundlePurchaseAndMintEthOperationParams = {
  // The ETH amount of the quote
  ethAmount: bigint
  // Address of the project token contract
  projectToken: `0x${string}`
  // Address to mint tokens to
  to: `0x${string}`
  // Number of tokens to mint
  amount: bigint
  // Universal Router commands for token purchase
  commands: `0x${string}`
  // Universal Router inputs for token purchase
  inputs: `0x${string}`[]
}

export class BundlePurchaseAndMintEthOperation extends EthereumContractOperation<TBundlePurchaseAndMintEthOperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}

  async call(): Promise<{ type: TransactionType; hash: string }> {
    const args: SimulateAndExecuteContractRequest<
      typeof fxDopplerFactoryAbi,
      "bundlePurchaseAndMint"
    > = {
      address: config.base.contracts.fx_doppler_factory,
      abi: fxDopplerFactoryAbi,
      functionName: "bundlePurchaseAndMint",
      args: [
        this.params.projectToken,
        this.params.to,
        this.params.amount,
        this.params.commands,
        this.params.inputs,
      ],
      account: this.manager.address as `0x${string}`,
      chain: getCurrentChain(this.chain),
      value: this.params.ethAmount,
    }
    const transactionHash = await simulateAndExecuteContract(this.manager, args)
    return {
      type: TransactionType.ONCHAIN,
      hash: transactionHash,
    }
  }

  success(): string {
    return "Successfully minted project"
  }
}
