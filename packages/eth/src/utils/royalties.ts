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

export async function processOverridenRoyalties(royalties: Royalties[]) {
  const addressToModify = "0x1"
  const percentageToSubtract = 0.5

  const totalAllocationToSubtract = royalties.reduce((total, royalty) => {
    if (royalty.receiver === addressToModify) {
      const allocationToModify =
        royalty.allocations[royalty.receivers.indexOf(addressToModify)]
      const basisPoints = royalty.basis_points
      const amountToSubtract =
        (allocationToModify * basisPoints * percentageToSubtract) / 10000
      royalty.allocations[royalty.receivers.indexOf(addressToModify)] -=
        amountToSubtract
      return total + amountToSubtract
    }
    return total
  }, 0)

  const remainingReceivers = royalties.filter(
    royalty => royalty.receiver !== addressToModify
  )

  const allocationToDistribute =
    totalAllocationToSubtract / remainingReceivers.length

  remainingReceivers.forEach(royalty => {
    const allocationIndex = royalty.receivers.indexOf(addressToModify)
    royalty.allocations[allocationIndex] += allocationToDistribute
  })

  return royalties
}
