import { BlockchainNetwork } from "@fxhash/shared"
import { type Web3AuthFrameManager } from "../FrameManager.js"
import {
  type Hash,
  type CustomTransport,
  createPublicClient,
  createWalletClient,
  http,
  createTransport,
  InternalRpcError,
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

/**
 * Viem uses Transports to send requests to wallets using the EVM JSON RPC spec,
 * more specifically EIP-1193 but not only (ex EIP-3085). Because the wallet
 * which can sign bytes is running in the <iframe>, we are proxying the requests
 * made by viem when wallet interaction is required towards our wallets <iframe>
 * which implements support for responding to EVM JSON RPC requests in a same
 * way a local client would.
 * @param frameManager Active Frame Manager to which requests can be sent to.
 * @returns A factory which can instanciate a transport given some settings.
 */
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
        const response = await frameManager.sendRequest({
          type: "evm__json-rpc",
          body: {
            method,
            params,
          },
        })
        console.log({ response })
        if (response.isFailure()) {
          throw new InternalRpcError(response.error)
        }
        if (response.value?.error) {
          // will be parsed as a RPC error
          // https://github.com/wevm/viem/blob/55ef649e060c791fbf21fa4fa180fcf411c36799/src/utils/buildRequest.ts#L123
          throw response.value.error
        }
        return response.value
      },
    })
  }
}
