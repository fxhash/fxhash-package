import { ReceiverEntry, preparePrimaryReceivers } from "@/services/operations"
import { Split, SplitsClient } from "@0xsplits/splits-sdk"

function sortAndNormalizeReceivers(receivers: ReceiverEntry[]) {
  return preparePrimaryReceivers(receivers)
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
  const preparedReceivers = sortAndNormalizeReceivers(receivers)

  const userSplits = await splitsClient.getRelatedSplits({
    address: user,
  })

  return (
    checkSplits(preparedReceivers, userSplits.controlling) ||
    checkSplits(preparedReceivers, userSplits.receivingFrom)
  )
}
