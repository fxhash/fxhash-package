import { FxhashContracts } from "@/types/Contracts"
import { GenerativeTokenMetadata } from "@/types/Metadata"
import { MintGenerativeData } from "@/types/Mint"
import { transformGenTokFormToNumbers } from "@/utils/transformers/gen-tok-input-form"
import { ContractOperation } from "./contractOperation"
import {
  BaseError,
  ContractFunctionRevertedError,
  TransactionReceipt,
  getContract,
} from "viem"
import { FxIssuerFactory__factory, ISplitsMain__factory } from "@/contracts"

export type TMintIssuerV3OperationParams = {
  data: MintGenerativeData<string>
  metadata: GenerativeTokenMetadata
  metadataBytes: string
  // todo: have some better data for ticket settings ?
  ticketMetadataBytes: string
}

/**
 * Mint an unique iteration of a Generative Token
 */
export class MintIssuerV3Operation extends ContractOperation<TMintIssuerV3OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    // transform the string values in the form into some numbers so that
    // it can be sent to contract correctly (or packed)
    const numbered = transformGenTokFormToNumbers(this.params.data)
    const distribution = numbered.distribution

    const splitsFactory = getContract({
      address: FxhashContracts.ETH_SPLITS_MAIN as `0x${string}`,
      abi: ISplitsMain__factory.abi,
      walletClient: this.manager.walletClient,
      publicClient: this.manager.getCurrentConfig().publicClient,
    })

    const splitsAddress = await splitsFactory.read.predictImmutableSplitAddress(
      [
        distribution.splitsPrimary.map(split => split.address as `0x${string}`),
        distribution.splitsPrimary.map(split => split.pct),
        0,
      ]
    )

    const account = this.manager.account
    try {
      const { request } = await this.manager
        .getCurrentConfig()
        .publicClient.simulateContract({
          address: FxhashContracts.ETH_PROJECT_FACTORY as `0x${string}`,
          abi: FxIssuerFactory__factory.abi,
          functionName: "createProject",
          args: [
            account,
            splitsAddress,
            {
              enabled: distribution.enabled,
              onchain: false,
              supply: BigInt(distribution.editions),
              contractURI: this.params.metadataBytes,
              metadataInfo: {
                //TODO: TBD to see how we can do that
                baseURI: this.params.data.cidUrlParams,
                imageURI: this.params.data.cidUrlParams,
                animation: {
                  bodyTags: [],
                  headTags: [],
                },
                attributes: {
                  bodyTags: [],
                  headTags: [],
                },
              },
            },
            [],
            distribution.splitsSecondary.map(
              split => split.address as `0x${string}`
            ),
            distribution.splitsSecondary.map(split => BigInt(split.pct)),
          ],
          account: account,
        })
      const hash = await this.manager.walletClient.writeContract({
        ...request,
        account: account,
      })
      const receipt = await this.manager
        .getCurrentConfig()
        .publicClient.waitForTransactionReceipt({ hash: hash })
      console.log("tx success: ", receipt)
      return receipt
    } catch (error) {
      if (error instanceof BaseError) {
        const revertError = error.walk(
          err => err instanceof ContractFunctionRevertedError
        )
        if (revertError instanceof ContractFunctionRevertedError) {
          const errorName = revertError.data?.errorName ?? ""
          // do something with `errorName`
          console.log("errorName: ", errorName)
          throw Error("Failed")
        }
      }
      return undefined
    }
  }

  success(): string {
    return this.params.data.collaboration
      ? `A request to publish ${this.params.metadata.name} was successfully sent`
      : `Your project ${this.params.metadata.name} is successfully published`
  }
}
