# `@fxhash/client-plugnplay`

A plug'n'play client interface to build applications with fxhash. This packages handles everything related to wallets & authentication and provides very high level functions for building applications on top of fxhash. This client is built on top of `@fxhash/client-basic`

## Usage

Installation

```sh
pnpm add @fxhash/client-plugnplay
```

```ts
// by default, nothing will be enabled
const client = clientBasic({
  metadata: {...}
})

// different wallet options are opt-in, in this case we add window &
const client = clientPlugnPlay({
  metadata: {...},
  wallets: {
    window: {...},  // must provide appropriate config
    web3auth: true, // email/oauth wallets
  },
})

const client = clientPlugnPlay() // with everything enabled

const client = clientPlugnPlay({
  wallets: {
    window: {
      evm: {
        config: wagmiConfig, // custom wagmi config
      },
      tezos: true, // default tezos config
    },
    web3auth: true, // email/oauth wallets
  },
})
```
