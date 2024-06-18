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
  basis_points: number
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
): BasisPointRoyalties[] {
  royalties = {
    allocations: [375000, 375000, 250000],
    basis_points: 800,
    chain: "ETHEREUM",
    id: "0xBb47F0ED4A7E3BffcA75660dFa3B053FB7FcE78E",
    receiver: "0x50360D2ee663B75faB10Be377889A7a6380800f4",
    receivers: [
      "0x19Cb46112F4f360b721a99504d8B07440500a701",
      "0xdE089C6a499644C7bd721F18FcC1dAe532261022",
      "0xe1f04609f7bC45e23a1BA4CD4a76f476755beBA6",
    ],
  }

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

  const additionalAmountForReceivers = newFee / (numReceivers - 1)

  // Calculate new shares for each person
  for (let i = 0; i < numReceivers; i++) {
    if (i !== fxhashIndex) {
      totalShares[i] += additionalAmountForReceivers
    } else {
      totalShares[i] -= newFee
    }
  }

  const newBasisPointRoyalties: BasisPointRoyalties[] = []
  for (let i = 0; i < numReceivers; i++) {
    const newBasisPoints = Math.round(
      (totalShares[i] / totalRoyalties) * 1000000
    )
    newBasisPointRoyalties.push({
      receiver: royalties.receivers[i],
      basis_points: newBasisPoints,
    })
  }
  debugger

  return newBasisPointRoyalties
}
