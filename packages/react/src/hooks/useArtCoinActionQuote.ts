import { config } from "@fxhash/config"
import { useAccount, useBalance } from "wagmi"
import { useQuery } from "@tanstack/react-query"
import {
  ChainId,
  Token,
  CurrencyAmount,
  Percent,
  WETH9,
} from "@uniswap/sdk-core"
import { Pair as V2Pair } from "@uniswap/v2-sdk"
import { Pool as V3Pool } from "@uniswap/v3-sdk"
import { getPublicClient } from "@/lib/evm"
import { BlockchainType } from "@fxhash/shared"
import {
  UNISWAP_V2_POOL_ABI,
  UNISWAP_V3_POOL_ABI,
  UNISWAP_QUOTER_V2_ABI,
  UNISWAP_UNIVERSAL_ROUTER_ABI,
  getConfigForChain,
} from "@fxhash/eth"
import {
  encodeAbiParameters,
  encodeFunctionData,
  encodePacked,
  type PublicClient,
} from "viem"
import { useERC20Balance } from "./useERC20Balance"

// todo: move these constants in config
const UNISWAP_V3_QUOTER_V2 = "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a"
const FXH_WETH_POOL_ADDRESS = "0xC3e7433ae4d929092F8dFf62F7E2f15f23bC3E63"
const UNISWAP_UNIVERSAL_ROUTER = "0x6ff5693b99212da76ad316178a184ab56d299b43"

const UNISWAP_UNIVERSAL_ROUTER_COMMANDS = {
  V3_SWAP_EXACT_IN: "00",
  V2_SWAP_EXACT_IN: "08",
  WRAP_ETH: "0b",
  SWEEP: "04",
}

type ArtCoinMintBalances = {
  eth: bigint
  fxh: bigint
  artcoin: bigint
}

type UseBalancesForArtcoinMint = {
  artCoinContractAddress: `0x${string}`
  refetchInterval?: number
}

type UseBalancesForArtcoinMintReturnType = {
  fetching: boolean
  balances: ArtCoinMintBalances | null
}

export function useBalancesForArtcoinMint({
  artCoinContractAddress,
  refetchInterval = 30_000,
}: UseBalancesForArtcoinMint): UseBalancesForArtcoinMintReturnType {
  const { address } = useAccount()
  const ethWallet = address ? { address } : undefined

  const { isFetching: ethBalanceFetching, data: ethBalanceData } = useBalance({
    address: ethWallet?.address as `0x${string}` | undefined,
    query: {
      enabled: !!ethWallet,
      refetchInterval,
    },
  })
  const ethBalance = ethBalanceData?.value

  const { isFetching: fxhBalanceFetching, data: fxhBalanceData } =
    useERC20Balance({
      tokenAddress: config.base.contracts.fx_token,
      refreshInterval: refetchInterval,
    })
  const fxhBalance = fxhBalanceData

  const { isFetching: artCoinBalanceFetching, data: artCoinBalanceData } =
    useERC20Balance({
      tokenAddress: artCoinContractAddress,
      refreshInterval: refetchInterval,
    })
  const artCoinBalance = artCoinBalanceData

  return !ethWallet
    ? {
        fetching: false,
        balances: null,
      }
    : {
        fetching:
          ethBalanceFetching || fxhBalanceFetching || artCoinBalanceFetching,
        balances: {
          eth: ethBalance || 0n,
          fxh: fxhBalance || 0n,
          artcoin: artCoinBalance || 0n,
        },
      }
}

type UseArtCoinQuoteParams = {
  ethFee: bigint
  artCoinFee: bigint
  artCoinContractAddress: `0x${string}`
  artCoinFxhPoolAddress: `0x${string}`
  balances: ArtCoinMintBalances | null
}

/**
 * Generic hook for getting quotes to purchase artcoin using ETH->FXH->ARTCOIN swaps
 * Can be used for both minting and evolving operations
 */
export function useArtCoinActionQuote({
  ethFee,
  artCoinFee,
  artCoinContractAddress,
  artCoinFxhPoolAddress,
  balances,
}: UseArtCoinQuoteParams) {
  const { address } = useAccount()
  const ethWallet = address ? { address } : undefined

  const {
    data: quote,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      "1click-flow-quote",
      artCoinContractAddress,
      artCoinFxhPoolAddress,
      ethFee.toString(),
      artCoinFee.toString(),
      ethWallet?.address,
    ],
    queryFn: async () => {
      if (!ethWallet || !balances) return null
      const missingArtCoin = artCoinFee - balances.artcoin
      if (missingArtCoin <= 0n) return null

      const quoteData = await getQuoteForAmountOut(
        missingArtCoin,
        artCoinContractAddress,
        artCoinFxhPoolAddress,
        ethWallet.address as `0x${string}`
      )

      const operation = {
        from: ethWallet.address as `0x${string}`,
        to: UNISWAP_UNIVERSAL_ROUTER,
        data: quoteData.calldata,
        chainId: ChainId.BASE,
        value: quoteData.quote,
      }

      return {
        quote: quoteData.quote + ethFee,
        calldata: quoteData.calldata,
        operation,
      }
    },
    enabled: !!ethWallet && !!balances,
    // Quote valid for 30 seconds
    refetchInterval: 30 * 1000,
  })

  return { quote, error, isLoading }
}

async function getQuoteForAmountOut(
  artCoinAmount: bigint,
  artCoinAddress: `0x${string}`,
  artCoinPool: `0x${string}`,
  recipient: `0x${string}`
) {
  const publicClient = getPublicClient(
    BlockchainType.BASE,
    getConfigForChain(BlockchainType.BASE).apis.alchemy.rpc
  )

  const slippage = new Percent("4", "100")

  const WETH = WETH9[ChainId.BASE]
  const $fxh = new Token(
    ChainId.BASE,
    config.base.contracts.fx_token,
    18,
    "fxh"
  )
  const $artcoin = new Token(ChainId.BASE, artCoinAddress, 18, "artcoin")

  const artCoinAmountOut = CurrencyAmount.fromRawAmount(
    $artcoin,
    artCoinAmount.toString()
  )
  const v2PoolReserves = await getUniswapV2PoolReserves(
    publicClient,
    artCoinPool
  )
  const v2Pair = new V2Pair(
    CurrencyAmount.fromRawAmount($artcoin, v2PoolReserves.reserve0.toString()),
    CurrencyAmount.fromRawAmount($fxh, v2PoolReserves.reserve1.toString())
  )

  const v3PoolData = await getUniswapV3PoolData(
    publicClient,
    FXH_WETH_POOL_ADDRESS
  )
  const v3Pool = new V3Pool(
    WETH,
    $fxh,
    v3PoolData.fee,
    v3PoolData.sqrtPriceX96.toString(),
    v3PoolData.liquidity.toString(),
    v3PoolData.tick
  )

  // Step 1: Calculate FXH needed for desired art coin (V2 reverse quote) and
  //         add 5% slippage
  const [fxhAmountInWithoutSlippage] = v2Pair.getInputAmount(artCoinAmountOut)
  const fxhAmountIn = fxhAmountInWithoutSlippage.add(
    fxhAmountInWithoutSlippage.multiply(slippage)
  )

  // Step 2: Calculate WETH needed for required FXH (V3 reverse quote) and add
  //         5% slippage
  let quoteExactOutputSingle: string
  try {
    const simulation = await publicClient.simulateContract({
      address: UNISWAP_V3_QUOTER_V2,
      abi: UNISWAP_QUOTER_V2_ABI,
      functionName: "quoteExactOutputSingle",
      args: [
        {
          tokenIn: WETH.address as `0x${string}`,
          tokenOut: $fxh.address as `0x${string}`,
          amount: currencyToBigInt(fxhAmountIn),
          fee: v3PoolData.fee,
          sqrtPriceLimitX96: 0n,
        },
      ],
    })
    quoteExactOutputSingle = simulation.result[0].toString()
  } catch (err: unknown) {
    console.log("failed to get quoteExactOutputSingle", err)
    throw new Error("failed to get quote")
  }

  const wethAmountInWithoutSlippage = CurrencyAmount.fromRawAmount(
    WETH,
    quoteExactOutputSingle
  )
  const wethAmountIn = wethAmountInWithoutSlippage.add(
    wethAmountInWithoutSlippage.multiply(slippage)
  )

  // Step 3: Build Uniswap Universal router multi-hop swap
  // - WRAP_ETH
  // - WETH -> FXH (V3)
  // - FXH -> ARTCOIN (V2)
  // - SWEEP: remainder of FXH is cleaned
  const commands =
    "0x" +
    UNISWAP_UNIVERSAL_ROUTER_COMMANDS.WRAP_ETH +
    UNISWAP_UNIVERSAL_ROUTER_COMMANDS.V3_SWAP_EXACT_IN +
    UNISWAP_UNIVERSAL_ROUTER_COMMANDS.V2_SWAP_EXACT_IN +
    UNISWAP_UNIVERSAL_ROUTER_COMMANDS.SWEEP

  const inputs = [
    encodeAbiParameters(
      [
        {
          name: "recipient",
          type: "address",
        },
        {
          name: "amount",
          type: "uint256",
        },
      ],
      [UNISWAP_UNIVERSAL_ROUTER, currencyToBigInt(wethAmountIn)]
    ),
    encodeAbiParameters(
      [
        {
          name: "recipient",
          type: "address",
        },
        {
          name: "amountIn",
          type: "uint256",
        },
        {
          name: "amountOutMin",
          type: "uint256",
        },
        {
          name: "path",
          type: "bytes",
        },
        {
          name: "payerIsUser",
          type: "bool",
        },
      ],
      [
        UNISWAP_UNIVERSAL_ROUTER,
        currencyToBigInt(wethAmountIn),
        currencyToBigInt(fxhAmountIn),
        encodeUniswapPathV3(
          WETH.address as `0x${string}`,
          v3Pool.fee,
          $fxh.address as `0x${string}`
        ),
        false,
      ]
    ),
    encodeAbiParameters(
      [
        {
          name: "recipient",
          type: "address",
        },
        {
          name: "amountIn",
          type: "uint256",
        },
        {
          name: "amountOutMin",
          type: "uint256",
        },
        {
          name: "path",
          type: "address[]",
        },
        {
          name: "payerIsUser",
          type: "bool",
        },
      ],
      [
        recipient,
        currencyToBigInt(fxhAmountIn),
        currencyToBigInt(artCoinAmountOut),
        [$fxh.address as `0x${string}`, artCoinAddress],
        false,
      ]
    ),
    encodeAbiParameters(
      [
        { name: "token", type: "address" },
        { name: "recipient", type: "address" },
        { name: "amountMin", type: "uint256" },
      ],
      [$fxh.address as `0x${string}`, recipient, 0n]
    ),
  ]

  const calldata = encodeFunctionData({
    abi: UNISWAP_UNIVERSAL_ROUTER_ABI,
    functionName: "execute",
    args: [commands, inputs],
  })

  return {
    quote: currencyToBigInt(wethAmountIn),
    calldata,
  }
}

async function getUniswapV2PoolReserves(
  publicClient: PublicClient,
  poolAddress: `0x${string}`
) {
  try {
    const res = await publicClient.readContract({
      address: poolAddress,
      functionName: "getReserves",
      abi: UNISWAP_V2_POOL_ABI,
    })
    return { reserve0: res[0], reserve1: res[1] }
  } catch (err: unknown) {
    console.log("failed to get reserves", err)
    throw new Error("failed to get V2 pool reserves")
  }
}

async function getUniswapV3PoolData(
  publicClient: PublicClient,
  poolAddress: `0x${string}`
) {
  try {
    const results = await publicClient.multicall({
      contracts: [
        {
          address: poolAddress,
          abi: UNISWAP_V3_POOL_ABI,
          functionName: "liquidity",
        },
        {
          address: poolAddress,
          abi: UNISWAP_V3_POOL_ABI,
          functionName: "slot0",
        },
        {
          address: poolAddress,
          abi: UNISWAP_V3_POOL_ABI,
          functionName: "fee",
        },
      ],
    })

    const [liquidityResult, slot0Result, feeResult] = results
    if (liquidityResult.status === "failure") {
      console.log("failed to get liquidity", liquidityResult.error)
      throw new Error("failed to get pool liquidity")
    }
    if (slot0Result.status === "failure") {
      console.log("failed to get slot0", slot0Result.error)
      throw new Error("failed to get pool slot0 data")
    }
    if (feeResult.status === "failure") {
      console.log("failed to get fee", feeResult.error)
      throw new Error("failed to get pool fee")
    }

    return {
      liquidity: liquidityResult.result,
      sqrtPriceX96: slot0Result.result[0],
      tick: slot0Result.result[1],
      fee: feeResult.result,
    }
  } catch (err: unknown) {
    console.log("failed to get pool data", err)
    throw new Error("failed to get V3 pool data")
  }
}

/**
 * Converts a Uniswap CurrencyAmount to bigint
 */
function currencyToBigInt(currencyAmount: CurrencyAmount<Token>) {
  return BigInt(currencyAmount.quotient.toString())
}

function encodeUniswapPathV3(
  tokenIn: `0x${string}`,
  fee: number,
  tokenOut: `0x${string}`
) {
  return encodePacked(
    ["address", "uint24", "address"],
    [tokenIn, fee, tokenOut]
  )
}
