import {
  AccountUpdatedEventData,
  UserReconciliationError,
  WalletChangedEvent,
  WalletConnectedButNoAccountAuthenticatedError,
} from "@fxhash/client-sdk"
import { EventEmitter } from "@fxhash/utils"

export type CleanUserReconciliationError = Exclude<
  UserReconciliationError,
  WalletConnectedButNoAccountAuthenticatedError
>

type ClientBasicEventsMap = {
  "user-reconciliation-error": CleanUserReconciliationError
  "valid-user-changed": undefined
  "wallet-changed": WalletChangedEvent
  "account-updated": AccountUpdatedEventData
}

export class ClientBasicEventTarget extends EventEmitter<ClientBasicEventsMap> {}
