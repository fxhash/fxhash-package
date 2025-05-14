import { GraphqlWrapper } from "@/index.js"
import { localConfig } from "@fxhash/config"
import { parse as parseGql } from "graphql/language"
import { hasuraMockClient, mockServer } from "../../mock/handlers.js"
import { HttpResponse } from "msw"

function wrapper() {
  return new GraphqlWrapper({
    url: localConfig.apis.hasuraGql,
  })
}

describe("GraphQLWrapper", () => {
  it("sets/updates/deletes headers internally", () => {
    const gql = wrapper()
    expect(gql.headers).toEqual({})
    gql.setRequestHeaders({
      key: "value",
    })
    expect(gql.headers.key).toBe("value")
    gql.removeRequestHeader("key")
    expect(gql.headers.key).toBeUndefined()
    gql.setRequestHeaders({
      hello: "world",
      other: "value",
    })
    gql.updateRequestHeaders({
      hello: "world!",
    })
    expect(gql.headers).toEqual({
      hello: "world!",
      other: "value",
    })
  })

  it("includes headers set in the query headers", async () => {
    const key = Math.random().toString().split(".")[1]

    const gql = wrapper()
    gql.setRequestHeaders({
      authorization: key,
    })

    mockServer.use(
      hasuraMockClient.query(
        "GetHeaders",
        info => {
          expect(info.request.headers.get("authorization")).toBe(key)
          return HttpResponse.json({
            data: {
              __typename: "Headers",
              headers: Object.fromEntries(info.request.headers.entries()),
            },
          })
        },
        {
          once: true,
        }
      )
    )

    // this is a fake query which returns the request headers in the response
    const res = await gql.client().query(
      parseGql(`
        query GetHeaders {
          headers
        }
      `),
      {}
    )

    expect(res.data?.headers.authorization).toBe(key)
  })
})
