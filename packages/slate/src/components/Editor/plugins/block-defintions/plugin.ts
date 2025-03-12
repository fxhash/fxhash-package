import { EnhanceEditorWith } from "../../_types.js"
import { fxTextBlockDefinitionFallback } from "../../blockDefinitions.js"

export const withCustomBlockDefinitions: EnhanceEditorWith = (
  editor,
  definitions
) => {
  editor.getBlockDefinition = (type: string) =>
    definitions[type] || fxTextBlockDefinitionFallback

  return editor
}
