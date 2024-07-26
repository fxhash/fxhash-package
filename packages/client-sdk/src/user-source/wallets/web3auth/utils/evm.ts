import { BlockchainNetwork } from "@fxhash/shared"
import { type Web3AuthFrameManager } from "../FrameManager.js"
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
import { type IWeb3AuthWalletUtil } from "../_interfaces.js"
import { computeAddress } from "ethers"
import { EthereumWalletManager } from "@fxhash/eth"
import { createEvmWalletManager } from "../../common.js"

type Options = Web3AuthFrameManager

export function evmWeb3AuthWallet(
  frameManager: Options
): IWeb3AuthWalletUtil<BlockchainNetwork.ETHEREUM> {
  let _address: Hash | null = null
  let _manager: EthereumWalletManager | null = null

  const getInfo = () => (_address ? { address: _address } : null)

  const _updateAddress = (address: Hash | null) => {
    _address = address
    const info = getInfo()

    if (!info) {
      _manager = null
      return
    }

    // todo: how to have multichain here ? possible ?
    // maybe use a wagmi util instead ?
    const chain = sepolia
    const transport = http()

    _manager = createEvmWalletManager({
      info,
      source: {
        public: createPublicClient({
          chain,
          transport,
        }),
        wallet: createWalletClient({
          account: toAccount(
            frameManagerEvmAccountSource(frameManager, info.address)
          ),
          chain,
          transport,
        }),
      },
    })
  }

  return {
    update: details => {
      _updateAddress(
        details
          ? (computeAddress(
              details.providerDetails.compressedPublicKey
            ) as Hash)
          : null
      )
    },
    getWalletManager: () => _manager,
    getInfo,
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
