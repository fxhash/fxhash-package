import { config } from "@fxhash/config"
import { Qu_GetEthSecondarySplits } from "@fxhash/gql"
import gqlClient from "@fxhash/gql-client"
import { BlockchainType } from "@fxhash/shared"

export type Royalties = {
  __typename?: "eth_secondary_splits" | undefined
  id: string
  receiver: string
  receivers: string[]
  allocations: number[]
  basis_points: number
  chain: string
}

export type BasisPointRoyalties = {
  receiver: string
  basis_points: string
}

export async function getProjectRoyalties(
  projectId: string
): Promise<Royalties | undefined> {
  const royalties = await gqlClient.query(Qu_GetEthSecondarySplits, {
    id: projectId,
  })
  return royalties.data?.onchain?.eth_secondary_splits_by_pk
}

export function processOverridenRoyalties(
  royalties: Royalties,
  chain: BlockchainType
): string[] {
  const newFee = 50
  const totalRoyalties = royalties.basis_points
  const numReceivers = royalties.receivers.length

  const addressToModify =
    chain === BlockchainType.ETHEREUM
      ? config.eth.config.ethFeeReceiver
      : config.base.config.ethFeeReceiver

  const totalShares: number[] = []
  let fxhashIndex: number | undefined

  // Calculate initial shares for each person
  for (let i = 0; i < numReceivers; i++) {
    const allocationBasisPoints = royalties.allocations[i]
    const totalShare = (totalRoyalties * allocationBasisPoints) / 1000000
    totalShares.push(totalShare)
    if (royalties.receivers[i] === addressToModify) {
      fxhashIndex = i
    }
  }

  if (fxhashIndex === undefined) {
    throw new Error("fxhash receiver not found")
  }

  const additionalAmountForReceivers = Math.floor(newFee / (numReceivers - 1))
  const rounding = newFee % (numReceivers - 1)
  // Calculate new shares for each person
  for (let i = 0; i < numReceivers; i++) {
    if (i !== fxhashIndex) {
      totalShares[i] += additionalAmountForReceivers
    } else {
      totalShares[i] -= newFee
    }
  }
  debugger
  if (rounding) {
    const firstNonFxIndex = royalties.receivers.findIndex(
      receiver => receiver !== addressToModify
    )
    totalShares[firstNonFxIndex] += rounding
  }

  const processedRoyalties: string[] = []
  for (let i = 0; i < numReceivers; i++) {
    const receiver = royalties.receivers[i]
    const basisPoints = totalShares[i]
    processedRoyalties.push(`${receiver}:${basisPoints}`)
  }
  return processedRoyalties
}
