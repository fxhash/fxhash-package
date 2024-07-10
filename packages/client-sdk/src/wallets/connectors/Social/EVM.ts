import {
  BlockchainType,
  PromiseResult,
  failure,
  invariant,
  success,
} from "@fxhash/shared"
import {
  IEvmWalletConnector,
  IEvmWalletConnectorClients,
} from "../_interfaces.js"
import {
  EvmClientsNotAvailable,
  BlockchainNotSupported,
  EvmWagmiClientGenerationError,
} from "../errors.js"
import { SocialWalletsFrameManager } from "./FrameManager.js"
import {
  AccountSource,
  Hash,
  SerializeTransactionFn,
  SignableMessage,
  TransactionSerializable,
  TypedData,
  TypedDataDefinition,
  createPublicClient,
  createWalletClient,
  http,
} from "viem"
import { toAccount } from "viem/accounts"
import { chainDefinitions } from "../_index.js"
import { sepolia } from "viem/chains"
import { config } from "@fxhash/config"

export class EvmSocialWalletConnector implements IEvmWalletConnector {
  private _frameManager: SocialWalletsFrameManager
  private _address: Hash | null = null

  constructor(frameManager: SocialWalletsFrameManager) {
    this._frameManager = frameManager
  }

  async init() {}

  public async getClients(
    blockchain: BlockchainType
  ): PromiseResult<
    IEvmWalletConnectorClients,
    | EvmClientsNotAvailable
    | BlockchainNotSupported
    | EvmWagmiClientGenerationError
  > {
    invariant(this._address, "EVM address missing when requesting client")
    invariant(blockchain !== BlockchainType.TEZOS, "tezos unsupported")

    try {
      const chain = chainDefinitions[blockchain] as typeof sepolia
      const transport = http(config.eth.apis.rpcs[0])
      const publicClient = createPublicClient({
        chain,
        transport,
      })
      const walletClient = createWalletClient({
        account: toAccount(
          frameManagerEvmAccountSource(this._frameManager, this._address)
        ),
        // todo: how to have multichain here ? possible ?
        // maybe use a wagmi util instead ?
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
  }

  public getAccount() {
    return this._address
      ? {
          address: this._address,
        }
      : null
  }

  public release() {}

  public async disconnect() {
    const res = await this._frameManager.logout()
    if (res.isFailure()) throw res.error
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
  frameManager: SocialWalletsFrameManager,
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
