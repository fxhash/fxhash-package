import { encodeAbiParameters } from "viem"
import { getWhitelistTree } from "./whitelist"
import { EMPTY_BYTES_32, ZERO_ADDRESS } from "./constants"

/**
 * The function `getFixedPriceMinterEncodedParams` returns the encoded parameters for a fixed price
 * minter, including the price, whitelist, and signer.
 * @param {bigint} price - The `price` parameter is of type `bigint` and represents the fixed price
 * value. It is the amount that needs to be paid for a specific item or service.
 * @param {`0x`[]} whitelist - The `whitelist` parameter is an array of Ethereum addresses
 * represented as strings. It is used to specify a list of addresses that are allowed to purchase a
 * fixed price item.
 * @param signer - The `signer` parameter is an Ethereum address. It is represented as a hexadecimal
 * string starting with "0x".
 * @returns The function `getFixedPriceMinterEncodedParams` returns the encoded parameters of the
 * `price`, `merkleRoot`, and `signer` values.
 */
export function getFixedPriceMinterEncodedParams(
  price: bigint,
  whitelist: `0x${string}`[] = [],
  signer: `0x${string}` = ZERO_ADDRESS
) {
  let merkleRoot: `0x${string}` = EMPTY_BYTES_32
  if (whitelist.length > 0) {
    const tree = getWhitelistTree(whitelist)
    merkleRoot = tree.root as `0x${string}`
  }
  return encodeAbiParameters(
    [
      { name: "price", type: "uint256" },
      { name: "merkleRoot", type: "bytes32" },
      { name: "signer", type: "address" },
    ],
    [BigInt(price), merkleRoot, signer]
  )
}

/**
 * The function `getDutchAuctionMinterEncodedParams` takes in various parameters and returns the
 * encoded parameters for a Dutch auction minter.
 * @param {bigint[]} prices - An array of big integers representing the prices for each step in the
 * Dutch auction.
 * @param {number} stepLength - The `stepLength` parameter is a number that represents the number of
 * blocks between each price decrement in the Dutch auction.
 * @param {boolean} refundEnabled - A boolean value indicating whether refunds are enabled in the Dutch
 * auction.
 * @param {`0x${string}`[]} whitelist - The `whitelist` parameter is an array of Ethereum addresses
 * (`0x${string}`). It is used to specify a list of addresses that are allowed to participate in the
 * Dutch auction.
 * @param signer - The `signer` parameter is an Ethereum address (`0x` followed by 40 hexadecimal
 * characters) that represents the account that will sign the transaction.
 * @returns the encoded parameters of the Dutch auction minter.
 */
export function getDutchAuctionMinterEncodedParams(
  prices: bigint[],
  stepLength: bigint,
  refundEnabled: boolean,
  whitelist: `0x${string}`[] = [],
  signer: `0x${string}` = ZERO_ADDRESS
) {
  let merkleRoot: `0x${string}` = EMPTY_BYTES_32
  if (whitelist.length > 0) {
    const tree = getWhitelistTree(whitelist)
    merkleRoot = tree.root as `0x${string}`
  }
  return encodeAbiParameters(
    [
      {
        name: "auctionInfo",
        type: "tuple",
        components: [
          { name: "refunded", type: "bool" },
          { name: "stepLength", type: "uint248" },
          { name: "prices", type: "uint256[]" },
        ],
      },
      { name: "merkleRoot", type: "bytes32" },
      { name: "signer", type: "address" },
    ],
    [
      {
        refunded: refundEnabled,
        stepLength: stepLength,
        prices: prices,
      },
      merkleRoot,
      signer,
    ]
  )
}
