# FXHASH Hasura GQL client (Zeus)

## How to use

Make a query

```ts
import { typedGql } from "./zeus/typedDocumentNode"
import { $ } from "./zeus"
import { useMutation } from "@apollo/client"

const myMutation = typedGql("mutation")({
  cardById: [{ cardId: $("cardId", "String!") }, { name: true }],
})

const Main = () => {
  const [mutate] = useMutation(myMutation)
  // call it somehow...
}
```

Typed models

```ts
import { ModelTypes } from "zeus"
type Account = ModelTypes["Account"] //<- this is not created by default
```

Queries are typed

```ts
const data = await typedGql("query")({
  Account: [
    // here filters
    {},
    {
      id: true,
      username: true,
      // autocomplete works here
    },
  ],
})
```
