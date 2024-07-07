import {
  AccountUpdatedEventData,
  UserReconciliationError,
  WalletChangedEvent,
} from "@fxhash/client-sdk"
import { EventEmitter } from "@fxhash/utils"

type ClientBasicEventsMap = {
  "user-reconciliation-error": UserReconciliationError
  "valid-user-changed": undefined
  "wallet-changed": WalletChangedEvent
  "account-updated": AccountUpdatedEventData
}

export class ClientBasicEventTarget extends EventEmitter<ClientBasicEventsMap> {}
