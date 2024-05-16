import { generateChallenge } from "../src/auth"

describe("authentication user", () => {
  it("generate challenge", async () => {
    const { text, id } = await generateChallenge({
      chain: "ETHEREUM",
      address: "0x9bFF49BDfb8E41336d78E10Ef0A8e179D2E9fb86",
    })
    expect(text).toBeDefined()
    expect(id).toBeDefined()
  })
})
