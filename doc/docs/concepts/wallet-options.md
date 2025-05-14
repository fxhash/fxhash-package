# Wallet options supported by the SDK

The fxhash SDK supports the following kinds of wallets:

- _browser extensions_ ([EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) on EVM and [tzip10](https://tzip.tezosagora.org/proposal/tzip-10) on tezos)
- private key (in-memory wallet instanciated using a raw private key—mainly useful in the context of secure backend applications or personal projects)
- fxhash iframe embedded (a wallet embedded in a secure iframe, using [web3auth](https://web3auth.io/) for constructing the private keys derived from authentication using email or social login)
  - email (with [One-time password OTP](https://en.wikipedia.org/wiki/One-time_password) verificaiton)
  - google
  - discord
  - github

These solutions are implemented by [`@fxhash/core`](../packages/core/), you can find more details in the package documentation.
