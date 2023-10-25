import {
  WhitelistEntry,
  getUserWhitelistIndex,
  getWhitelistTree,
} from "@/utils/whitelist"
import { StandardMerkleTree } from "@openzeppelin/merkle-tree"
import { config as dotenvConfig } from "dotenv"
import {
  concat,
  fromHex,
  getContractAddress,
  keccak256,
  slice,
  toBytes,
  toHex,
} from "viem"

dotenvConfig()

describe("createProject", () => {
  it("should correctly predict ticket address", async () => {
    const hexByteCode = toHex(
      concat([
        fromHex("0x3d602d80600a3d3981f3363d3d373d3d3d363d73", "bytes"),
        fromHex("0x4622376Cb7Befe201384753d8dc234Da38e1F567", "bytes"),
        fromHex("0x5af43d82803e903d91602b57fd5bf3", "bytes"),
      ])
    )
    const ticketAddress = await getContractAddress({
      bytecode: hexByteCode,
      from: "0x80fEE32F8BDda62bb67e883691C3c94c6ED4C525" as `0x${string}`,
      opcode: "CREATE2",
      salt: toBytes(0),
    })
    expect(ticketAddress).toEqual("0xDb807b799addfeA3c4Ba0741C9f6DDAfbFa50F3b")
  })

  it("should correctly decode tax info", async () => {
    const hexPaylod =
      "0x0000000002d8e3a6e610000000038d7ea4c683e80000652fbe650000652e3600"
    const gracePeriod = fromHex(slice(hexPaylod, 26, 32), "number")
    const foreclosureTime = fromHex(slice(hexPaylod, 20, 26), "number")
    const currentPrice = fromHex(slice(hexPaylod, 10, 20), "bigint")
    const depositAmount = fromHex(slice(hexPaylod, 0, 10), "bigint")

    console.log(gracePeriod)
  })

  it("should correctly set a whitelist, get proof and validate it", async () => {
    const address0 = "0xBF0BbF31149e8FA7183Cb6eD96a1D2Ab947B8368"
    const address1 = "0x53Bc1c48CAc9aEca57Cf36f169d3345c6fb59b42"
    const amount = 1
    const whitelist: WhitelistEntry[] = [
      {
        address: address0,
        amount: amount,
      },
      {
        address: address1,
        amount: amount,
      },
    ]
    const tree = getWhitelistTree(whitelist)
    const index = getUserWhitelistIndex(whitelist, address0)
    const proof = tree.getProof(index)
    const verified = StandardMerkleTree.verify(
      tree.root,
      ["address", "uint256"],
      [address0, amount.toString()],
      proof
    )
    expect(verified).toEqual(true)
  })
})
