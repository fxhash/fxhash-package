import { failure, invariant, success } from "@fxhash/shared"
import { WalletEventEmitter } from "../_interfaces.js"
import { EvmWagmiClientGenerationError } from "../../_errors.js"
import { type Web3AuthFrameManager } from "./FrameManager.js"
import {
  type AccountSource,
  type Hash,
  type SerializeTransactionFn,
  type SignableMessage,
  type TransactionSerializable,
  type TypedData,
  type TypedDataDefinition,
  createPublicClient,
  createWalletClient,
  http,
} from "viem"
import { toAccount } from "viem/accounts"
import { sepolia } from "viem/chains"
import { type EvmWeb3AuthWallet } from "./_interfaces.js"
import { computeAddress } from "ethers"

type Options = Web3AuthFrameManager

export function evmWeb3AuthWallet(frameManager: Options): EvmWeb3AuthWallet {
  const emitter = new WalletEventEmitter()
  let _address: Hash | null = null

  const _updateAddress = (address: Hash | null) => {
    if (address !== _address) {
      _address = address
      emitter.emit(
        "wallet-changed",
        address
          ? {
              address,
            }
          : null
      )
    }
  }

  return {
    emitter,

    init: async () => {},

    updateSession: details => {
      _updateAddress(
        details
          ? (computeAddress(
              details.providerDetails.compressedPublicKey
            ) as Hash)
          : null
      )
    },

    getClients: async () => {
      invariant(_address, "EVM address missing when requesting client")

      try {
        // todo: how to have multichain here ? possible ?
        // maybe use a wagmi util instead ?
        const chain = sepolia
        const transport = http()
        const publicClient = createPublicClient({
          chain,
          transport,
        })
        const walletClient = createWalletClient({
          account: toAccount(
            frameManagerEvmAccountSource(frameManager, _address)
          ),
          chain,
          transport,
        })

        return success({
          public: publicClient,
          wallet: walletClient,
        })
      } catch (err: any) {
        return failure(new EvmWagmiClientGenerationError())
      }
    },

    getInfo: () => (_address ? { address: _address } : null),

    release: () => {},

    disconnect: async () => {
      const res = await frameManager.logout()
      if (res.isFailure()) throw res.error
      _address = null
    },
  }
}

/**
 * Given a FrameManager and an account Address, returns an AccountSource which
 * can be used to create a Viem Wallet Client.
 * @param frameManager Active Frame Manager
 * @param address Address of the account
 * @returns An AccountSource which can be used as an account for viem to sign
 * transactions, messages
 */
function frameManagerEvmAccountSource(
  frameManager: Web3AuthFrameManager,
  address: Hash
): AccountSource {
  return {
    address: address,
    signMessage: async ({
      message,
    }: {
      message: SignableMessage
    }): Promise<Hash> => {
      const res = await frameManager.sendRequest({
        type: "evm__sign-message",
        body: {
          chain: "ETHEREUM",
          message: message.toString(),
        },
      })
      if (res.isSuccess()) return res.unwrap() as Hash
      throw res.error
    },

    signTransaction: async <
      serializer extends
        SerializeTransactionFn<TransactionSerializable> = SerializeTransactionFn<TransactionSerializable>,
      transaction extends Parameters<serializer>[0] = Parameters<serializer>[0],
    >(
      transaction: transaction
    ): Promise<any> => {
      const res = await frameManager.sendRequest({
        type: "evm__sign-transaction",
        body: {
          chain: "ETHEREUM",
          transaction: {
            from: address,
            ...transaction,
          },
        },
      })
      if (res.isSuccess()) return res.unwrap()
      throw res.error
    },

    signTypedData: async <
      const typedData extends TypedData | Record<string, unknown>,
      primaryType extends keyof typedData | "EIP712Domain" = keyof typedData,
    >(
      _: TypedDataDefinition<typedData, primaryType>
    ): Promise<Hash> => {
      throw "TODO but ez"
    },
  }
}
