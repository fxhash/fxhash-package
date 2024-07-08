import { EthereumContractOperation } from "@/services/operations/contractOperation.js"
import { encodeFunctionData } from "viem"

import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon.js"
import { Qu_GetEthMinterProceeds } from "@fxhash/gql"
import { MULTICALL3_ABI } from "@/abi/Multicall3.js"
import {
  FIXED_PRICE_MINTER_ABI,
  DUTCH_AUCTION_MINTER_ABI,
} from "@/abi/index.js"
import { getSplitsClient, SPLITS_ETHER_TOKEN } from "../Splits.js"
import { CallData } from "@0xsplits/splits-sdk"
import {
  TransactionUnknownError,
  TransactionType,
  invariant,
  BlockchainType,
} from "@fxhash/shared"
import { getConfigForChain, getCurrentChain } from "../Wallet.js"
import gqlClient from "@fxhash/gql-client"
import { DUTCH_AUCTION_MINTER_V2_ABI } from "@/abi/DutchAuctionMinterV2.js"
import { FIXED_PRICE_MINTER_V2_ABI } from "@/abi/FixedPriceMinterV2.js"

export type TWithdrawAllEthV1OperationParams = {
  address: string
}

/**
 * Complex batched operation to withdraw all earning for a user
 * The process is the following:
 * 1. Get earnings from the indexer
 * 2. Prepare the withdraw calls for the minters
 * 3. Prepare the withdraw calls for the splits
 * 4. Prepare the distribute calls for the splits
 * 5. Call multicall
 */
export class WithdrawAllEthV1Operation extends EthereumContractOperation<TWithdrawAllEthV1OperationParams> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
  async prepare() {}
  async call(): Promise<{ type: TransactionType; hash: string }> {
    const currentConfig = getConfigForChain(this.chain)
    const chainId = getCurrentChain(this.chain).id
    //First we need to fetch the proceeds for the address
    const proceeds = await gqlClient.query(Qu_GetEthMinterProceeds, {
      where: {
        user_address: {
          _eq: this.params.address,
        },
        chain: {
          _eq: this.chain === BlockchainType.ETHEREUM ? "ETHEREUM" : "BASE",
        },
      },
    })

    const multicallArgs: CallData[] = []
    const splitsWithEarnings: string[] = []

    invariant(
      proceeds.data?.onchain &&
        proceeds.data.onchain.eth_minter_proceeds.length > 0,
      "No proceeds found"
    )

    const withdrawableProceeds =
      proceeds.data.onchain.eth_minter_proceeds.filter(
        (proceed: any) => proceed.amount > 0
      )

    //we loop on the all the minters, to prepare the withdraw operations
    for (const minterProceeds of withdrawableProceeds) {
      const isDutchAuction =
        minterProceeds.minter_address ===
          currentConfig.contracts.dutch_auction_minter_v1 ||
        minterProceeds.minter_address ===
          currentConfig.contracts.dutch_auction_minter_v2
      const isV2 =
        minterProceeds.minter_address ===
          currentConfig.contracts.dutch_auction_minter_v2 ||
        minterProceeds.minter_address ===
          currentConfig.contracts.fixed_price_minter_v2
      const abi = isDutchAuction
        ? isV2
          ? DUTCH_AUCTION_MINTER_V2_ABI
          : DUTCH_AUCTION_MINTER_ABI
        : isV2
          ? FIXED_PRICE_MINTER_V2_ABI
          : FIXED_PRICE_MINTER_ABI

      const args = isDutchAuction
        ? [minterProceeds.token_address, minterProceeds.reserve_id]
        : [minterProceeds.token_address]

      const multicallPayload = {
        address: minterProceeds.minter_address as `0x${string}`,
        data: encodeFunctionData({
          abi: abi,
          functionName: "withdraw",
          args: args,
        }),
      }
      if (
        !multicallArgs.find(
          m =>
            m.address === multicallPayload.address &&
            m.data === multicallPayload.data
        )
      ) {
        multicallArgs.push(multicallPayload)
      }
      splitsWithEarnings.push(minterProceeds.primary_receiver)
    }

    /**
     * after triggering the minters withdraw, money will be sent to the splits
     * it means we now have to withdraw from the splits
     */
    const splitsClient = getSplitsClient(
      this.chain,
      this.manager.publicClient,
      this.manager.walletClient
    )

    //we fetch all the splits related to the user
    //we get the current user splits having money
    const userSplits = await splitsClient.dataClient?.getUserEarningsByContract(
      {
        userAddress: this.params.address,
        chainId: chainId,
      }
    )

    //we transform the list of splits into a list of split addresses
    const filteredUserSplits = splitsWithEarnings.concat(
      Object.keys(userSplits?.activeBalances || {})
    )

    //we remove duplicates
    const splitSet = new Set(filteredUserSplits)

    //before withdrawing, we first need to distribute the funds
    const distributeCalls = await Promise.all(
      [...splitSet].map(async split => {
        return await splitsClient.splitV1!.callData.distributeToken({
          splitAddress: split,
          token: SPLITS_ETHER_TOKEN,
        })
      })
    )
    multicallArgs.push(...distributeCalls)

    //now that this is done we can finally withdraw them
    for (const split of splitsWithEarnings) {
      //we fetch the splits recipient
      const splitMetadata = await splitsClient.dataClient?.getSplitMetadata({
        chainId: chainId,
        splitAddress: split,
      })
      if (!splitMetadata) {
        throw new Error("Split metadata not found")
      }

      //format the list to be easily usable
      const recipientAddresses = splitMetadata.recipients.map(
        recipient => recipient.recipient.address
      )
      //now we prepare the withdraw calls
      const withdrawCalls = await Promise.all(
        recipientAddresses.map(async address => {
          return await splitsClient.splitV1!.callData.withdrawFunds({
            address: address,
            tokens: [SPLITS_ETHER_TOKEN],
          })
        })
      )
      multicallArgs.push(...withdrawCalls)
    }

    //we properly format the payload for multicall
    const callRequests = multicallArgs.map(call => {
      return {
        target: call.address,
        callData: call.data,
      }
    })

    //if we have anything to do, we trigger the call, otherwise return undefined
    if (callRequests.length > 0) {
      const args: SimulateAndExecuteContractRequest = {
        address: currentConfig.contracts.multicall3 as `0x${string}`,
        abi: MULTICALL3_ABI,
        functionName: "aggregate",
        args: [callRequests],
        account: this.manager.address as `0x${string}`,
        chain: getCurrentChain(this.chain),
      }
      const transactionHash = await simulateAndExecuteContract(
        this.manager,
        args
      )
      return {
        type: TransactionType.ONCHAIN,
        hash: transactionHash,
      }
    } else {
      throw new TransactionUnknownError("Nothing to withdraw")
    }
  }
  success(): string {
    return `Successfully withdrew all eth from minters and splits`
  }
}
