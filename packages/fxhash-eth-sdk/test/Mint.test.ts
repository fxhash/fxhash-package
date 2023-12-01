import {
  Whitelist,
  flattenWhitelist,
  getFirstAvailableIndexAndProofForUser,
  getPricingAndReserveFromParams,
  getWhitelistTree,
} from "@/utils"
import { GetTokenPricingsAndReservesQuery } from "@fxhash/gql"

describe("Mint reserves nightmare - fixed price", () => {
  describe("fixed price - no reserve", () => {
    /**
     * The minter is a fixed price
     * There is no whitelist
     * Simple test case scenario
     */
    const payloadFixedPrice: GetTokenPricingsAndReservesQuery["onchain"]["generative_token_by_pk"] =
      {
        reserves: [],
        pricing_fixeds: [
          {
            id: "0xe96416cB8f17BDe6aD9149Eb621BDEf0f35Aba03-0",
            opens_at: "2023-11-30T18:22:36+00:00",
            price: 5000000000000000,
          },
        ],
        pricing_dutch_auctions: [],
      }

    it("should throw when trying to mint with whitelist", () => {
      expect(() =>
        getPricingAndReserveFromParams(payloadFixedPrice, true)
      ).toThrowError("No pricing with matching reserve found")
    })

    it("should work with fixed pricing minter", () => {
      expect(getPricingAndReserveFromParams(payloadFixedPrice, false)).toEqual({
        pricing: payloadFixedPrice["pricing_fixeds"][0],
        reserve: undefined,
      })
    })
  })

  describe("fixed price - with reserve", () => {
    /**
     * The minter is a fixed price
     * There is one whitelists
     * There are no whitelist mints
     */
    const payloadFixedPriceWhitelist: GetTokenPricingsAndReservesQuery["onchain"]["generative_token_by_pk"] =
      {
        reserves: [
          {
            id: 1287,
            method: 0,
            amount: 2,
            data: {
              reserveId: "0",
              merkleRoot:
                "0xbdaf4aa4150358a5ba45b0e602989d9879ac582a182726e65ea7388bef93c031",
              consumedSlots: [],
            },
          },
        ],
        pricing_fixeds: [
          {
            id: "0xe96416cB8f17BDe6aD9149Eb621BDEf0f35Aba03-0",
            opens_at: "2023-11-30T20:07:24+00:00",
            price: 5000000000000000,
          },
          {
            id: "0xe96416cB8f17BDe6aD9149Eb621BDEf0f35Aba03-1",
            opens_at: "2023-11-30T20:07:24+00:00",
            price: 5000000000000000,
          },
        ],
        pricing_dutch_auctions: [],
      }

    it("should work with whitelist", () => {
      expect(
        getPricingAndReserveFromParams(payloadFixedPriceWhitelist, true)
      ).toEqual({
        pricing: payloadFixedPriceWhitelist["pricing_fixeds"][0],
        reserve: payloadFixedPriceWhitelist["reserves"][0],
      })
    })

    it("should work with fixed pricing minter", () => {
      expect(
        getPricingAndReserveFromParams(payloadFixedPriceWhitelist, false)
      ).toEqual({
        pricing: payloadFixedPriceWhitelist["pricing_fixeds"][1],
        reserve: undefined,
      })
    })
  })
})

// describe("Mint reserves nightmare - dutch auction", () => {
//   // TODO
// })

describe("Mint reserves nightmare - whitelist", () => {
  const whitelist: Whitelist = new Map()
  const userA = "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42"
  const userB = "0xBF0BbF31149e8FA7183Cb6eD96a1D2Ab947B8368"
  const userC = "0xa679B7725192CC3BaAE788596F8c669BF58dC784"
  whitelist.set(userA, 1)
  whitelist.set(userB, 2)
  whitelist.set(userC, 3)
  const flattenedWhitelist = flattenWhitelist(whitelist)
  const tree = getWhitelistTree(flattenedWhitelist)
  const reserve = {
    id: 1,
    method: 0,
    amount: 3,
    data: {
      reserveId: "0",
      merkleRoot: tree.root,
      consumedSlots: [],
    },
  }
  it("should return the correct index and proof for a user with an available slot", () => {
    const result = getFirstAvailableIndexAndProofForUser(
      userA,
      {
        merkleRoot: tree.root as `0x${string}`,
        whitelist: flattenedWhitelist,
      },
      reserve
    )

    expect(result).toEqual({
      index: flattenedWhitelist.findIndex(entry => entry[1] === userA),
      proof: tree.getProof(
        flattenedWhitelist.findIndex(entry => entry[1] === userA)
      ),
    })
  })

  it("should throw an error if the user is not in the whitelist", () => {
    const nonWhitelistedUser = "0xNonExistingUser"
    expect(() =>
      getFirstAvailableIndexAndProofForUser(
        nonWhitelistedUser,
        {
          merkleRoot: tree.root as `0x${string}`,
          whitelist: flattenedWhitelist,
        },
        reserve
      )
    ).toThrowError("User has not any available slot in whitelist")
  })

  it("should throw an error if the user's slot is already consumed", () => {
    const modifiedReserve = {
      ...reserve,
      data: {
        ...reserve.data,
        consumedSlots: [{ address: userA }],
      },
    }

    expect(() =>
      getFirstAvailableIndexAndProofForUser(
        userA,
        {
          merkleRoot: tree.root as `0x${string}`,
          whitelist: flattenedWhitelist,
        },
        modifiedReserve
      )
    ).toThrowError("User has not any available slot in whitelist")
  })

  it("should return a valid proof for the user's slot", () => {
    const result = getFirstAvailableIndexAndProofForUser(
      userA,
      {
        merkleRoot: tree.root as `0x${string}`,
        whitelist: flattenedWhitelist,
      },
      reserve
    )

    const isValidProof = tree.verify(result.index, result.proof)

    expect(isValidProof).toBeTruthy()
  })
})
