# `@fxhash/client-sdk`

A set of low-to-medium-level modules for building applications with fxhash.

> [!CAUTION]
> If you are building a 3rd party application on top of fxhash, we recommended using `@fxhash/client-plugnplay` (or its React counterpart `@fxhash/client-plugnplay-react`), which have been designed for a simple and seamless integration into applications. They are build on top of this package, which is more suited if you really need low-level granular control.

## Installation

```sh
pnpm add @fxhash/client-sdk
```

```ts
import { createClient } from "@fxhash/client-sdk"
const fxClient = createClient(...)
```

## Design principles

This package uses 2 different approaches:

- low-level functional modules which can be chained in various ways to achieve a wide range of behaviours
- a declarative instanciation function (`createClient`) which lets developers instanciate and link the modules they need by providing a config object

## Usage

Installation

## Examples

### Using the `createClient` utility

The `createClient` function provides the creation of a "client" using a declarative config object.

### All the sources support the same interface

```ts
import {} from "@fxhash/client-sdk"

const source = windowWallets(...)

// hook on events
source.emitter.on("user-changed", () => { ... })
source.emitter.on("wallets-changed", () => { ... })
source.emitter.on("account-changed", () => { ... })
```

### Simple window wallets without account

```ts
const source = windowWallets({
  evm: {
    config: "...",
  },
  tezos: {
    config: "...",
  },
})
// source.emitter.on("wallets-changed") ...
// source.getWalletManagers() ...
```

### Backend private key wallet

```ts
const source = privateKeyWallets({
  evm: "0x...",
})
const managers = source.getWalletManagers()
```

### Wallets and account

```ts
const source = walletsAndAccount({
  wallets: windowWallets({
    evm: wagmiConfig,
    tezos: beaconConfig,
  }),
  account: authWallets(accountSourceOptions),
})
// source.on("user-changed", () => { /* handler */ }) ...
```

### Declarative API

```ts
import { createClient } from "@fxhash/client-sdk"

const client = createClient({
  metadata: {
    name: "...",
    description: "...",
    url: "...",
    icon: "...",
  },
  wallets: {
    window: {
      evm: {
        wagmiConfig: "...",
      },
    },
    web3auth: true,
  },
  authentication: true,
})
```

## TEMP

### Run the mock

Run `core/hasura`

```sh
fxrepo apps:run core/hasura
```

Run social wallet in `core/applications/fxhash-wallet`

```sh
pnpm dev
```

Run mock client plunplay in `applications/utils/mock-client-plugnplay-react`

```sh
FXHASH_ENV=local NEXT_PUBLIC_FXHASH_ENV=local pnpm dev
```

Folders of interest:

- `packages/public/fxhash-package/packages/client-sdk`
- `packages/public/fxhash-package/packages/client-plugnplay`
- `packages/public/fxhash-package/packages/client-plugnplay-react`

## TODO

- [ ] writing tests
  - [ ] test operations
- [ ] write documentation about packages
- [ ] start integrating into website-v2 to start testing integration
- [ ] mock test sending operations with wallets
- [ ] loading states - right now there is now way to have some "loading"
      state from the user sources. we'd want to know when some authentication is
      happening, etc...
