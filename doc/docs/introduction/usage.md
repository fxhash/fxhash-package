# Usage

The package [**`@fxhash/sdk`**](../packages/sdk/) is just a proxy which exports all the other packages of the SDK, which you can find in this documentation.

If your bundler supports [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) (which it should if you are using modern solutions), then simply importing `@fxhash/sdk` will give you access to all the exports of the SDK packages. If you are not concerned with deep optimizations of your `node_modules` folder then this might be a suitable solution for you.

In practice, the following are equivalent feature-wise:

```ts
// using imports from specific packages
import { gqlClient } from "@fxhash/gql-client" // [!code --]
import { eip1193WalletSource } from "@fxhash/core" // [!code --]

// using imports from @fxhash/sdk only
import { gqlClient, eip1193WalletSource } from "@fxhash/sdk" // [!code ++]
```

However, as you can imagine, not having the mental burden of having to look from which package a feature should be imported greatly improves the developer experience.
