import { EventEmitter } from "@fxhash/utils"
import { GetSingleUserAccountResult } from "./index.js"

export interface AccountUpdatedEventData {
  account: GetSingleUserAccountResult | null
}

export type AuthenticatorEventsMap = {
  "account-updated": AccountUpdatedEventData
}

export class AuthenticatorEventEmitter extends EventEmitter<AuthenticatorEventsMap> {}
