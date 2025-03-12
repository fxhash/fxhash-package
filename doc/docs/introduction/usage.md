# Usage

## Installation

### Add the package to your app

::: code-group

```sh [npm]
npm install @fxhash/sdk
```

```sh [pnpm]
pnpm add @fxhash/sdk
```

```sh [yarn]
yarn add @fxhash/sdk
```

:::

### Configure fxhash environment variable

The SDK expects a fxhash environment variable to be defined in the runtime to expose the right config _automatically_ to the different modules. The SDK reads the following environment variables:

- `FXHASH_ENV`
- `NEXT_PUBLIC_FXHASH_ENV`
- `REACT_APP_FXHASH_ENV`
- `VITE_FXHASH_ENV`

Which support the following values:

- `prd`/`production`: Production APIs & mainnet contracts
- `dev`/`development`: Development APIs & testnet contracts

::: info
This behaviour is implemented by the [**`@fxhash/config`**](../../config/) package, **if you need an alternative** or want to learn more you can read its documentation.
:::

## General notes

The [**`@fxhash/sdk`**](../packages/sdk/) package is just a proxy exporting all the other packages of the SDK, which you can find in this documentation. Importing it will give you access to all the exports of the SDK packages.

If your bundler supports [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) (which it should if you are using modern solutions), then the only difference with importing all the packages individually when needed will be the size of the `node_modules` folder (as `@fxhash/sdk` will import all the fxhash packages). If you are not concerned with deep optimizations of your `node_modules` folder then this might be a suitable solution for you.

In practice, the following are equivalent feature-wise:

```ts
// using imports from specific packages
import { gqlClient } from "@fxhash/gql-client" // [!code --]
import { eip1193WalletSource } from "@fxhash/core" // [!code --]

// using imports from @fxhash/sdk only
import { gqlClient, eip1193WalletSource } from "@fxhash/sdk" // [!code ++]
```

However, as you can imagine, not having the mental burden of having to look from which package a feature should be imported greatly improves the developer experience.
