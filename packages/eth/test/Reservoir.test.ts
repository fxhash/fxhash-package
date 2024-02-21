import { getCollection, getToken } from "@/services/reservoir/api"

describe("Reservoir tests", () => {
  it("should correctly fetch collection data", async () => {
    const collection = "0x3701a489e2fd81a89ff52dbd0bce97714f0b5d27"
    const collectionData = await getCollection(collection)
    expect(collectionData.collections[0].id).toBe(collection)
  })

  it("should correctly fetch token data", async () => {
    const token = "0x3701a489e2fd81a89ff52dbd0bce97714f0b5d27:1"
    const tokenData = await getToken(token)
    expect(tokenData.tokens[0].token.tokenId).toBe("1")
    expect(tokenData.tokens[0].token.collection.id).toBe(
      "0x3701a489e2fd81a89ff52dbd0bce97714f0b5d27"
    )
  })
})
