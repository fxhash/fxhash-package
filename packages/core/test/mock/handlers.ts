import { graphql, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { localConfig } from "@fxhash/config"
import {
  ACCESS_TOKEN,
  CHALLENGE_ID,
  CHALLENGE_TEXT_ETHEREUM,
  CHALLENGE_TEXT_TEZOS,
  INVALID_CHALLENGE_ID,
  INVALID_SIGNATURE,
  REFRESH_TOKEN,
} from "./constants.js"
import { BlockchainType } from "@fxhash/shared"

export const hasuraMockClient = graphql.link(localConfig.apis.hasuraGql)

export const handlers = [
  hasuraMockClient.mutation("Authenticate", ({ variables }) => {
    if (variables.input.id === INVALID_CHALLENGE_ID) {
      throw new Error("challenge-id-invalid")
    }
    if (variables.input.signature === INVALID_SIGNATURE) {
      throw new Error("signature-invalid")
    }
    return HttpResponse.json({
      data: {
        authenticate: {
          accessToken: ACCESS_TOKEN,
          refreshToken: REFRESH_TOKEN,
        },
      },
    })
  }),

  hasuraMockClient.mutation("GenerateChallenge", ({ variables }) => {
    return HttpResponse.json({
      data: {
        generate_challenge: {
          id: CHALLENGE_ID,
          text:
            variables.input.chain === BlockchainType.ETHEREUM
              ? CHALLENGE_TEXT_ETHEREUM
              : CHALLENGE_TEXT_TEZOS,
        },
      },
    })
  }),
  hasuraMockClient.query("GetMyAccount", () => {
    return HttpResponse.json({
      data: {
        offchain: {
          UserAccount: [
            {
              account: {
                id: "3c37e96e-f1aa-4b98-8cb9-b49cdcb55cdf",
                username: "0x3f37cE40A4162Af17c9FC5a1148F6e0f44352Cce",
                profile: {
                  picture: null,
                  description: "",
                },
                wallets: [
                  {
                    address: "0x3f37cE40A4162Af17c9FC5a1148F6e0f44352Cce",
                    network: "ETHEREUM",
                    accountId: "3c37e96e-f1aa-4b98-8cb9-b49cdcb55cdf",
                    walletUser: [],
                  },
                ],
                mainWallet: {
                  address: "0x3f37cE40A4162Af17c9FC5a1148F6e0f44352Cce",
                  network: "ETHEREUM",
                  accountId: "3c37e96e-f1aa-4b98-8cb9-b49cdcb55cdf",
                  walletUser: [],
                },
              },
            },
          ],
        },
      },
    })
  }),

  hasuraMockClient.mutation("Logout", () => {
    return HttpResponse.json({
      data: {
        __typename: "LogoutResult",
        succcess: true,
      },
    })
  }),
]

const server = setupServer(...handlers)

// Start server before all tests
beforeAll(() => server.listen())

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers()
})

export const mockServer = server
