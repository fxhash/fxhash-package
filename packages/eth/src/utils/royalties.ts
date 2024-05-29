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
  projectId: string,
  chain: BlockchainType
): Promise<Royalties[] | undefined> {
  const royalties = await gqlClient.query(Qu_GetEthSecondarySplits, {
    where: {
      id: {
        _eq: projectId,
      },
      chain: {
        _eq: chain === BlockchainType.ETHEREUM ? "ETHEREUM" : "BASE",
      },
    },
  })
  return royalties.data?.onchain?.eth_secondary_splits
}

export function processOverridenRoyalties(
  royalties: Royalties
): BasisPointRoyalties[] {
  const addressToModify = "0x1"
  const percentageToSubtract = 50
  const processedRoyalties: BasisPointRoyalties[] = []

  const fxhashIndex = royalties.receivers.indexOf(addressToModify)
  const fxhashAllocation = royalties.allocations[fxhashIndex]
  processedRoyalties.push({
    receiver: addressToModify,
    basis_points: fxhashAllocation - percentageToSubtract,
  })
  const delta = Math.floor(
    percentageToSubtract / (royalties.receivers.length - 1)
  )
  for (let i = 0; i < royalties.receivers.length; i++) {
    if (i !== fxhashIndex) {
      processedRoyalties.push({
        receiver: royalties.receivers[i],
        basis_points: royalties.allocations[i] + delta,
      })
    }
  }
  const total = processedRoyalties.reduce(
    (acc, { basis_points }) => acc + basis_points,
    0
  )
  if (total !== royalties.basis_points) {
    processedRoyalties[1].basis_points = processedRoyalties[1].basis_points + 1
  }

  return processedRoyalties
}
