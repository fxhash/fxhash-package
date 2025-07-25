import { IWindowWalletsSource } from "./_interfaces.js"

import {
  Config,
  GetAccountReturnType,
  WatchAccountReturnType,
  getAccount,
  getPublicClient,
  getWalletClient,
  switchChain,
  watchAccount,
  connect,
  disconnect,
  injected,
} from "@wagmi/core"
import { UserRejectedRequestError } from "viem"
import { BlockchainNetwork } from "@fxhash/shared"
import {
  intialization,
  setIntervalCapped,
  sleep,
  failure,
  success,
} from "@fxhash/utils"
import { createEvmWalletManager, walletSource } from "../common/_private.js"
import {
  EvmClientsChainMissmatchError,
  EvmClientsNotAvailableError,
  EvmViemClientGenerationError,
} from "@/index.js"
import { chains } from "@fxhash/eth"
import {
  WalletSourceRequestConnectionUnknownError,
  WalletSourceRequestConnectionRejectedError,
} from "@fxhash/errors"

type Options = {
  wagmiConfig: Config
}

/**
 * Implements wallet source for EIP-1193 spec.
 * <https://eips.ethereum.org/EIPS/eip-1193>
 *
 * The EIP-1193 spec defines a common interface for browser wallets to expose
 * features to interact with the wallet in the page javascript window context.
 *
 * This WalletConnector is designed to:
 * - listen for events emitted by EIP-1193-compliant wallet Providers to
 *   synchronize its internal state, and emit some fxhash client compatible
 *   events based on changes in such a state
 *   <https://eips.ethereum.org/EIPS/eip-1193#events-1>
 * - emit EIP-1193-compliant actions for interacting with wallets synced in
 *   the internal state
 *   <https://eips.ethereum.org/EIPS/eip-1193#request>
 *
 * `@wagmi/core` is used for abstracting the EIP-1193 implementation.
 *
 * @dev The EIP1193 Events Listener should be initialized right when the
 * application starts so that it can listen to the first events emitted by
 * Connectors, and have its internal state in-sync.
 */
export function eip1193WalletSource({
  wagmiConfig,
}: Options): IWindowWalletsSource {
  const _init = intialization()
  let _unwatchAccount: WatchAccountReturnType | null = null

  const wallet = walletSource({
    network: BlockchainNetwork.ETHEREUM,

    init: async () => {
      try {
        _init.start()

        const _handleAccountChange = async (
          account: GetAccountReturnType,
          prevAccount?: GetAccountReturnType
        ) => {
          const accountNormalized = account?.address
            ? {
                address: account.address,
              }
            : null

          if (!prevAccount) {
            // if no account, nothing to process
            if (!account.isConnected) return
            return wallet.utils.update(accountNormalized)
          } else {
            // a change of account
            if (account.address !== prevAccount.address) {
              return wallet.utils.update(accountNormalized)
            }
          }
        }

        _unwatchAccount = watchAccount(wagmiConfig, {
          onChange: _handleAccountChange,
        })

        // this basically achieves doing isReady(wagmiConfig) because we want to
        // get the initial account state here but we can't if its not reconnected
        let steps = 0
        await setIntervalCapped(
          () => {
            if (steps++ < 5) return
            // if not reconnecting after 3 steps, move forward
            if (
              !["connecting", "reconnecting"].includes(wagmiConfig.state.status)
            )
              return true
            return
          },
          {
            delay: 50,
            maxSteps: 50,
          }
        )

        await _handleAccountChange(getAccount(wagmiConfig))
        _init.finish()
      } catch (err) {
        console.error(err)
        throw _init.fail(err)
      }
    },

    disconnect: () => disconnect(wagmiConfig),

    createManager: async info => {
      if (!info) return failure(new EvmClientsNotAvailableError())

      /**
       * @dev Here is a little hack to get some kind of "on('walletReady')"
       * behaviour. `getWalletClient` internally calls
       * state.connections.get(state.current) to get the connector instance,
       * however it takes some small amount of time for the full connector
       * to be ready. One way to test this is to check for the `getChainId`
       * function to be available. Once it is, then we can move forward in the
       * process.
       * **Warning**: these APIs are marked as "internal" and are not part of
       * the versionned API, so there might be undocumented breaking changes
       * here.
       */
      let connection = null
      {
        for (let i = 0; i < 20; i++) {
          if (!wagmiConfig.state.current!) break // shoudn't happen
          connection = wagmiConfig.state.connections.get(
            wagmiConfig.state.current!
          )
          if (connection && (connection.connector as any)?.getChainId) break
          await sleep(100)
        }
      }

      let walletClient = await getWalletClient(wagmiConfig)
      // The client can possiblly be connected to a different chain in that
      // (e.g. by changin the chain in the wallet extension). In that case the
      // walletClient.chain will be undefined, so we attempt to switch to
      // expected the chain if it doesnt work we return an error.
      if (!walletClient.chain) {
        try {
          await switchChain(wagmiConfig, { chainId: chains.ETHEREUM.id })
          walletClient = await getWalletClient(wagmiConfig)
          if (!walletClient.chain) throw new Error()
        } catch (err) {
          return failure(new EvmClientsChainMissmatchError())
        }
      }

      const publicClient = getPublicClient(wagmiConfig)

      if (!walletClient || !publicClient) {
        return failure(new EvmViemClientGenerationError())
      }

      return success(
        createEvmWalletManager({
          info,
          source: {
            public: publicClient,
            wallet: walletClient,
          },
          connector: connection?.connector,
        })
      )
    },

    requirements: () => ({
      userInput: true,
    }),
  })

  return {
    ...wallet.source,
    release: () => _unwatchAccount?.(),
    requestConnection: async () => {
      try {
        _init.check()
        // todo: wassup with connect: injected() is this the right way ?
        await connect(wagmiConfig, { connector: injected() })
      } catch (e) {
        if (e instanceof UserRejectedRequestError)
          return failure(new WalletSourceRequestConnectionRejectedError())
        return failure(
          new WalletSourceRequestConnectionUnknownError(
            (e as Error).message ?? "Unknown error"
          )
        )
      }
      return success()
    },
  }
}
