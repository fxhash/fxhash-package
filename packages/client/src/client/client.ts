import { gqlClient as defaultClient } from "@fxhash/gql-client"

type FxhashClientOptions = {
  gqlClient: typeof defaultClient
}

const defaultOptions: FxhashClientOptions = {
  gqlClient: defaultClient,
}

export class FxhashClient {
  private gqlClient: typeof defaultClient
  constructor(options: FxhashClientOptions = defaultOptions) {
    this.gqlClient = options.gqlClient
  }
}
