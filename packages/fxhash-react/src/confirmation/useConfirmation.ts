import { useContext } from "react"
import { ConfirmationContext } from "./Confirmation"
import { invariant } from "@fxhash/contracts-shared"

/**
 * This hook allows to setup modal-confirmation synchronous flow for when user
 * input is required during the execution of some asynchronous tasks. This hook
 * doesn't provide any rendering logic, but provides the building block for
 * implementing a custom rendering logic.
 *
 * @remark A single confirmation modal is supported at one time, making
 * subsequent confirmation requests without user confirmation will automatically
 * invalidate the previous requests.
 */
export function useConfirmation() {
  const context = useContext(ConfirmationContext)
  invariant(
    context,
    "The Confirmation Context isn't available where useConfirmation was called"
  )
  return context
}
