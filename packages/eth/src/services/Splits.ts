import { SplitsClient } from "@0xsplits/splits-sdk"
import { BlockchainType } from "@fxhash/shared"
import { Account, Chain, PublicClient, Transport, WalletClient } from "viem"
import { getChainIdForChain } from "./Wallet"

export const SPLITS_ETHER_TOKEN = "0x0000000000000000000000000000000000000000"

export function getSplitsClient(
  chain: BlockchainType,
  publicClient?: PublicClient<Transport, Chain>,
  walletClient?: WalletClient<Transport, Chain, Account>
): SplitsClient {
  return new SplitsClient({
    chainId: getChainIdForChain(chain),
    // viem public client (optional, required if using any of the contract functions)
    // @ts-ignore Upgrade split sdk to v4 once published
    publicClient: publicClient,
    // viem wallet client (optional, required if using any contract write functions. must have an account already attached)
    // @ts-ignore Upgrade split sdk to v4 once published
    walletClient: walletClient,
  })
}
