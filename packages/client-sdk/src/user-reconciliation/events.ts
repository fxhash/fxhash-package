import { EventEmitter } from "@fxhash/utils"
import { UserReconciliationError } from "./errors.js"

export type UserReconciliationEventsTypemap = {
  "user-reconciliation-error": UserReconciliationError
  "valid-user-changed": undefined
}

export class UserReconciliationEventEmitter extends EventEmitter<UserReconciliationEventsTypemap> {}
