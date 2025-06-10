import { isRichErrorMessages } from "../../utils/rich-error.js"
import { IRichErrorMessages, RichError, RichErrorUnion } from "../common.js"

export class WalletAlreadyOtherAccountMainWalletError extends RichError {
  static readonly errorType = "WalletAlreadyOtherAccountMainWalletError"
  name = "WalletAlreadyOtherAccountMainWalletError" as const
  messages = {
    dev: "Wallet is already the main wallet of another account.",
    user: "This wallet is already registered as the main wallet for another account. To link this wallet to your current account, you need to delete the account associated with this wallet first. Please log in to the other account and proceed to delete the account from the profile menu. After this, you can link the wallet to this account.",
  }
}

export class WalletAlreadyLinkedError extends RichError {
  static readonly errorType = "WalletAlreadyLinkedError"
  name = "WalletAlreadyLinkedError" as const
  messages = {
    dev: "Wallet is already linked to another account (not as the main wallet)",
    user: "This wallet is already associated to another account. You must first connect to your other account and unlink this wallet from it.",
  }
}

export class AccountAlreadyLinkedOnNetworkError extends RichError {
  name = "AccountAlreadyLinkedOnNetworkError" as const
  constructor(messages: IRichErrorMessages)
  constructor(network: string)
  constructor(par: IRichErrorMessages | string) {
    super(
      isRichErrorMessages(par)
        ? par
        : {
            dev: `Account already linked to a wallet on ${par.toLowerCase()}. There can only be one wallet per network linked to each account.`,
            user: `Your account is already linked to a wallet on ${par.toLowerCase()}`,
          }
    )
  }
}

export const LinkWalletErrors: (
  | typeof WalletAlreadyOtherAccountMainWalletError
  | typeof WalletAlreadyLinkedError
  | typeof AccountAlreadyLinkedOnNetworkError
)[] = [
  WalletAlreadyOtherAccountMainWalletError,
  WalletAlreadyLinkedError,
  AccountAlreadyLinkedOnNetworkError,
]
export type LinkWalletError = RichErrorUnion<typeof LinkWalletErrors>

export class WalletNotLinkedToAccountError extends RichError {
  name = "WalletNotLinkedToAccountError" as const
  messages = {
    dev: "Wallet cannot be unlinked because it's not linked to the account currently authenticated",
    user: "The wallet cannot be unlinked because it isn't linked to your account.",
  }
}

export class MainWalletCannotBeUnlinkedError extends RichError {
  name = "MainWalletCannotBeUnlinkedError" as const
  messages = {
    dev: "The main wallet of an account cannot be unlinked from the account.",
    user: "This wallet is the main one associated with your account, as such it cannot be unlinked.",
  }
}

export const UnlinkWalletErrors: (
  | typeof WalletNotLinkedToAccountError
  | typeof MainWalletCannotBeUnlinkedError
)[] = [WalletNotLinkedToAccountError, MainWalletCannotBeUnlinkedError]
export type UnlinkWalletError = RichErrorUnion<typeof UnlinkWalletErrors>
