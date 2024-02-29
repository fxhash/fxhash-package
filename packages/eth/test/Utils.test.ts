import {
  Whitelist,
  flattenWhitelist,
  getWhitelistTree,
  uploadWhitelist,
} from "@/utils/whitelist"
import { config as dotenvConfig } from "dotenv"
import {
  concat,
  createPublicClient,
  createWalletClient,
  encodeAbiParameters,
  fromHex,
  getContractAddress,
  http,
  keccak256,
  slice,
  toBytes,
  toHex,
} from "viem"
import {
  ReceiverEntry,
  prepareReceivers,
  revertReceiversFee,
} from "@/services/operations/EthCommon"
import { getExistingSplits } from "@/utils"
import { getSplitsClient } from "@/services/Splits"
import { privateKeyToAccount } from "viem/accounts"
import { foundry } from "viem/chains"
import { getCIDFromV0Digest, getHashFromIPFSCID } from "@/utils/ipfs"

dotenvConfig()

const walletClient = createWalletClient({
  chain: foundry,
  transport: http(),
  account: privateKeyToAccount(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  ),
})
const publicClient = createPublicClient({
  chain: foundry,
  transport: http(),
})

describe("utils tests", () => {
  // it("should correctly decode tax info", async () => {
  //   const hexPaylod =
  //     "0x0000000002d8e3a6e610000000038d7ea4c683e80000652fbe650000652e3600"
  //   const gracePeriod = fromHex(slice(hexPaylod, 26, 32), "number")
  //   const foreclosureTime = fromHex(slice(hexPaylod, 20, 26), "number")
  //   const currentPrice = fromHex(slice(hexPaylod, 10, 20), "bigint")
  //   const depositAmount = fromHex(slice(hexPaylod, 0, 10), "bigint")
  //   console.log(gracePeriod)
  // })
  // it("should correctly set a whitelist with api", async () => {
  //   const address0 = "0xBF0BbF31149e8FA7183Cb6eD96a1D2Ab947B8368"
  //   const address1 = "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42"
  //   //! Note:
  //   // This test suite used to write accounts directly to the database, which
  //   // creates a few issues:
  //   // - we cannot expose the admin schema to a public-facing package
  //   // - ideally a test suite can run in isolation, in this case we need the
  //   //   hasura instance to run locally, and it will interfere with the data
  //   //   without providing an isolated environment
  //   //   best practice would suggest to run these test in an integration suite
  //   //   where we initialize a self-container environment
  //   //   ideally we'll want this to fully run inside docker down the line,
  //   //   alongside all the integration tests
  //   // await hasuraClient.mutation({
  //   //   // ... hidding
  //   // })
  //   const amount = 1
  //   const whitelist: Whitelist = new Map()
  //   whitelist.set(address0, amount)
  //   whitelist.set(address1, amount)
  //   const tree = getWhitelistTree(flattenWhitelist(whitelist))
  //   const uploadRoot = await uploadWhitelist(whitelist, "0x123")
  //   expect(uploadRoot).toEqual(tree.root)
  // })
  // it("should correctly add fee  and rebalance receivers", async () => {
  //   const receivers: ReceiverEntry[] = [
  //     {
  //       account: "0x1",
  //       value: 3000,
  //     },
  //     {
  //       account: "0x2",
  //       value: 3000,
  //     },
  //     {
  //       account: "0x3",
  //       value: 4000,
  //     },
  //   ]
  //   const feeReceiver: ReceiverEntry = {
  //     account: "0x4",
  //     value: 500,
  //   }
  //   const receiversWithFee = preparePrimaryReceivers(receivers, feeReceiver)
  //   const total = receiversWithFee.reduce((acc, entry) => acc + entry.value, 0)
  //   expect(total).toEqual(1_000_000)
  //   expect(receiversWithFee[0].value).toEqual(285_000)
  //   expect(receiversWithFee[1].value).toEqual(285_000)
  //   expect(receiversWithFee[2].value).toEqual(380_000)
  //   expect(receiversWithFee[3].value).toEqual(50_000)
  // })
  //it("should correctly check if a split exists", async () => {
  // const receivers: ReceiverEntry[] = [
  //   { account: "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42", value: 5000 },
  //   { account: "0xb8B6853dA0AdC48D96077Bb423A71D943B2E1157", value: 5000 },
  // ]
  // const exists = await getExistingSplits(
  //   getSplitsClient(publicClient, walletClient),
  //   "0x53bc1c48cac9aeca57cf36f169d3345c6fb59b42",
  //   receivers
  // )
  // expect(exists).toBe(true)
  // const receivers2: ReceiverEntry[] = [
  //   {
  //     account: "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b47",
  //     value: 5000,
  //   },
  //   {
  //     account: "0xb8B6853dA0AdC48D96077Bb423A71D943B2E1157",
  //     value: 5000,
  //   },
  // ]
  // const exists2 = await getExistingSplits(
  //   getSplitsClient(publicClient, walletClient),
  //   "0x53bc1c48cac9aeca57cf36f169d3345c6fb59b42",
  //   receivers2
  // )
  // expect(exists2).toBe(false)
  //})
  it("should correctly parse a v0 IPFS CID", async () => {
    const cid = "QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB"
    expect(getHashFromIPFSCID(cid)).toEqual(
      "0x0e7071c59df3b9454d1d18a15270aa36d54f89606a576dc621757afd44ad1d2e"
    )
    const cidParsed = await getCIDFromV0Digest(getHashFromIPFSCID(cid))
    expect(cid).toEqual(cidParsed)
  })
  it("should correctly revert receiver fees", async () => {
    const receivers: ReceiverEntry[] = [
      { address: "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b41", pct: 5000 },
      { address: "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42", pct: 5000 },
    ]
    const preparedReceivers = prepareReceivers(receivers, "primary")
    expect(revertReceiversFee(preparedReceivers, "primary")).toEqual(receivers)
  })
})
