# Overview of sdk features

> [!NOTE]
> This page is not easily digestable, it's primarly meant as a general index of the features which you can use with the SDK.

- [**`@fxhash/sdk`**](../packages/sdk/): proxy exposing all the other packages so that you can import a single module into your app
- [**`@fxhash/core`**](../packages/core/)
  - user management
    - various wallet connection options
    - authentication against fxhash backend
    - crendentials management (auto inject JWT crendentials in graphql client)
  - storage abstractions (localStorage, in-memory)
- [**`@fxhash/client`**](../packages/client/): a clean declarative API to instanciate and connect properly SDK modules, in a cross-environment setting
  - simple unopiniated client
  - PlugnPlay client with pre-configured settings for fast integration
- [**`@fxhash/client-react`**](../packages/client-react/): wrapper around `@fxhash/client` exposing providers, components & hooks to integrate `@fxhash/client` in your react app in a breeze
- [**`@fxhash/config`**](../packages/config/): access fxhash constants on different environments (dev, testnet, etc...)
  - fxhash APIs
  - fxhash contracts
  - constants of interest
- [**`@fxhash/gql`**](../packages/gql/): fxhash unopiniated GraphQL bindings
  - typed using industry standard (can be used by your client of choice to get typed responses)
  - types for all the operations
  - common generic queries & mutations
- [**`@fxhash/gql-client`**](../packages/gql/): preconfigured GraphQL client to query fxhash API
- [**`@fxhash/errors`**](../packages/errors/): shared errors accross fxhash stack, implemented using a common pattern facilitating error management (see [Error management](../concepts/error-management) to learn more)
- [**`@fxhash/shared`**](../packages/shared/): blockchain-related utilities and patterns abstracting underlying blockchain for a shared interface
- [**`@fxhash/eth`**](../packages/eth/)
  - wallet manager
  - fxhash contract operations (typed with a simple API)
  - abi interfaces
  - common evm-related utilities
- [**`@fxhash/tez`**](../packages/tez/): tez-related utilities
  - wallet manager
  - fxhash contract operations (typed with a simple API)
  - common tez-related utilities
- [**`@fxhash/tez-utils`**](../packages/tez/): lightweight tezos utilities (initially extracted from `@fxhash/tez` for backend applications)
- [**`@fxhash/libraries`**](../packages/libraries/): repository of libraries (and their content) uploaded and made available on fxhash
- [**`@fxhash/utils`**](../packages/utils/): generic cross-environment utilities (not blockchain-related, rather general purpose)
- [**`@fxhash/utils-browser`**](../packages/utils-browser/): browser-only utilities (not blockchain-related, rather general purpose)
