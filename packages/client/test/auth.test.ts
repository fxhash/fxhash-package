import { generateChallenge, authenticate } from "../src/auth"

describe("authentication user", () => {
  let _id: string
  let _text: string
  let _signature: string

  it("generate challenge", async () => {
    const { text, id } = await generateChallenge({
      chain: "ETHEREUM",
      address: "0x9bFF49BDfb8E41336d78E10Ef0A8e179D2E9fb86",
    })
    expect(text).toBeDefined()
    expect(id).toBeDefined()
    _id = id
    _text = text
  })
  it("invalid challenge is not found", async () => {
    try {
      await authenticate({
        id: "afe7a262-4bef-4a15-8557-79b74e0fa99c",
        signature: "test",
      })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
  it("invalid signature is not valid", async () => {
    try {
      await authenticate({
        id: _id,
        signature: "test",
      })
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
