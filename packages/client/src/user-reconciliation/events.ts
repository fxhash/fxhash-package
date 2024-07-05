import { UserReconciliationError } from "./errors.js"

export class UserReconciliationErrorEvent extends Event {
  constructor(public error: UserReconciliationError) {
    super("user-reconciliation-error")
  }
}

/**
 * Event emitted after a wallet/account was changed, and the reconciliation is
 * valid (wallets belong to account, etc...).
 */
export class ValidUserChanged extends Event {
  constructor() {
    super("valid-user-changed")
  }
}

export type UserReconciliationEventsTypemap = {
  "user-reconciliation-error": UserReconciliationErrorEvent
  "valid-user-changed": ValidUserChanged
}
