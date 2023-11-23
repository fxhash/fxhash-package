import { config as dotenvConfig } from "dotenv"
import { createPublicClient, createWalletClient, http } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { foundry, goerli } from "viem/chains"
import { getDailyTax } from "@/utils/tickets"
import { config } from "@fxhash/config"

dotenvConfig()

const walletClient = createWalletClient({
  chain: foundry,
  transport: http(),
  account: privateKeyToAccount(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  ),
})
const publicClient = createPublicClient({
  chain: goerli,
  transport: http(config.eth.apis.rpcs[0]),
})

describe("Ticket helpers tests", () => {
  it("should correctly get ticket daily tax", async () => {
    const dailyTax = await getDailyTax(
      walletClient,
      publicClient,
      "0x6edadc0f5d20332e265a659a2c1689a240932b33",
      BigInt(10000000000000000)
    )
    expect(dailyTax).toEqual(BigInt(27000000000000))
  })

  //   it("should correctly get ticket isForeclosed flag", async () => {
  //     const isTicketForeclosed = await isForeclosed(
  //       walletClient,
  //       publicClient,
  //       "0x6edadc0f5d20332e265a659a2c1689a240932b33",
  //       BigInt(7)
  //     )
  //     expect(isTicketForeclosed).toEqual(true)
  //   })

  //   it("should correctly get ticket tax info", async () => {
  //     const taxInfo = await getTaxInfo(
  //       walletClient,
  //       publicClient,
  //       "0x6edadc0f5d20332e265a659a2c1689a240932b33",
  //       BigInt(7)
  //     )
  //     expect(taxInfo).toEqual({
  //       currentPrice: 1000000000000000n,
  //       depositAmount: 0n,
  //       foreclosureTime: 1700747616,
  //       gracePeriod: 1700747616,
  //     })
  //   })

  //   it("should correctly get ticket auction price", async () => {
  //     const taxInfo = await getTaxInfo(
  //       walletClient,
  //       publicClient,
  //       "0x6edadc0f5d20332e265a659a2c1689a240932b33",
  //       BigInt(7)
  //     )
  //     const auctionPrice = await getAuctionPrice(
  //       walletClient,
  //       publicClient,
  //       "0x6edadc0f5d20332e265a659a2c1689a240932b33",
  //       BigInt(10000000000000000),
  //       taxInfo.foreclosureTime
  //     )
  //     expect(auctionPrice).toEqual(BigInt(8549055555567400n))
  //   })

  //   it("should correctly get minimal claim value for price", async () => {
  //     const minClaimPrice = await getMinimumClaimValueForNewPrice(
  //       walletClient,
  //       publicClient,
  //       "0x6edadc0f5d20332e265a659a2c1689a240932b33",
  //       BigInt(7),
  //       BigInt(10000000000000000)
  //     )
  //     expect(minClaimPrice).toEqual(8566527777789700)
  //   })
})
