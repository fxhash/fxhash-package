# `@fxhash/client-sdk`

A set of low-level modules to build clients for interracting applications with fxhash.

> [!CAUTION]
> If you are building a 3rd party application on top of fxhash, we recommended using `@fxhash/client-basic`, `@fxhash/client-plugnplay` (or their React counterpart `@fxhash/client-basic-react`, `@fxhash/client-plugnplay-react`), which have been designed for a seamless integration into applications. They are build on top of this package, which is more suited if you really need low-level granular control.

## Design principles

## Usage

Installation

```sh
pnpm add @fxhash/client @fxhash/config
```

# some title

##

For backend applications, the `WalletOrchestrator` can simply be used with a private key connector. This may be arguably a bit overkill but can also ensure some cohesiveness accross a stack.

```ts
import {
  WalletOrchestrator,
  PrivateKeyWalletsConnector,
} from "@fxhash/client-sdk"

const wallets = new WalletsOrchestrator({
  connectors: [
    new PrivateKeyWalletsConnector({
      TEZOS: {
        privateKey: "...",
      },
    }),
  ],
})

const tezosWalletManager = wallets.managers.TEZOS!.manager!
tezosWalletManager.sendTransaction(/*...*/)
```
