import { SplitsClient } from "@0xsplits/splits-sdk"
import { CURRENT_CHAIN } from "./Wallet"
import { PublicClient, WalletClient } from "viem"

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
