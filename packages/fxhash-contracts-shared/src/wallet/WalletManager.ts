import { PromiseResult } from "../Result"
import { TContractOperation } from "./ContractOperation"

export class PendingSigningRequestError extends Error {
  name = "PendingSigningRequestError" as const
  message = "There is already a pending signing request"
}

export class UserRejectedError extends Error {
  name = "UserRejectedError" as const
  message = "User rejected the request"
}

export abstract class WalletManager {
  public address: string

  constructor(address: string) {
    this.address = address
  }

  abstract signMessage(
    message: string
  ): PromiseResult<string, PendingSigningRequestError | UserRejectedError>

  abstract sendTransaction<TParams>(
    operation: TContractOperation<TParams>,
    params: TParams
  ): PromiseResult<unknown, PendingSigningRequestError | UserRejectedError>

  // todo: add waitForTransaction abstract method
}
