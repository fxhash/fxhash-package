import { useMemo } from "react"
import { useSlate } from "slate-react"
import { IUseInstantiableBlocksPayload } from "../_interfaces"
import { defaultInstantiableBlockTypes } from "../blockDefinitions"

export function useInstantiableBlocks(): IUseInstantiableBlocksPayload {
  const editor = useSlate()
  const instantiableBlocks = useMemo(() => {
    return defaultInstantiableBlockTypes
      .map(type => editor.getBlockDefinition(type))
      .filter(definition => !!definition.isInstantiable)
  }, [])

  return { instantiableBlocks }
}
