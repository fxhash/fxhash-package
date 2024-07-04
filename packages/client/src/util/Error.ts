import { BlockchainType } from "@fxhash/shared"

export class GraphQLError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "GraphQLError"
  }
}

export class UnexpectedError extends Error {
  constructor() {
    super("Unexpected error")
    this.name = "UnexpectedError"
  }
}

export class SignMessageError extends Error {
  constructor() {
    super("Sign message error")
    this.name = "SignMessageError"
  }
}

export class WalletDoesntBelongToUserError extends Error {
  chain: BlockchainType
  constructor(chain: BlockchainType) {
    super("Wallet doesn't belong to user")
    this.name = "WalletDoesntBelongToUserError"
    this.chain = chain
  }
}

export class WrongWalletActivatedError extends Error {
  chain: BlockchainType
  constructor(chain: BlockchainType) {
    super("Activated Wallet does not belong to user.")
    this.name = "MultipleWalletsActivatedError"
    this.chain = chain
  }
}

export class ClientAuthenticationError extends Error {
  constructor() {
    super("Client authentication error")
    this.name = "ClientAuthenticationError"
  }
}
