import { EnhanceEditorWith } from "../../_types.js"
import { fxTextBlockDefinitionFallback } from "../../blockDefinitions.js"
import { EFxTextBlocks } from "../../blocks/_types.js"

export const withCustomBlockDefinitions: EnhanceEditorWith = (
  editor,
  definitions
) => {
  editor.getBlockDefinition = (type: string) =>
    definitions[type as EFxTextBlocks] || fxTextBlockDefinitionFallback

  return editor
}
