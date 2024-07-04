import { gqlClient as defaultClient } from "@fxhash/gql-client"
import { invariant } from "@fxhash/shared"
import { Storage } from "@/util/Storage/Storage.js"
import { GraphqlWrapper, IGraphqlWrapper } from "./GraphqlWrapper.js"
import { Authenticator } from "@/auth/Authenticator.js"
import { AuthenticationStrategy } from "@/auth/strategies/interfaces.js"

type FxhashClientOptions = {
  gqlClient?: typeof defaultClient
  storage?: Storage
  authStrategy?: AuthenticationStrategy
}

const defaultOptions: Required<
  Pick<FxhashClientOptions, "gqlClient" | "storage" | "authStrategy">
> = {
  gqlClient: defaultClient,
  storage: new Storage(),
  authStrategy: AuthenticationStrategy.COOKIE,
}

export class FxhashClient {
  public gql: IGraphqlWrapper
  public auth: Authenticator
  public initialized = false
  private storage: Storage

  constructor(_options?: FxhashClientOptions) {
    const options = { ...defaultOptions, ..._options }
    this.gql = new GraphqlWrapper()
    this.storage = options.storage
    this.auth = new Authenticator({
      gqlWrapper: this.gql,
      storage: this.storage,
      authStrategy: options.authStrategy,
    })
  }

  async init() {
    invariant(!this.initialized, "Can only initialize once")
    this.initialized = true
    await this.auth.init()
  }
}
