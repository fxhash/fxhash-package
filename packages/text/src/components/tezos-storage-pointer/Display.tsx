import { ITezosStoragePointer } from "@/processor/_interfaces"
import { TezosStorageFactory } from "./Factory"

export type TezosStorageProps = ITezosStoragePointer

export function TezosStoragePointerDisplay({
  contract,
  path,
}: TezosStorageProps) {
  const pointer: ITezosStoragePointer = {
    contract,
    path,
  }
  const Comp = TezosStorageFactory(pointer)
  const props = Comp.getPropsFromPointer(pointer)
  return (
    <div>
      <Comp {...props} />
    </div>
  )
}
