import { TypedEventTarget } from "@fxhash/utils"

export class AccountUpdatedEvent extends Event {
  constructor() {
    super("account-updated")
  }
}

export type AuthenticatorEventsMap = {
  "account-updated": AccountUpdatedEvent
}

export class AuthenticatorEventTarget extends TypedEventTarget<AuthenticatorEventsMap> {}
