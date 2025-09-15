import { ITezosStoragePointer } from "@/processor/_interfaces.js"
import { getTezosStoratePointerPayload } from "./useTezosStoragePointer.js"
import { ITezosStoragePointerProps } from "./_types.js"

export function TezosStoragePointerDisplay({
  contract,
  path,
}: ITezosStoragePointerProps): JSX.Element {
  const pointer: ITezosStoragePointer = {
    contract,
    path,
  }
  const { type, props } = getTezosStoratePointerPayload(pointer)

  return (
    <figure>
      <ul>
        <li>
          <b>Tezos Storage Pointer</b>
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
