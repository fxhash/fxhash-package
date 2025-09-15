# `@fxhash/gql2`

> fxhash unopiniated typed GraphQL client & common queries ready for consumption.

# Gettings started

Install the package

```sh
$ pnpm add @fxhash/gql2
```

Run a query with `@apollo/client`:

```ts
import { useQuery } from "@apollo/client"
import { Qu_getProjects } from "@fxhash/gql2"

interface Props {}
export function PresentationHeader({}: Props) {
  const { data } = useQuery(Qu_getProjects, {
    variables: {
      where: {
        //... typed !
      },
    },
  })

  // typed !
  const projects = data?.Project

  return ...
}
```

When you update the graphql schema (so the Hasura API), run:

```sh
$ npm run codegen
```

It will update the `schema.graphql` and sync the typings from it.

# This package explained

This package uses `@graphql-codegen` for generating the GraphQL types automatically based on the schema. The package is targetting `http://localhost:8888/v1/graphql` for inspecting the schema, which is the URL under which the main hasura instance is exposed locally using the default config on the monorepo. The docgen is authenticated as a user, to ensure that no sensitive schema data leaks through the package.

`@graphql-codegen` doesn't generate typings for making queries, instead it:

- generates schema typings (models, enums, resolvers, mutations...)
- generates typings for GraphQL queries written manually (and exposed by the package)

As such, the directory `src/gql/` hosts the different queries, which are exposed for consuming.

```
.
├── _old                   -- content of previous "@fxhash/gql" package
├── src/
│   ├── generated          -- auto-generated; types, utils,... etc
│   └── gql/               -- pre-made graph ql operations
│       ├── queries
│       ├── mutations
│       └── subscriptions
├── codegen.ts             -- @graphql-codegen config
└── graphql.schema.json    -- auto-generated
```

## How to run generation

The code generation is divided in 2 steps, designed to optimise and improve the robustness of the process:

- `codegen:schema`: generates a global `schema.graphql` file from the hasura instance running at `http://localhost:8888`
- `codegen:typescript`: generates the TS typings and query typings from the graphql schema & the queries in `src/gql`

**Only tun `pnpm run codegen:schema` when you update the Hasura API.**

> **Note**
> The watch mode on dev is only running `codegen:typscript`, but it's watching for changes on both the `schema.graphql` file and the `src/gql` folder.

## How to write a new GraphQL query

- add the query to `./src/gql/queries` (or to the `mutations` / `subscriptions`)
- encapsulate the query with the `graphql()` function from `./src/generated/gql.ts`

  ```ts
  import { graphql } from "@/generated"

  export const Qu_getProjects = graphql(`
    query GetProjects($where: Project_bool_exp = {}) {
      Project(where: $where) {
        id
        pricing
        description
        state
        storage
      }
    }
  `)
  ```

- run `$ npm run generate` (**note**: this requires the GraphQL api to be running), which will generate the types for the query.

## A note on type safety

`@graphql-codegen` generates query typings based on the queries, which ensures proper typing. Instead of words, example:

```ts
import { useQuery } from "@apollo/client"
import { Qu_getProjects } from "@fxhash/gql2"

// Qu_getProjects is defined as:
export const Qu_getProjects = graphql(`
  query GetProjects($where: Project_bool_exp = {}) {
    Project(where: $where) {
      id
      pricing
      description
      state
      storage
    }
  }
`)

// example when using useQuery
const { data } = useQuery(Qu_getProjects)
const projects = data?.Project
// projects is of type:
{
  __typename?: "Project" | undefined;
  id: any;
  pricing?: any;
  description?: string | null | undefined;
  state: any;
  storage?: any;
}[] | undefined

// even though the Project entity type is:
/** columns and relationships of "Project" */
export type Project = {
  __typename?: 'Project';
  /** An object relationship */
  author: Account;
  authorId: Scalars['uuid']['output'];
  blockchain?: Maybe<Scalars['BlockchainNetwork']['output']>;
  /** An object relationship */
  curator?: Maybe<Account>;
  curatorId?: Maybe<Scalars['uuid']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  pricing?: Maybe<Scalars['jsonb']['output']>;
  /** An array relationship */
  projectMedias: Array<ProjectMedia>;
  releaseAt?: Maybe<Scalars['timestamp']['output']>;
  state: Scalars['ProjectState']['output'];
  storage?: Maybe<Scalars['Storage']['output']>;
  title: Scalars['String']['output'];
};
```

As seen in the example, only the properties defined in the query are exposed by typescript.

## Custom scalars

To define the input/output type of scalars, a setting can be defined in the `codegen.ts` config file.

```ts
const config: CodegenConfig = {
  ...,
  generates: {
    "./src/generated/": {
      config: {
        scalars: {
          // custom scalar field
          uuid: {
            input: "string",
            output: "string",
          },
        },
      },
    },
  },
}
```

This will instruct the code generator to type the `uuid` scalar properly:

```ts
export type Scalars = {
  ...
  uuid: { input: string; output: string; }
};
```

To learn more about custom GraphQL scalars: [The complete GraphQL Scalar Guide](https://the-guild.dev/blog/the-complete-graphql-scalar-guide)

---

# TODOs

## Admin version of the package

Right now, and because this package is public, its connection with the GraphQL endpoint has been user-authenticated so that it only shows the schema available to regular users. We should also have a package which handles the admin operations, however we don't want such operations to be exposed by the main GraphQL API.
