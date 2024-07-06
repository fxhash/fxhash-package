import { TypedEventTarget } from "@fxhash/utils"
import { GetSingleUserAccountResult } from "./index.js"

export interface AccountUpdatedEventData {
  account: GetSingleUserAccountResult | null
}

export class AccountUpdatedEvent extends Event {
  constructor(public data: AccountUpdatedEventData) {
    super("account-updated")
  }
}

export type AuthenticatorEventsMap = {
  "account-updated": AccountUpdatedEvent
}

export class AuthenticatorEventTarget extends TypedEventTarget<AuthenticatorEventsMap> {}
