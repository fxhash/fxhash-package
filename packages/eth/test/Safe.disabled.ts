import {
  getAllSafeTransactions,
  getPendingTransactionsForSafe,
  getUserSafes,
  getWalletProvider,
} from "@/index"

const provider = getWalletProvider(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
)
describe("Reservoir tests", () => {
  it("should correctly fetch user safes", async () => {
    const user = "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42"
    const userSafes = await getUserSafes(provider.provider, user)
    expect(userSafes.safes.length).toBeGreaterThan(0)
  })

  it("should correctly fetch pending txs for safe", async () => {
    const user = "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42"
    const userSafes = await getUserSafes(provider.provider, user)
    const pendingTxs = await getPendingTransactionsForSafe(
      provider.provider,
      userSafes.safes[0]
    )
    expect(pendingTxs.count).toBeGreaterThan(0)
  })

  it("should correctly fetch all txs for safe", async () => {
    const user = "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42"
    const userSafes = await getUserSafes(provider.provider, user)
    const allTxs = await getAllSafeTransactions(
      provider.provider,
      userSafes.safes[0]
    )
    expect(allTxs.count).toBeGreaterThan(0)
  })
})
