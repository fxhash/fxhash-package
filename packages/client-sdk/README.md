# `@fxhash/client-sdk`

A set of low-to-medium-level modules for building applications with fxhash.

> [!CAUTION]
> If you are building a 3rd party application on top of fxhash, we recommended using `@fxhash/client-plugnplay` (or its React counterpart `@fxhash/client-plugnplay-react`), which has been designed for a seamless integration into applications. They are build on top of this package, which is more suited if you really need low-level granular control.

## Installation

```sh
pnpm add @fxhash/client-sdk
```

```ts
import { createClient } from "@fxhash/client-sdk"
const fxClient = createClient(...)
```

## Design principles

This package

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
