# `@fxhash/gql-client`

The gql-client provides a simple GraphQL client which can be used with `@fxhash/gql` for running typed operations. The client works on front-ends and back-ends, although using a different package for front-end application would be best as this one doesn't come with the best-in-class toolkit for front-end applications.

This package wraps [`@urql/core`](https://www.npmjs.com/package/@urql/core) by providing some default config working well with our stack.

> **Note**
>
> - The client will automatically add the `x-hasura-admin-secret` http header if the env variable `HASURA_ADMIN_SECRET` is defined.
> - The client will point to the hasura api scoped to the environment in which it's executed, based on `FXHASH_ENV` env variable (it uses the generic `@fxhash/config` package for such purpose)

## Usage

Install

```sh
pnpm add -E @fxhash/gql-client
```

Usage

```ts
import { gqlClient } from "@fxhash/gql-client"

// making a query
const { data, error } = await gqlClient.query(...)
```

## Client instanciation

If needed, instanciating a client with custom options is available. The client will not automatically add the `x-hasura-admin-secret` header, it must be passed with the `hasuraAdminSecret` option.

```ts
import { createGqlClient } from "@fxhash/gql-client"

const client = createGqlClient({
  //... custom options here
})
```
