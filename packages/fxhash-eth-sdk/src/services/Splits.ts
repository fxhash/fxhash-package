import { SplitsClient } from "@0xsplits/splits-sdk"
import { CURRENT_CHAIN } from "./Wallet"
import { PublicClient, WalletClient, getContract } from "viem"
import { FxhashContracts } from "@/contracts/Contracts"
import {
  FX_TICKETS_FACTORY_ABI,
  FX_ISSUER_FACTORY_ABI,
  SPLITS_MAIN_ABI,
  ZERO_ADDRESS,
} from ".."

export const SPLITS_ETHER_TOKEN = "0x0000000000000000000000000000000000000000"

export function getSplitsClient(
  publicClient: PublicClient,
  walletClient: WalletClient
): SplitsClient {
  return new SplitsClient({
    chainId: CURRENT_CHAIN.id,
    // TODO: for some reason the splits sdk is not happy with the client types but it seems to work fine
    // @ts-ignore
    publicClient: publicClient, // viem public client (optional, required if using any of the contract functions)
    // TODO: for some reason the splits sdk is not happy with the client types but it seems to work fine
    // @ts-ignore
    walletClient: walletClient, // viem wallet client (optional, required if using any contract write functions. must have an account already attached)
  })
}

export async function predictImmutableSplitsAddress(
  publicClient: PublicClient,
  receivers: `0x${string}`[],
  allocations: number[]
) {
  const splitsMain = getContract({
    address: FxhashContracts.ETH_SPLITS_MAIN,
    abi: SPLITS_MAIN_ABI,
    publicClient: publicClient,
  })
  const predictedAddress = await splitsMain.read.predictImmutableSplitAddress([
    receivers,
    allocations,
    0,
  ])
  return predictedAddress as string
}
