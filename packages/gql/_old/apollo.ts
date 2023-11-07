import {
  ApolloClient,
  FieldFunctionOptions,
  InMemoryCache,
} from "@apollo/client"
import { config } from "@fxhash/config"

/**
 * Given a set of existing data, incoming data and pagination arguments,
 * merges incoming with existing **while ignoring incoming duplicates already
 * stored in existing**.
 */
export function cacheMergePaginatedField(
  existing: any[] = [],
  incoming: any[],
  { args }: FieldFunctionOptions<any>
): any[] {
  // shallow copy existing array
  const merged = [...existing]
  const { skip } = args || { skip: 0 }
  let j = 0
  mainLoop: for (let i = 0; i < incoming.length; ++i) {
    // we check for duplicates in the existing cache
    if (existing) {
      for (const item of existing) {
        // if there's  duplicate, we ignore the incoming one and continue
        if (incoming[i].__ref === item.__ref) {
          continue mainLoop
        }
      }
    }
    // add the incoming to the merge array
    merged[skip + j++] = incoming[i]
  }
  return merged
}

export const clientSideClient = new ApolloClient({
  uri: config.apis.main,
  cache: new InMemoryCache({
    typePolicies: {
      Article: {
        fields: {
          actions: {
            keyArgs: ["filters"],
            merge: cacheMergePaginatedField,
          },
        },
      },
      GenerativeToken: {
        fields: {
          actions: {
            keyArgs: ["filters"],
            merge: cacheMergePaginatedField,
          },
          activeListedObjkts: {
            keyArgs: ["filters", "sort"],
            merge: cacheMergePaginatedField,
          },
          objkts: {
            keyArgs: ["sort", "featureFilters", "filters"],
            merge: cacheMergePaginatedField,
          },
          underAuctionMintTickets: {
            keyArgs: [],
            merge: (_, incoming) => incoming,
          },
          mintTickets: {
            keyArgs: ["filters", "sort"],
            merge: cacheMergePaginatedField,
          },
        },
      },
      User: {
        fields: {
          generativeTokens: {
            keyArgs: false,
            merge: cacheMergePaginatedField,
          },
          objkts: {
            keyArgs: ["sort", "filters"],
            merge: cacheMergePaginatedField,
          },
          listings: {
            keyArgs: false,
            merge: cacheMergePaginatedField,
          },
          articles: {
            keyArgs: false,
            merge: cacheMergePaginatedField,
          },
          actions: {
            keyArgs: false,
            merge: cacheMergePaginatedField,
          },
          sales: {
            keyArgs: false,
            merge: cacheMergePaginatedField,
          },
        },
      },
      Listing: {
        keyFields: ["id", "version"],
      },
      Query: {
        fields: {
          generativeToken: {
            read(_, { args, toReference }) {
              if (!args) return null
              return toReference({
                __typename: "GenerativeToken",
                id: args.id,
              })
            },
          },
          generativeTokens: {
            keyArgs: ["sort", "filters"],
            merge: cacheMergePaginatedField,
          },
          articles: {
            keyArgs: ["sort", "filters"],
            merge: cacheMergePaginatedField,
          },
          listings: {
            keyArgs: ["sort", "filters"],
            merge: cacheMergePaginatedField,
          },
          users: {
            keyArgs: ["sort", "filters"],
            merge: cacheMergePaginatedField,
          },
          // mintTickets: {
          //   keyArgs: ["sort", "filters"],
          //   merge: cacheMergePaginatedField,
          // },
        },
      },
    },
  }),
})

export function createApolloClient(
  uri = config.apis.main,
  headers?: Record<string, any>
) : ApolloClient<any> {
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    ssrMode: true,
    ssrForceFetchDelay: 1000,
    headers,
  })
}

/**
 * The client to connect to the events graphql endpoint
 */
export const eventsClient = new ApolloClient({
  uri: `${config.apis.dashboard.backend}/graphql`,
  cache: new InMemoryCache(),
  // ssrMode: true,
  // ssrForceFetchDelay: 1000
})

export const createEventsClient = () =>
  new ApolloClient({
    uri: `${config.apis.dashboard.backend}/graphql`,
    cache: new InMemoryCache(),
  })
