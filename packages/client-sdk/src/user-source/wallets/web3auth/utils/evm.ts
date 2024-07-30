import { BlockchainNetwork } from "@fxhash/shared"
import { type Web3AuthFrameManager } from "../FrameManager.js"
import {
  type Hash,
  type CustomTransport,
  createPublicClient,
  createWalletClient,
  http,
  createTransport,
} from "viem"
import { type IWeb3AuthWalletUtil } from "../_interfaces.js"
import { computeAddress } from "ethers"
import { type IWalletConnected, type IWalletInfo } from "@/index.js"
import { createEvmWalletManager } from "../../common/_private.js"
import { chains } from "@fxhash/eth"

type Options = Web3AuthFrameManager

export function evmWeb3AuthWallet(
  frameManager: Options
): IWeb3AuthWalletUtil<BlockchainNetwork.ETHEREUM> {
  let _connected: IWalletConnected<BlockchainNetwork.ETHEREUM> | null = null

  const _updateAddress = (address: Hash | null) => {
    if (!address) {
      _connected = null
      return
    }

    const info: IWalletInfo<BlockchainNetwork.ETHEREUM> = {
      address,
    }

    const chain = chains.ETHEREUM
    _connected = {
      info,
      manager: createEvmWalletManager({
        info,
        source: {
          public: createPublicClient({
            chain,
            transport: http(),
          }),
          wallet: createWalletClient({
            account: info.address,
            chain,
            transport: frameManagerTransport(frameManager),
          }),
        },
      }),
    }
  }

  return {
    getWalletConnected: () => _connected,
    update: details => {
      _updateAddress(
        details
          ? (computeAddress(
              details.providerDetails.compressedPublicKey
            ) as Hash)
          : null
      )
    },
  }
}

// todo
// - comment this fn
// - wallets, initial blockchain initialized from config (grab from @fxhash.eth)
//   package
// - cleanup wallets, rn a bit too much code, messy
// - clean packages used in wallets api
function frameManagerTransport(
  frameManager: Web3AuthFrameManager
): CustomTransport {
  return ({ retryCount }) => {
    return createTransport({
      key: "fxhash-web3auth-frame",
      name: "fxhash Web3Auth Frame",
      type: "custom",
      retryCount,
      async request({ method, params }) {
        const frameResponse = await frameManager.sendRequest({
          type: "evm__json-rpc",
          body: {
            method,
            params,
          },
        })
        if (frameResponse.isFailure()) {
          throw frameResponse.error
        }
        return frameResponse.value
      },
    })
  }
}
