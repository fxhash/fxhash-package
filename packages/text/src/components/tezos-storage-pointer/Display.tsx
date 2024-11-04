import { ITezosStoragePointer } from "@/processor/_interfaces"
import { getTezosStoratePointerPayload } from "./useTezosStoragePointer"
import { ITezosStoragePointerProps } from "./_types"

export function TezosStoragePointerDisplay({
  contract,
  path,
}: ITezosStoragePointerProps) {
  const pointer: ITezosStoragePointer = {
    contract,
    path,
  }
  const { type, props } = getTezosStoratePointerPayload(pointer)

  return (
    <figure>
      <ul>
        <li>
          <b>Tezos Storate Pointer</b>
        </li>
        <li>
          type: <b>{type}</b>
        </li>
        {(Object.entries(props) as [string, unknown][]).map(([key, value]) => (
          <li key={key}>
            {key}: <b>{String(value)}</b>
          </li>
        ))}
      </ul>
    </figure>
  )
}
