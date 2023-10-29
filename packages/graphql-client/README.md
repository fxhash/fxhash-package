# `@fxhash/gql-client`

> fxhash unopiniated typed GraphQL client & common queries ready for consumption.

# Gettings started

Install the package

```sh
$ pnpm add @fxhash/gql
```

TODO...

# This package explained

This package uses `@graphql-codegen` for generating the GraphQL types automatically based on the schema. The package is targetting `http://localhost:8888/v1/graphql` for inspecting the schema, which is the URL under which the main hasura instance is exposed locally using the default config on the monorepo. The docgen is authenticated as a user, to ensure that no sensitive schema data leaks through the package.

`@graphql-codegen` doesn't generate typings for making queries, instead it:

- generates schema typings (models, enums, resolvers, mutations...)
- generates typed queries from the GraphQL code

As such, the directory [`src/gql/`](./src/gql/) hosts the different queries, which are exposed.

```
.
├── src/
│   ├── generated          -- auto-generated; types, utils,... etc
│   └── gql/               -- pre-made graph ql operations
│       ├── queries
│       ├── mutations
│       └── subscriptions
├── codegen.ts             -- @graphql-codegen config
└── graphql.schema.json    -- auto-generated
```

## TODOs

### Admin version of the package

Right now, and because this package is public, its connection with the GraphQL endpoint has been user-authenticated so that it only shows the schema available to regular users. We should also have a package which handles the admin operations, however we don't want such operations to be exposed by the main GraphQL API.
