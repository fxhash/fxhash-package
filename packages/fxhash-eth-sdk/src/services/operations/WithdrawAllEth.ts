import { EthereumContractOperation } from "@/services/operations/contractOperation"
import { encodeFunctionData, TransactionReceipt } from "viem"

import {
  simulateAndExecuteContract,
  SimulateAndExecuteContractRequest,
} from "@/services/operations/EthCommon"
import { apolloClient } from "../Hasura"
import { Qu_GetEthPrimarySplits, Qu_GetEthProceeds } from "@fxhash/gql"
import { config } from "@fxhash/config"
import { MULTICALL3_ABI } from "@/abi/Multicall3"
import { FIXED_PRICE_MINTER_ABI, DUTCH_AUCTION_MINTER_ABI } from "@/abi"
import { getSplitsClient, SPLITS_ETHER_TOKEN } from "../Splits"
import { CallData } from "@0xsplits/splits-sdk"

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
  async call(): Promise<TransactionReceipt | string> {
    //First we need to fetch the proceeds for the address
    const proceeds = await apolloClient.query({
      query: Qu_GetEthProceeds,
      variables: {
        where: {
          id: {
            _eq: this.params.address,
          },
        },
      },
    })

    const multicallArgs: CallData[] = []
    const tokensWithEarnings: string[] = []
    //we loop on the all the minters, to prepare the withdraw operations
    for (const minterProceeds of proceeds.data.onchain.eth_token_proceeds) {
      //first we process dutch auction earnings
      for (const dutchAuctionProceeds of minterProceeds.dutch_auction_proceeds) {
        multicallArgs.push({
          address: config.eth.contracts
            .dutch_auction_minter_v1 as `0x${string}`,
          data: encodeFunctionData({
            abi: DUTCH_AUCTION_MINTER_ABI,
            functionName: "withdraw",
            args: [
              dutchAuctionProceeds.tokenAddress,
              dutchAuctionProceeds.reserveId,
            ],
          }),
        })
        tokensWithEarnings.push(dutchAuctionProceeds.primaryReceiver)
      }

      //then fixed price minter earnings
      for (const fixedPriceProceeds of minterProceeds.fixed_price_proceeds) {
        multicallArgs.push({
          address: config.eth.contracts.fixed_price_minter_v1 as `0x${string}`,
          data: encodeFunctionData({
            abi: FIXED_PRICE_MINTER_ABI,
            functionName: "withdraw",
            args: [fixedPriceProceeds.tokenAddress],
          }),
        })
        tokensWithEarnings.push(fixedPriceProceeds.primaryReceiver)
      }
    }

    /**
     * after triggering the minters withdraw, money will be sent to the splits
     * it means we now have to withdraw from the splits
     */
    const splitsClient = getSplitsClient(
      this.manager.publicClient,
      this.manager.walletClient
    )

    //we fetch all the splits related to the user
    //we get the current user splits having money
    const userSplits = await splitsClient.getUserEarningsByContract({
      userAddress: this.params.address,
    })

    //we transform the list of splits into a list of split addresses
    const filteredUserSplits = Object.keys(userSplits.activeBalances)

    //we fetch the primary receiver for each split that will receive money
    const primarySplitsWithProceeds = await apolloClient.query({
      query: Qu_GetEthPrimarySplits,
      variables: {
        where: {
          id: {
            _in: tokensWithEarnings,
          },
          receiver: {
            _eq: this.params.address,
          },
        },
      },
    })

    for (const split of primarySplitsWithProceeds.data.onchain
      .eth_primary_splits) {
      filteredUserSplits.push(split.receiver)
    }

    //before distributing, we first need to withdraw the funds
    for (const split of tokensWithEarnings) {
      //we fetch the splits recipient
      const { recipients } = await splitsClient.getSplitMetadata({
        splitAddress: split,
      })
      //format the list to be easily usable
      const recipientAddresses = recipients.map(
        recipient => recipient.recipient.address
      )
      //now we prepare the withdraw calls
      const withdrawCalls = await Promise.all(
        recipientAddresses.map(async address => {
          return await splitsClient.callData.withdrawFunds({
            address: address,
            tokens: [SPLITS_ETHER_TOKEN],
          })
        })
      )
      multicallArgs.push(...withdrawCalls)
    }

    //we remove duplicates
    const splitSet = new Set(filteredUserSplits)

    //now that this is done we can finally distribute them
    const distributeCalls = await Promise.all(
      [...splitSet].map(async split => {
        return await splitsClient.callData.distributeToken({
          splitAddress: split,
          token: SPLITS_ETHER_TOKEN,
        })
      })
    )
    multicallArgs.push(...distributeCalls)

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
        address: config.eth.contracts.multicall3 as `0x${string}`,
        abi: MULTICALL3_ABI,
        functionName: "aggregate",
        args: [callRequests],
        account: this.manager.address as `0x${string}`,
      }
      return simulateAndExecuteContract(this.manager, args)
    } else {
      return undefined
    }
  }
  success(): string {
    return `Successfully withdfrew all eth from minters and splits`
  }
}
