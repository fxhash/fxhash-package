import { AccountUpdatedEventData, WalletChangedEvent } from "@fxhash/client-sdk"
import { EventEmitter } from "@fxhash/utils"

type ClientPlugnPlayEventsMap = {
  "valid-user-changed": undefined
  "wallet-changed": WalletChangedEvent
  "account-updated": AccountUpdatedEventData
}

export class ClientPlugnPlayEventEmitter extends EventEmitter<ClientPlugnPlayEventsMap> {}
