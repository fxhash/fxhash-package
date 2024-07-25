import { EvmWindowWallet } from "./_interfaces.js"

import {
  Config,
  GetAccountReturnType,
  WatchAccountReturnType,
  getAccount,
  getPublicClient,
  getWalletClient,
  watchAccount,
  connect,
  disconnect,
  injected,
  getConnections,
} from "@wagmi/core"
import { IWalletInfo, WalletEventEmitter } from "../_interfaces.js"
import { failure, success } from "@fxhash/shared"
import {
  EvmClientsNotAvailable,
  EvmWagmiClientGenerationError,
} from "../../_errors.js"
import { intialization, setIntervalCapped, sleep } from "@fxhash/utils"
import { Address } from "viem"

type Options = {
  wagmiConfig: Config
}

/**
 * @author fxhash
 *
 * Implements wallet connection for EIP-1193 spec.
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
export function eip1193WalletConnector({
  wagmiConfig,
}: Options): EvmWindowWallet {
  const _init = intialization()
  const emitter = new WalletEventEmitter()
  let _unwatchAccount: WatchAccountReturnType | null = null
  let _info: IWalletInfo<Address> | null = null

  const _accountChangedEvent = async (account: GetAccountReturnType) => {
    const prevInfo = _info
    _info = account?.address
      ? {
          address: account.address,
        }
      : null
    if (prevInfo?.address !== _info?.address) {
      console.log("emit wallet-changed")
      await emitter.emit("wallet-changed", _info)
    }
  }

  const _handleAccountChange = async (
    account: GetAccountReturnType,
    prevAccount?: GetAccountReturnType
  ) => {
    if (!prevAccount) {
      // if no account, nothing to process
      if (!account.isConnected) return
      return _accountChangedEvent(account)
    } else {
      // a change of account
      if (account.address !== prevAccount.address) {
        return _accountChangedEvent(account)
      }
    }
  }

  return {
    emitter,

    init: async () => {
      _init.start()
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
          if (wagmiConfig.state.status !== "reconnecting") return true
          return
        },
        {
          delay: 50,
          maxSteps: 20,
        }
      )

      await _handleAccountChange(getAccount(wagmiConfig))
      _init.finish()
    },

    getInfo: () => _info,

    release: () => _unwatchAccount?.(),

    getClients: async () => {
      if (!_info) {
        return failure(new EvmClientsNotAvailable())
      }

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
      {
        for (let i = 0; i < 20; i++) {
          if (!wagmiConfig.state.current!) break // shoudn't happen
          const connection = wagmiConfig.state.connections.get(
            wagmiConfig.state.current!
          )
          if (connection && (connection.connector as any).getChainId) break
          await sleep(100)
        }
      }
      const walletClient = await getWalletClient(wagmiConfig)
      const publicClient = getPublicClient(wagmiConfig)

      if (!walletClient || !publicClient) {
        return failure(new EvmWagmiClientGenerationError())
      }

      return success({
        public: publicClient,
        wallet: walletClient,
      })
    },

    disconnect: () => disconnect(wagmiConfig),

    // todo: wassup with connect: injected() is this the right way ?
    requestConnection: () => connect(wagmiConfig, { connector: injected() }),

    requirements: () => ({
      userInput: true,
    }),
  }
}
