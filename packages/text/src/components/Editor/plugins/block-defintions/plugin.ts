import { EnhanceEditorWith } from "../../_types"
import { fxTextBlockDefinitionFallback } from "../../blockDefinitions"
import { EFxTextBlocks } from "../../blocks/_types"

export const withCustomBlockDefinitions: EnhanceEditorWith = (
  editor,
  definitions
) => {
  editor.getBlockDefinition = (type: string) =>
    definitions[type as EFxTextBlocks] || fxTextBlockDefinitionFallback

  return editor
}
