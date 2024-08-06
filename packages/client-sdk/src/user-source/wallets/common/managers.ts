import {
  type WalletClient,
  type Transport,
  type Chain,
  type Account,
  type PublicClient,
  type PrivateKeyAccount,
} from "viem"
import { BlockchainNetwork } from "@fxhash/shared"
import { WalletProvider, type Signer } from "@taquito/taquito"
import {
  EthereumWalletManager,
  type EthersAdapter,
  clientToSigner,
} from "@fxhash/eth"
import { config as fxConfig } from "@fxhash/config"
import { TezosWalletManager } from "@fxhash/tez"
import { type IWalletInfo } from "../../_interfaces.js"
import { type AtLeastOne } from "@fxhash/utils"
import { type MapNetworkToWalletManager } from "../../_types.js"

interface IWalletManagerCreateParams<Net extends BlockchainNetwork> {
  info: IWalletInfo<Net>
  source: MapNetworkToWalletManagerCreateSourceInput<Net>
}

type MapNetworkToWalletManagerCreateSourceInput<Net extends BlockchainNetwork> =
  {
    [N in BlockchainNetwork]: {
      [BlockchainNetwork.ETHEREUM]: {
        wallet: WalletClient<Transport, Chain, Account>
        public: PublicClient<Transport, Chain>
        signer?: PrivateKeyAccount
        ethersAdapterForSafe?: EthersAdapter
      }
      [BlockchainNetwork.TEZOS]: AtLeastOne<{
        wallet: WalletProvider
        signer: Signer
      }>
    }[N]
  }[Net]

type FnCreateWalletManager<Net extends BlockchainNetwork> = (
  params: IWalletManagerCreateParams<Net>
) => MapNetworkToWalletManager<Net>

/**
 * Given an EVM wallet interface, returns an Ethereum Wallet Manager instance
 * ready to rock.
 */
export const createEvmWalletManager: FnCreateWalletManager<
  BlockchainNetwork.ETHEREUM
> = ({ info, source }) => {
  return new EthereumWalletManager({
    walletClient: source.wallet,
    publicClient: source.public,
    rpcNodes: fxConfig.eth.apis.rpcs,
    address: info.address,
    signer: source.signer || clientToSigner(source.wallet),
    ethersAdapterForSafe: source.ethersAdapterForSafe,
  })
}

/**
 * Given a tezos wallet interface, returns a Tezos Wallet Manager instance
 * ready to rock.
 */
export const createTezosWalletManager: FnCreateWalletManager<
  BlockchainNetwork.TEZOS
> = ({ info, source }) => {
  return new TezosWalletManager({
    wallet: source,
    address: info.address,
  })
}
