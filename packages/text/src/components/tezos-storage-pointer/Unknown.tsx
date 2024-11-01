import { ITezosStoragePointer } from "@/processor/_interfaces"
import { TezosStorageRenderer } from "./Factory"

interface Props {
  pointer: ITezosStoragePointer
}
export const TezosStorageUnknown: TezosStorageRenderer<Props> = ({
  pointer,
}) => {
  const keys = Object.keys(pointer)

  return (
    <div>
      <i className="fa-solid fa-bug" aria-hidden />
      unsupported tezos storage content
      <div>
        {keys.map(key => (
          <div key={key}>
            <strong>{key}</strong>: {pointer[key as keyof ITezosStoragePointer]}
          </div>
        ))}
      </div>
    </div>
  )
}

// fallback, always matches
TezosStorageUnknown.matches = () => true
// no props
TezosStorageUnknown.getPropsFromPointer = pointer => ({ pointer })
