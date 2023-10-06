import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"
import { mapModKtKeyToContract } from "./Moderate"

type TReportContractKey = "token_v3" | "token"

type TReportTokenParams = {
  contract: TReportContractKey
  tokenId: number
  reason: number
}

export class ReportTokenOperation {
  static create(blockchainType: BlockchainType) {
    switch (blockchainType) {
      case BlockchainType.TEZOS:
        return TezosReportTokenOperation
      case BlockchainType.ETHEREUM:
        throw new Error(`ethereum not implemented`)
      default:
        throw new Error(`Unsupported blockchain type: ${blockchainType}`)
    }
  }
}

/**
 * Updates user profile
 */
class TezosReportTokenOperation extends TezosContractOperation<TReportTokenParams> {
  contract: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.contract = await this.manager.getContract(
      mapModKtKeyToContract[this.params.contract]
    )
  }

  async call(): Promise<TransactionWalletOperation> {
    // extract
    const { tokenId, reason } = this.params

    // build the generic parameters
    const params: any = {
      reason: reason === -1 ? null : reason,
      token_id: tokenId,
    }

    return this.contract!.methodsObject.report(params).send()
  }

  success(): string {
    return `Your report has been sent. Thank you!.`
  }
}
