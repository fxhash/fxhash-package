import {
  Client,
  PublicClient,
  WalletClient,
  decodeAbiParameters,
  encodeAbiParameters,
  encodePacked,
  getContract,
} from "viem"
import {
  MerkleTreeWhitelist,
  getAvailableIndexesAndProofsForUser,
  getWhitelist,
  getWhitelistTree,
} from "./whitelist"
import { EMPTY_BYTES_32, ZERO_ADDRESS } from "./constants"

import { sign } from "viem/accounts"
import {
  DutchAuctionMintInfoArgs,
  FixedPriceMintInfoArgs,
  MintInfo,
  MintTypes,
  ReserveInfo,
  TicketMintInfoArgs,
  defineReserveInfo,
  predictFxContractAddress,
} from "@/services/operations"
import {
  GetTokenPricingsAndReservesQuery,
  Qu_GetTokenPricingsAndReserves,
} from "@fxhash/gql"
import { apolloClient } from "@/services/Hasura"
import { BlockchainType, invariant } from "@fxhash/shared"
import { config } from "@fxhash/config"
import { EthereumWalletManager, getConfigForChain } from "@/services/Wallet"

/**
 * The `FixedPriceMintParams` type represents the parameters required for a fixed price mint operation.
 * @property {bigint} price - The `price` property is of type `bigint`, which represents an arbitrary
 * precision integer. It is used to specify the fixed price for minting an item.
 * @property merkleRoot - The `merkleRoot` property is a string representing a hexadecimal value. It is
 * prefixed with `0x` to indicate that it is a hexadecimal value.
 * @property signer - The `signer` property is a string representing the Ethereum address of the
 * account that will be used to sign transactions related to the fixed price mint.
 */
export type FixedPriceMintParams = {
  price: bigint
  merkleRoot: `0x${string}`
  signer: `0x${string}`
}

/**
 * The below type represents the parameters required for minting in a Dutch auction.
 * @property {boolean} refunded - A boolean value indicating whether the auction will refund any excess
 * funds to the participants.
 * @property {bigint} stepLength - The `stepLength` property in the `DutchAuctionMintParams` type
 * represents the duration of each step in the Dutch auction. It is of type `bigint`, which is a
 * built-in JavaScript type for arbitrary precision integers.
 * @property prices - The `prices` property is an array of `bigint` values. It represents the
 * decreasing prices in the Dutch auction. Each element in the array corresponds to a specific step in
 * the auction, with the first element being the initial price and each subsequent element being a
 * lower price.
 * @property merkleRoot - The `merkleRoot` property is a string representing the Merkle root of a
 * Merkle tree. It is prefixed with `0x` to indicate that it is a hexadecimal value.
 * @property signer - The `signer` property is a string representing the Ethereum address of the
 * account that will sign the transaction.
 */
export type DutchAuctionMintParams = {
  refunded: boolean
  stepLength: bigint
  prices: readonly bigint[]
  merkleRoot: `0x${string}`
  signer: `0x${string}`
}

/**
 * The ReserveListEntry type represents an entry in a reserve list, with an account address and an
 * index. It's a high level type for simpler manupulation of reserve lists.
 * @property account - The `account` property is a string that represents an Ethereum address. It is
 * prefixed with "0x" and followed by a series of hexadecimal characters.
 * @property {number} index - The `index` property is a number that represents the position or order of
 * the entry in a reserve list.
 */
export type ReserveListEntry = {
  account: `0x${string}`
  index: number
}

/**
 * The function `getFixedPriceMinterEncodedParams` takes a price, a whitelist
 * merkle root, and a signer address as input and returns the encoded parameters
 * in ABI format.
 * @param price `bigint` value representing the fixed price. It is the cost or
 * value associated with a particular item or service.
 * @param whitelist A merkle tree with the elements in the list and the merkle
 * root, which represent the whitelist.
 * @param signer Ethereum address represented as a string. It is used to
 * specify the address of the account that will sign the transaction.
 * @returns the encoded ABI parameters, as expected by the smart contract.
 * @throws if the provided merkle tree's list doesn't match with its merkle
 * root.
 */
export function getFixedPriceMinterEncodedParams(
  price: bigint,
  whitelist?: MerkleTreeWhitelist | null,
  signer: `0x${string}` = ZERO_ADDRESS
) {
  let merkleRoot: `0x${string}` = EMPTY_BYTES_32

  if (whitelist) {
    if (whitelist.whitelist.length > 0) {
      const tree = getWhitelistTree(whitelist.whitelist)
      merkleRoot = tree.root as `0x${string}`
      if (merkleRoot !== whitelist.merkleRoot) {
        throw new Error(
          `The merkle root associated given whitelist (${whitelist.whitelist}) doesn't match with the merkle root which was computed as a check step (${merkleRoot}).`
        )
      }
    }
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
 * Given a set of tiered dutch auction parameters, returns hex string
 * reprensentation of the ABI encoded parameters as the Smart Contract expects.
 * @param prices Array of bigints representing the prices for each tier of the
 * Dutch Auction.
 * @param stepLength bigint` value that represents the time-duration of each
 * step in the Dutch auction. It determines how long each price stays active
 * until the auction ends.
 * @param refundEnabled A boolean value indicating whether refunds are enabled
 * in the auction. Refunds happen when the project has reached a final price
 * (all of its iterations have been minted) or when it has reached its resting
 * price. Collectors can then get a refund of the difference between what they
 * spent and this final price.
 * @param whitelist A merkle tree with the elements in the list and the merkle
 * root, which represent the whitelist.
 * @param signer Ethereum address represented as a string. It is used to
 * specify the address of the account that will sign the transaction.
 * @returns the encoded parameters of a Dutch auction minter.
 * @throws if the provided merkle tree's list doesn't match with its merkle
 * root.
 */
export function getDutchAuctionMinterEncodedParams(
  prices: bigint[],
  stepLength: bigint,
  refundEnabled: boolean,
  whitelist?: MerkleTreeWhitelist | null,
  signer: `0x${string}` = ZERO_ADDRESS
) {
  let merkleRoot: `0x${string}` = EMPTY_BYTES_32

  if (whitelist) {
    if (whitelist.whitelist.length > 0) {
      const tree = getWhitelistTree(whitelist.whitelist)
      merkleRoot = tree.root as `0x${string}`
      if (merkleRoot !== whitelist.merkleRoot) {
        throw new Error(
          `The merkle root associated given whitelist (${whitelist.whitelist}) doesn't match with the merkle root which was computed as a check step (${merkleRoot}).`
        )
      }
    }
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

/**
 * The function `signMintPass` signs a mint pass using the provided parameters and returns the encoded
 * signature.
 * @param token - The `token` parameter is a string representing the token address. It should be in the
 * format `0x` followed by a hexadecimal string.
 * @param {number} reserveId - The `reserveId` parameter is a number that represents the ID of the
 * reserve. It is used to identify a specific reserve in the contract.
 * @param {number} index - The `index` parameter is a number that represents the index of the mint
 * pass. It is used to uniquely identify a specific mint pass within a reserve.
 * @param claimer - The `claimer` parameter is the Ethereum address of the account that will claim the
 * mint pass.
 * @param {WalletClient} walletClient - The `walletClient` parameter is an instance of a wallet client
 * that will be used to sign the mint pass.
 * @param {PublicClient} publicClient - The `publicClient` parameter is an instance of a client that
 * interacts with the public blockchain network. It is used to read data from the blockchain, such as
 * contract state or transaction information.
 * @param privateKey - The `privateKey` parameter is a hexadecimal string representing the private key
 * of the signer. It is used to sign the `typedDataHash` and generate a signature for the mint pass.
 * @param minter - The `minter` parameter is the address of the minter contract used for the mint pass
 * @param {any} abi - The `abi` parameter is the ABI (Application Binary Interface) of minter contract used
 * @returns the encoded packed values of the signature components (`signature.r`, `signature.s`, and
 * `signature.v`) as a `bytes32` array and a `uint8` value.
 */
export async function signMintPass(
  token: `0x${string}`,
  reserveId: number,
  index: number,
  claimer: `0x${string}`,
  walletManager: EthereumWalletManager,
  privateKey: `0x${string}`,
  minter: `0x${string}`,
  abi: any,
  chain: BlockchainType
) {
  await walletManager.prepareSigner({ blockchainType: chain })
  const contract = getContract({
    address: minter,
    abi: abi,
    //@ts-ignore
    walletClient: walletManager.walletClient,
    //@ts-ignore
    publicClient: walletManager.publicClient,
  })
  const nonce = await contract.read.reserveNonce([token, reserveId])
  const typedDataHash = await contract.read.generateTypedDataHash([
    token,
    reserveId,
    nonce,
    index,
    claimer,
  ])
  if (typeof typedDataHash !== "string") {
    throw Error("Could not get typed hash for mint pass")
  }
  const signature = await sign({
    hash: typedDataHash as `0x${string}`,
    privateKey: privateKey,
  })
  return encodePacked(
    ["bytes32", "bytes32", "uint8"],
    [signature.r, signature.s, Number(signature.v)]
  )
}

export async function processAndFormatMintInfos(
  mintInfos: (
    | FixedPriceMintInfoArgs
    | DutchAuctionMintInfoArgs
    | TicketMintInfoArgs
  )[],
  manager: EthereumWalletManager,
  chain: BlockchainType
): Promise<MintInfo[]> {
  const currentConfig =
    chain === BlockchainType.ETHEREUM ? config.eth : config.base
  return await Promise.all(
    mintInfos.map(async argsMintInfo => {
      const reserveInfo: ReserveInfo = defineReserveInfo(
        argsMintInfo.reserveInfo
      )
      if (argsMintInfo.type === MintTypes.FIXED_PRICE) {
        const mintInfo: MintInfo = {
          minter: currentConfig.contracts.fixed_price_minter_v1,
          reserveInfo: reserveInfo,
          params: getFixedPriceMinterEncodedParams(
            argsMintInfo.params.price,
            argsMintInfo.params.whitelist,
            argsMintInfo.params.mintPassSigner
              ? (argsMintInfo.params.mintPassSigner as `0x${string}`)
              : undefined
          ),
        }
        return mintInfo
      } else if (argsMintInfo.type === MintTypes.DUTCH_AUCTION) {
        const mintInfo: MintInfo = {
          minter: currentConfig.contracts.dutch_auction_minter_v1,
          reserveInfo: reserveInfo,
          params: getDutchAuctionMinterEncodedParams(
            argsMintInfo.params.prices,
            argsMintInfo.params.stepLength,
            argsMintInfo.params.refunded,
            argsMintInfo.params.whitelist,
            argsMintInfo.params.mintPassSigner
              ? (argsMintInfo.params.mintPassSigner as `0x${string}`)
              : undefined
          ),
        }
        return mintInfo
      } else if (argsMintInfo.type === MintTypes.TICKET) {
        const predictedAddress = await predictFxContractAddress(
          manager.address,
          "ticket",
          manager,
          chain
        )
        const encodedPredictedAddress = encodeAbiParameters(
          [{ name: "address", type: "address" }],
          [predictedAddress as `0x${string}`]
        )
        const mintInfo: MintInfo = {
          minter: currentConfig.contracts.ticket_redeemer_v1,
          reserveInfo: reserveInfo,
          params: encodedPredictedAddress,
        }
        return mintInfo
      } else {
        throw Error("Invalid mint type")
      }
    })
  )
}

/**
 * The function `decodeDutchAuctionMinterParams` decodes a given byte string into a
 * DutchAuctionMintParams object.
 * @param bytes - The `bytes` parameter is a hexadecimal string that represents the encoded data of the
 * DutchAuctionMintParams.
 * @returns The function `decodeDutchAuctionMinterParams` returns an object of type
 * `DutchAuctionMintParams` or `undefined`.
 */
export function decodeDutchAuctionMinterParams(
  bytes: `0x${string}`
): DutchAuctionMintParams | undefined {
  try {
    const dutchAuctionDecoded = decodeAbiParameters(
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
      bytes
    )
    return {
      refunded: dutchAuctionDecoded[0].refunded,
      stepLength: dutchAuctionDecoded[0].stepLength,
      prices: dutchAuctionDecoded[0].prices,
      merkleRoot: dutchAuctionDecoded[1],
      signer: dutchAuctionDecoded[2],
    }
  } catch (error) {
    return undefined
  }
}

/**
 * The function `decodeFixedPriceMinterParams` decodes a given byte string into a
 * `FixedPriceMintParams` object, or returns `undefined` if decoding fails.
 * @param bytes - The `bytes` parameter is a hexadecimal string that represents encoded data.
 * @returns The function `decodeFixedPriceMinterParams` returns an object of type
 * `FixedPriceMintParams` if the decoding is successful. If there is an error during decoding, it
 * returns `undefined`.
 */
export function decodeFixedPriceMinterParams(
  bytes: `0x${string}`
): FixedPriceMintParams | undefined {
  try {
    const fixedPriceDecoded = decodeAbiParameters(
      [
        {
          name: "price",
          type: "uint256",
        },
        {
          name: "merkleRoot",
          type: "bytes32",
        },
        {
          name: "signer",
          type: "address",
        },
      ],
      bytes
    )
    return {
      price: fixedPriceDecoded[0],
      merkleRoot: fixedPriceDecoded[1],
      signer: fixedPriceDecoded[2],
    }
  } catch (error) {
    return undefined
  }
}

export function getPricingFromParams(
  generativeToken: NonNullable<
    GetTokenPricingsAndReservesQuery["onchain"]
  >["generative_token_by_pk"],
  whitelist: boolean
) {
  if (!generativeToken) {
    throw new Error("generativeToken is null or undefined")
  }
  const { pricing_fixeds, pricing_dutch_auctions, reserves } = generativeToken
  const isFixed = pricing_fixeds.length > 0
  const pricingList = isFixed ? pricing_fixeds : pricing_dutch_auctions

  if (!whitelist) {
    // We find the first pricing that doesn't have a reserve
    const pricing =
      reserves.length === 0
        ? pricingList[0]
        : // @ts-ignore
          pricingList.find(pricing =>
            reserves.every(
              reserve =>
                reserve.data.reserveId !== pricing.id.split("-")[1] ||
                !reserve.data.merkleRoot
            )
          )
    return { pricing }
  }
  return { pricing: pricingList[0] }
}

export function getPricingAndReserveFromParams(
  generativeToken: NonNullable<
    GetTokenPricingsAndReservesQuery["onchain"]
  >["generative_token_by_pk"],
  whitelist: boolean
) {
  invariant(generativeToken, "generativeToken is null or undefined")
  const { pricing_fixeds, pricing_dutch_auctions, reserves } = generativeToken
  const isFixed = pricing_fixeds.length > 0
  const pricingList = isFixed ? pricing_fixeds : pricing_dutch_auctions

  const findPricingAndReserve = () => {
    if (whitelist) {
      for (const pricing of pricingList) {
        const reserveId = pricing.id.split("-")[1]
        const reserve = reserves.find(
          reserve =>
            reserve.data.reserveId === reserveId && reserve.data.merkleRoot
        )
        if (reserve) {
          return { pricing, reserve }
        }
      }
      throw new Error("No pricing with matching reserve found")
    } else {
      const pricing =
        reserves.length === 0
          ? pricingList[0]
          : // @ts-ignore
            pricingList.find(pricing =>
              reserves.every(
                reserve =>
                  reserve.data.reserveId !== pricing.id.split("-")[1] ||
                  !reserve.data.merkleRoot
              )
            )

      invariant(pricing, "No suitable pricing found")

      return { pricing, reserve: undefined }
    }
  }

  return findPricingAndReserve()
}

interface PrepareMintParamsPayload {
  pricing:
    | NonNullable<
        NonNullable<
          GetTokenPricingsAndReservesQuery["onchain"]
        >["generative_token_by_pk"]
      >["pricing_fixeds"][0]
    | NonNullable<
        NonNullable<
          GetTokenPricingsAndReservesQuery["onchain"]
        >["generative_token_by_pk"]
      >["pricing_dutch_auctions"][0]
  reserve?: NonNullable<
    NonNullable<
      GetTokenPricingsAndReservesQuery["onchain"]
    >["generative_token_by_pk"]
  >["reserves"][0]
  indexesAndProofs?: {
    indexes: number[]
    proofs: string[][]
  }
}

export const prepareMintParams = async (
  tokenId: string,
  qty: bigint,
  whitelistedAddress: `0x${string}` | null = null
): Promise<PrepareMintParamsPayload> => {
  const tokenPricingsAndReserves = await apolloClient.query({
    query: Qu_GetTokenPricingsAndReserves,
    variables: {
      id: tokenId,
    },
    fetchPolicy: "no-cache",
  })

  invariant(
    tokenPricingsAndReserves.data.onchain?.generative_token_by_pk,
    "No token found"
  )

  const { pricing } = getPricingFromParams(
    tokenPricingsAndReserves.data.onchain.generative_token_by_pk,
    !!whitelistedAddress
  )

  invariant(pricing, "No pricing found")

  if (!whitelistedAddress) return { pricing }

  let indexesAndProofs:
    | {
        indexes: number[]
        proofs: string[][]
      }
    | undefined = undefined
  let reserveSave: any = undefined
  for (const reserve of tokenPricingsAndReserves.data.onchain
    .generative_token_by_pk.reserves) {
    const merkleTreeWhitelist = await getWhitelist(reserve.data.merkleRoot)

    invariant(
      merkleTreeWhitelist && merkleTreeWhitelist.length > 0,
      "No whitelist found"
    )

    const indexesAndProofsForUser = getAvailableIndexesAndProofsForUser(
      whitelistedAddress,
      merkleTreeWhitelist[0],
      reserve
    )
    if (indexesAndProofsForUser) {
      indexesAndProofs = indexesAndProofsForUser
      reserveSave = reserve
      break
    }
  }

  invariant(indexesAndProofs, "No indexes and proofs found")
  invariant(
    qty > BigInt(indexesAndProofs.indexes.length),
    "Not enough allow list entries found for the requested quantity"
  )

  indexesAndProofs.indexes = indexesAndProofs.indexes.slice(0, Number(qty))
  indexesAndProofs.proofs = indexesAndProofs.proofs.slice(0, Number(qty))

  return {
    pricing,
    reserve: reserveSave,
    indexesAndProofs,
  }
}

export const fetchTokenReserveId = async (
  tokenId: string,
  useWhitelist: boolean = false
) => {
  const tokenPricingsAndReserves = await apolloClient.query({
    query: Qu_GetTokenPricingsAndReserves,
    variables: {
      id: tokenId,
    },
    fetchPolicy: "no-cache",
  })

  invariant(
    tokenPricingsAndReserves.data.onchain?.generative_token_by_pk,
    "No token found"
  )

  const { pricing } = getPricingFromParams(
    tokenPricingsAndReserves.data.onchain.generative_token_by_pk,
    useWhitelist
  )
  invariant(pricing, "No pricing found")
  return pricing.id.split("-")[1]
}
