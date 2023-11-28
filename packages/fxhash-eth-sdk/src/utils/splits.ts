import {
  ConfigInfo,
  ReceiverEntry,
  getOnChainConfig,
  prepareReceivers,
} from "@/services/operations"
import { Split, SplitsClient } from "@0xsplits/splits-sdk"
import { PublicClient, WalletClient, encodePacked, getContract } from "viem"
import { sign } from "viem/accounts"
import { EthereumWalletManager, FX_GEN_ART_721_ABI } from ".."
import { MetaTransactionData } from "@safe-global/safe-core-sdk-types"

function sortAndNormalizeReceivers(
  receivers: ReceiverEntry[],
  type: "primary" | "secondary",
  config: ConfigInfo
) {
  return prepareReceivers(receivers, type, config)
    .map(r => ({
      account: r.address.toLowerCase(),
      value: r.pct / 10000,
    }))
    .sort((a, b) => a.account.localeCompare(b.account) || a.value - b.value)
}

function checkSplits(
  receivers: { account: string; value: number }[],
  splits: Split[]
) {
  return splits.some(split => {
    const recipients = split.recipients
      .map(r => ({
        account: r.recipient.address.toLowerCase(),
        value: r.percentAllocation,
      }))
      .sort((a, b) => a.account.localeCompare(b.account) || a.value - b.value)

    return (
      recipients.length === receivers.length &&
      recipients.every(
        (recipient, index) =>
          recipient.account === receivers[index].account &&
          recipient.value === receivers[index].value
      )
    )
  })
}

export async function getExistingSplits(
  splitsClient: SplitsClient,
  user: string,
  receivers: ReceiverEntry[]
) {
  const onchainConfig = await getOnChainConfig(this.manager.publicClient)

  const preparedReceivers = sortAndNormalizeReceivers(
    receivers,
    "primary",
    onchainConfig
  )

  const userSplits = await splitsClient.getRelatedSplits({
    address: user,
  })

  return (
    checkSplits(preparedReceivers, userSplits.controlling) ||
    checkSplits(preparedReceivers, userSplits.receivingFrom)
  )
}
