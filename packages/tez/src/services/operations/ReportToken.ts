import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { TezosContractOperation } from "./ContractOperation"
import { mapModKtKeyToContract } from "./Moderate"

type TReportContractKey = "token_v3" | "token"

type TReportTokenParams = {
  contract: TReportContractKey
  tokenId: string
  reason: number
}

/**
 * Updates user profile
 */
export class TezosReportTokenOperation extends TezosContractOperation<TReportTokenParams> {
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
