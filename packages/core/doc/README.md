# `@fxhash/core`

A set of low level modules focused on **user wallets and accounts**, designed using an event-driven approach and a modular architecture, allowing various kinds of wallet/account sources to be connected together to provide tailored experiences to users.

::: warning
This package is quite low level. We recommend looking into [**`@fxhash/client`**](../../client/doc/) or [**`@fxhash/client-react`**](../../client-react/doc/) first and only look into this package if these packages don't fit your use-case.
:::

## Contents

- [Drivers](./drivers.md)
- [User sources](./user-sources/)
  - [Wallets](./user-sources/wallets/)
    - [Window](./user-sources/wallets/window.md)
    - [Private Key](./user-sources/wallets/private-key.md)
    - [Web3Auth](./user-sources/wallets/web3auth.md)
  - [Accounts](./user-sources/accounts.md)
  - [Multiple sources](./user-sources/multiple-sources.md)

## Installation

::: code-group

```sh [npm]
npm install @fxhash/core
```

```sh [pnpm]
pnpm add @fxhash/core
```

```sh [yarn]
yarn add @fxhash/core
```

:::

::: tip Alternative
This package is entirely exposed by [**`@fxhash/sdk`**](../../sdk/); you don't need to import it if you have already imported `@fxhash/sdk`
:::

## Design principles

This package was designed following some key principles:

- **Modularity**: There shouldn't be a rigid monolith of features but rather a collection of modules which can be connected together in various ways to support various kinds of scenarios. In practice each application has different requirements for their users, which they should be able to implement with this package if not supported by the higher level abstraction of the SDK.
- **Extensability**: It should be straightforward to implement new wallet/account sources without having to change the surface APIs consumed by higher level modules. When a new user/account source is introduced in the package applications should be able to benefit from it without having to change their implementation.
- **Adaptability**: When using this package, applications should be able to connect their existing stack without having to change their implementation. For instance if an application has already implemented its own wallet support solution, this package should hook into the existing implementation without having to alter the app wallet implementation.
- **Separation of concerns**: By having each module strictly implementing its features in isolation, and by decoupling such implementation from the overall flow of data between modules, it should provide long-term robustness as modules can be tested and improved without impacting others or the overall cohesiveness.
- **Framework-agnosticism**: Not only should this package be framework-agnostic, but also it should be implemented such that all the opiniated frameworks out there can easily hook into the data flows coming from this package.

## Learn more about this package

- [**Drivers**](./drivers.md): Some utility modules used by this package, mainly for handling and persisting credentials.
  - GraphQL Wrapper
  - Storage drivers
  - Credential drivers
- [**User sources**](./user-sources/): Learn about user sources (wallet/account sources) and how to implement various scenarios
  - Wallet sources
  - Account sources
  - State reconciliation
  - Multiple user sources
- **Examples**: Some practical examples

fxhash core doc

- index

  - intro
    - overview of different modules
    - limitations warning
  - installation
  - design principles
  - list of other pages

- User sources

  - Wallets
  - Accounts
    - How to link multiple wallets to the same account
  - Multiple sources

- Examples ?
