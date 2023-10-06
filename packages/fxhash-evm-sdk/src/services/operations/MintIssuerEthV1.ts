import { FxhashContracts } from "@/types/Contracts"
import { GenerativeTokenMetadata } from "@/types/Metadata"
import { MintGenerativeData } from "@/types/Mint"
import { transformGenTokFormToNumbers } from "@/utils/transformers/gen-tok-input-form"
import { ContractOperation } from "./contractOperation"
import { TransactionReceipt, getContract, numberToHex } from "viem"
import { ABI as ISplitsMainABI } from "@/contracts/ISplitsMain"
import { ABI as IssuerFactoryABI } from "@/contracts/FxIssuerFactory"
import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { getConfig } from "../Wallet"

export type TMintEthIssuerV1OperationParams = {
  data: MintGenerativeData<string>
  metadata: GenerativeTokenMetadata
  metadataBytes: string
  // todo: have some better data for ticket settings ?
  ticketMetadataBytes: string
}

/**
 * Mint an unique iteration of a Generative Token
 */
export class MintEthIssuerV1Operation extends ContractOperation<TMintEthIssuerV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<TransactionReceipt> {
    // transform the string values in the form into some numbers so that
    // it can be sent to contract correctly (or packed)
    const numbered = transformGenTokFormToNumbers(this.params.data)
    const distribution = numbered.distribution

    //TODO: we don't necessarily want to always create a mint, we'll need to make it optional
    //fetch the splits factory contract data
    const splitsFactory = getContract({
      address: FxhashContracts.ETH_SPLITS_MAIN as `0x${string}`,
      abi: ISplitsMainABI,
      walletClient: this.manager.walletClient,
      publicClient: getConfig().publicClient,
    })

    //since we are using splits, we need to create the splits first. So we get the immutable address of the splits
    const splitsAddress = await splitsFactory.read.predictImmutableSplitAddress(
      [
        distribution.splitsPrimary.map(split => split.address as `0x${string}`),
        distribution.splitsPrimary.map(split => split.pct),
        0,
      ]
    )

    //get the address from the wallet
    const account = this.manager.walletClient.account.address

    //prepare the actual request to be able to simulate the transaction outcome
    const args: SimulateAndExecuteContractRequest = {
      address: FxhashContracts.ETH_PROJECT_FACTORY as `0x${string}`,
      abi: IssuerFactoryABI,
      functionName: "createProject",
      args: [
        account,
        splitsAddress,
        {
          enabled: distribution.enabled,
          //TODO: to impl
          onchain: false,
          supply: distribution.editions,
          contractURI: this.params.metadata.generativeUri,
        },
        {
          baseURI: this.params.metadata.artifactUri,
          imageURI: this.params.metadata.thumbnailUri,
          //TODO: implement it for scripty
          animation: {
            bodyTags: [],
            headTags: [],
          },
          attributes: {
            bodyTags: [],
            headTags: [],
          },
        },
        [
          {
            minter: FxhashContracts.ETH_FIXED_PRICE_MINTER_V1,
            reserveInfo: {
              //TODO: fix that
              startTime: 0,
              //TODO: fix that too
              endTime: new Date().getTime() + 9999,
              allocation: distribution.editions,
            },
            //TODO: fix that, needs to be dynamic and adapat to pricing
            params: numberToHex(distribution.pricing.pricingFixed.price, {
              size: 32,
            }),
          },
        ],
        distribution.splitsSecondary.map(
          split => split.address as `0x${string}`
        ),
        distribution.splitsSecondary.map(split => BigInt(split.pct)),
      ],
      account: account,
    }
    //simulate the transaction and execute it, will throw an error if it fails
    return simulateAndExecuteContract(
      getConfig().publicClient,
      this.manager.walletClient,
      args
    )
  }

  success(): string {
    return this.params.data.collaboration
      ? `A request to publish ${this.params.metadata.name} was successfully sent`
      : `Your project ${this.params.metadata.name} is successfully published`
  }
}
