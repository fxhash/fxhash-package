# FXHASH Hasura GQL client

This client has been generated based on the latest version of the GraphQL schema of Hasura.
It has been generated using [GenQL](https://genql.dev/docs). The client is fully typed and supports subscriptions, and does not have any package dependency.

It also allows for typechecking, auto-complete within the IDE.

## Table of Contents

- [Using the client](#using-the-client)
    - [Importing the client](#importing-the-client)
    - [Passing a custom `fetch` function](#passing-a-custom-fetch-function)
    - [Changing headers at runtime](#changing-headers-at-runtime)
    - [Using a custom fetcher](#using-a-custom-fetcher)
- [Batching queries](#batching-queries)
- [Fetch all fields on a type](#fetch-all-fields-on-a-type)
- [Subscriptions](#subscriptions)
    - [Using `graphql-ws`](#using-graphql-ws)
- [Examples](#examples)
- [Current limitations](#current-limitations)
    - [Enums](#enums)
- [Resources](#resources)

## Using the client
### Importing the client
The generated files expose a function createClient, this creates a client you can use to send requests

```typescript
import { createClient } from "./generated";

const client = createClient({
  url: "https://countries.trevorblades.com",
  headers: {
    "Some-Header": "hello",
  },
});

client
  .query({
    countries: {
      __args: {
        state: "USA",
      },
      name: true,
      code: true,
    },
  })
  .then(console.log);
```

### Passing a custom `fetch` function
It is possible to pass a custom fetch function to the client to use a different HTTP library or to add middleware
```typescript
import { createClient, } from './generated_dir'
import { fetch } from 'undici'

const client = createClient({
    url: '<http://your-api>',
		fetch,
    headers: {
        Authorization: 'Bearer xxx',
    },
})
```

### Changing headers at runtime
You can pass a function to the headers field to pull the headers at query time, this way you can for example take the auth token from localStorage
```typescript
import { createClient } from './generated_dir'

const client = createClient({
    url: '<http://your-api>',
    headers: () => ({
        Authorization: localStorage.get('authToken'),
    }),
})
```

### Using a custom fetcher
You can use your own http fetcher function, must be of type `(operation: {query, variables}) => Promise<{data, errors}>`
```typescript
import { createClient } from './generated_dir'
const client = createClient({
    fetcher: (operation) => {
        return fetch('<http://your-api>', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(operation),
        }).then((response) => response.json())
    },
})
```

## Batching queries
You can minimize network requests and server load fetching queries that are near in time using batching.
```typescript
import { createClient } from './generated'

const client1 = createClient({
    batch: true, // use defaults batch options
})

const client2 = createClient({
    batch: {
        batchInterval: 100, // ms
        maxBatchSize: 10,
    },
})

// these queries will trigger only one network request
await Promise.all([
    client1.query({
        user: {
            age: true,
        },
    }),
    client1.query({
        user: {
            id: true,
        },
    }),
    client1.query({
        user: {
            name: true,
        },
    }),
])
```

## Fetch all fields on a type
Genql can fetch all scalar fields of a type using `__scalar: true`
```typescript
import { createClient, everything } from './generated'
const client = createClient()

client
    .query({
        countries: {
            __scalar: true,
            nestedField: {
                // fetch all scalar fields
                __scalar: true,
            },
        },
    })
    .then(console.log) // will fetch all fields
```

## Subscriptions
You can use generateSubscriptionOp to generate a variables and query variables to be used with a third party client like graphql-ws.
### Using `graphql-ws`
Use the `generateSubscriptionOp` to generate the payload to pass to `graphql-ws`
```typescript
import { generateSubscriptionOp } from "./generated";
import { createClient as createWsClient } from "graphql-ws";

const client = createWsClient({
  url: "ws://hey.there:4000/graphql",
});

let { query, variables } = generateSubscriptionOp({
  onCommentAdded: {
    __args: { filter: "ciao" },
    text: true,
    date: true,
    anotherField: jtrue,
  },
});

client.subscribe(
  { query, variables },
  {
    next: (data) => console.log(data),
    error: console.error,
    complete: () => console.log('finished'),
  }
);
```

## Examples
You will find some examples in the [test](test/client.test.ts) file.

## Current limitations
### Enums
As of now, it seems the client is not generated the enums correctly, so you have to manually add them if you want to use them in the queries.
It is mitigated as they are anyway already defined in the `fx` packages.
However, it seems `genql` is supposed to handle them natively: https://genql.dev/docs/usage/enums

To be investigated.

---
## Resources
- [GenQL Docs](https://genql.dev/docs)