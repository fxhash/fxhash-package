export * from "@fxhash/client"
export * from "@fxhash/config"
export * from "@fxhash/core"
export * from "@fxhash/eth"
export * from "@fxhash/gql"
export * from "@fxhash/shared"
export * from "@fxhash/tez"
export * from "@fxhash/utils"

/**
 * TODO
 * --------------------
 * These named exports are used to resolve duplicate conflicts between packages
 * (some packages have exports with a same name, or often the exact same type/
 * value is exported from different sources).
 * There shouldn't be any duplicates in our packages at all, so this is only
 * a temporary solution until this gets fixed accross the stack.
 */
export {
  type Whitelist,
  type TOnchfsWriteOperationParams,
  EWalletOperations,
} from "@fxhash/eth"
export {
  type Account,
  type Article,
  type Action,
  type Collaboration,
  type EventOnboarding,
  type Listing,
  type Objkt,
  type Offer,
  type OnboardingComponent,
  type Redeemable,
  type Redemption,
  type Report,
  type Split,
  type User,
  EWalletOperatorState,
} from "@fxhash/gql"
export { type CaptureSettings, type IAddress } from "@fxhash/shared"
export {
  type IEquatableError,
  type PromiseResult,
  type Result,
  Failure,
  InvariantError,
  Success,
  assertFailure,
  assertSuccess,
  failure,
  invariant,
  success,
} from "@fxhash/utils"
