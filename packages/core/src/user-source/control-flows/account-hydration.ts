import { GetSingleUserAccountResult, IUserSource } from "../_index"
import { intialization } from "@fxhash/utils"

export interface IWithAccountHydration<Source extends IUserSource> {
  source: Source
  account: GetSingleUserAccountResult
}

/**
 * In the context of SSR, we would want the connected account to be exposed by
 * the client using the authenticated user on the backend, as soon as the client
 * is instanciated. Without this module, the client would have to make a request
 * to the backend to get the user currently authenticated, meaning that user
 * would not be known at FCP.
 *
 * This module allows to define an initial account value (potentially passed by
 * the server to the client) so that such value is exposed until modules are
 * properly initialized (upon which the final value is defined).
 */
export function withAccountHydration<Source extends IUserSource>({
  source,
  account,
}: IWithAccountHydration<Source>): Source {
  const init = intialization()
  return {
    ...source,
    getAccount() {
      if (!init.finished) return account
      return source.getAccount()
    },
    init: async () => {
      init.start()
      await source.init()
      init.finish()
      // forcefully broadcast a change in the account to ensure consumers have
      // the proper value coming from the source
      source.emitter.emit("user-changed")
    },
  }
}
