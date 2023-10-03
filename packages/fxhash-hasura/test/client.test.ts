import {createClient, generateSubscriptionOp} from "../src";
import { createClient as createWsClient } from "graphql-ws";
import { WebSocket } from "ws";

describe("FXHASH Hasura GQL tests", () => {
    /**
     * As described in the readme, we can to create a client with the following options:
     * url, headers, fetcher, fetch,
     */
    const client = createClient({
        url: "http://localhost:8888/v1/graphql",
    })
     //`genql` does not expose the websocket client, so we have to create it ourselves with an external library
    const wsClient = createWsClient({
        url: "ws://localhost:8888/v1/graphql",
        webSocketImpl: WebSocket,
    });
    it("should query data with where and limit", async () => {
        const objkts = await client.query({
            //the top level key is the name of type we want to query
            objkt: {
                //specifying `__scalar: true` means we want to query all the scalar fields of the type
                __scalar: true,
                //all query filters/sorters are nested under `__args`
                __args: {
                    //it could be `where`, `limit`, `order_by`, `offset`, `distinct_on`
                    where: {
                        //we can filter on any field of the type
                        issuerVersion: {
                            /**
                             * we can use any operator supported by hasura: https://hasura.io/docs/latest/queries/postgres/filters/index/
                             * `_eq` means equals, so we are filtering for objkts with issuerVersion = "PRE_V3"
                             * it could also be `_gt`, `_lt`, `_gte`, `_lte`, `_in`, `_nin`, `_neq`, `_like`, `_nlike`, `_ilike`, `_nilike`, `_similar`, `_nsimilar`, `_regex`, `_iregex`, `_nregex`, `_niregex`
                             * these filters depend on the type of the field, for example, we can't use `_gt` on a string field
                            */
                            _eq: "PRE_V3"
                        }
                    },
                    limit: 10
                }
            },
        })
        expect(objkts.objkt).toBeDefined()
        expect(objkts.objkt.length).toBe(10)
    })

    it("should query nested data", async () => {
        const objkts = await client.query({
            objkt: {
                __scalar: true,
                //for nested objects, we can specify the nested type we want to query
                actions: {
                    __scalar: true
                },
                __args: {
                    where: {
                        issuerVersion: {
                            _eq: "PRE_V3"
                        }
                    },
                    limit: 10
                }
            },

        })
        expect(objkts.objkt).toBeDefined()
        expect(objkts.objkt.length).toBe(10)
    })

    it("should subscribe to a change", async () => {
        //here we use `generateSubscriptionOp` to generate the subscription operation for the actual ws client
        const { query, variables } = generateSubscriptionOp({
            action: {
                __scalar: true,
            },
        });
        //we provide the query and variables to the ws client
        //in addition, we provide the callbacks for the different events
        wsClient.subscribe(
            { query, variables },
            {
                next: (data) => console.log(data),
                error: console.error,
                complete: () => console.log('finished'),
            }
        );
    })
})
