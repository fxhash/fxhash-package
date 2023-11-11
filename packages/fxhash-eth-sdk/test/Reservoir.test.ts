import { config as dotenvConfig } from "dotenv"
import { beforeAll, describe, expect, test } from "@jest/globals"
import { createWalletClient, http, parseEther, WalletClient } from "viem"
import { sepolia } from "viem/chains"
import { privateKeyToAccount } from "viem/accounts"
import {
  acceptOffer,
  buyToken,
  buyTokenAdvanced,
  cancelOrder,
  listToken,
  placeBid,
} from "@/services/operations/Marketplace"
import { config } from "@fxhash/config"

dotenvConfig()

jest.setTimeout(10000000)

let sellerWalletClient: WalletClient
let buyerWalletClient: WalletClient

const tokenId = "0x3850fae29b797a5650eeba77c37b789fb849b299:1"

describe("Reservoir tests", () => {
  beforeAll(() => {
    sellerWalletClient = createWalletClient({
      account: privateKeyToAccount(
        "0xe4a14b2ed60d4c8e6c2848bc0e3d1f067c3201dd100534ab236dd6228aca6eac"
      ),
      chain: sepolia,
      transport: http(config.eth.apis.rpcs[0]),
    })
    buyerWalletClient = createWalletClient({
      account: privateKeyToAccount(
        "0x6750ae5b7fbe998d17246403bf37dc4a1602af76cfa0c4ccabf63458fb47bb30"
      ),
      chain: sepolia,
      transport: http(config.eth.apis.rpcs[0]),
    })
  })
  // describe("Reservoir SDK tests", () => {
  //   test("should create an advanced 0 Eth listing and fulfill it", async () => {
  //     const expiration = `${Math.floor(new Date().getTime() / 1000) + 1000000}`
  //     const listRes = await listToken(
  //       [
  //         {
  //           token: tokenId,
  //           weiPrice: parseEther("0.00000000001").toString(),
  //           orderbook: "reservoir",
  //           orderKind: "seaport-v1.5",
  //           expirationTime: expiration,
  //         },
  //       ],
  //       sellerWalletClient
  //     )
  //     expect(listRes).toBe(true)
  //     const buyRes = await buyTokenAdvanced(
  //       [
  //         {
  //           token: tokenId,
  //           quantity: 1,
  //         },
  //       ],
  //       ["0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42:100000000000"],
  //       buyerWalletClient
  //     )
  //     expect(buyRes).toBe(true)
  //   })
  //   test("should create a listing and cancel it", async () => {
  //     const expiration = `${Math.floor(new Date().getTime() / 1000) + 1000000}`
  //     const listRes = await listToken(
  //       [
  //         {
  //           token: tokenId,
  //           weiPrice: parseEther("0.00001").toString(),
  //           orderbook: "reservoir",
  //           orderKind: "seaport-v1.5",
  //           expirationTime: expiration,
  //         },
  //       ],
  //       sellerWalletClient
  //     )
  //     expect(listRes).toBe(true)
  //     // const sellerOrders = await getOrders({
  //     //   maker: sellerWalletClient.account!.address,
  //     // })

  //     // const cancelSellerRes = await cancelOrder(
  //     //   sellerOrders.orders!.map(order => order.id),
  //     //   sellerWalletClient
  //     // )
  //     // expect(cancelSellerRes).toBe(true)
  //   })
  //   test("should create a bid and cancel it", async () => {
  //     const expiration = `${Math.floor(new Date().getTime() / 1000) + 1000000}`
  //     const placeBidRes = await placeBid(
  //       [
  //         {
  //           token: tokenId,
  //           weiPrice: parseEther("0.00001").toString(),
  //           orderbook: "reservoir",
  //           orderKind: "seaport-v1.5",
  //           expirationTime: expiration,
  //         },
  //       ],
  //       buyerWalletClient
  //     )
  //     expect(placeBidRes).toBe(true)
  //     // const buyerOrders = await getBids({
  //     //   maker: buyerWalletClient.account!.address,
  //     // })

  //     // const cancelBuyerRes = await cancelOrder(
  //     //   buyerOrders.orders!.map(order => order.id),
  //     //   buyerWalletClient
  //     // )
  //     // expect(cancelBuyerRes).toBe(true)
  //   })
  //   test("should create a valid listing and purchase it", async () => {
  //     const expiration = `${Math.floor(new Date().getTime() / 1000) + 1000000}`
  //     const listRes = await listToken(
  //       [
  //         {
  //           token: tokenId,
  //           weiPrice: parseEther("0.00001").toString(),
  //           orderbook: "reservoir",
  //           orderKind: "seaport-v1.5",
  //           expirationTime: expiration,
  //         },
  //       ],
  //       sellerWalletClient
  //     )
  //     expect(listRes).toBe(true)
  //     const buyRes = await buyToken(
  //       [
  //         {
  //           token: tokenId,
  //           quantity: 1,
  //         },
  //       ],
  //       buyerWalletClient
  //     )
  //     expect(buyRes).toBe(true)
  //   })
  //   test("should create a valid bid and accept it", async () => {
  //     const expiration = `${Math.floor(new Date().getTime() / 1000) + 1000000}`
  //     const placeBidRes = await placeBid(
  //       [
  //         {
  //           token: tokenId,
  //           weiPrice: parseEther("0.00001").toString(),
  //           orderbook: "reservoir",
  //           orderKind: "seaport-v1.5",
  //           expirationTime: expiration,
  //         },
  //       ],
  //       buyerWalletClient
  //     )
  //     expect(placeBidRes).toBe(true)
  //     const acceptOfferRes = await acceptOffer(
  //       [
  //         {
  //           token: tokenId,
  //           quantity: 1,
  //         },
  //       ],
  //       sellerWalletClient
  //     )
  //     expect(acceptOfferRes).toBe(true)
  //   })
  // })
})
