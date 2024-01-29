import {
  ContractAbstraction,
  TransactionWalletOperation,
  Wallet,
} from "@taquito/taquito"
import { FxhashContracts } from "../../types/Contracts"
import { stringToByteString } from "../../utils/convert"
import { BlockchainType, TezosContractOperation } from "./ContractOperation"

export type TUpdateProfileParams = {
  metadata: string
  name: string
}

/**
 * Updates user profile
 */
export class TezosUpdateProfileOperation extends TezosContractOperation<TUpdateProfileParams> {
  userRegister: ContractAbstraction<Wallet> | null = null

  async prepare() {
    this.userRegister = await this.manager.getContract(FxhashContracts.REGISTER)
  }

  async call(): Promise<TransactionWalletOperation> {
    return this.userRegister!.methodsObject.update_profile({
      metadata: stringToByteString(this.params.metadata),
      name: stringToByteString(this.params.name),
    }).send()
  }

  success(): string {
    return `Your profile was updated ${this.params.name}`
  }
}
