import { blockDefinition, DefaultSlateElement } from "./_definition.js"

export const figureDefinition = blockDefinition<null>({
  name: "Figure",
  renderElement: DefaultSlateElement("figure"),
  hasNodeMenu: true,
  hasDeleteBehaviorRemoveBlock: true,
  hideSettingsAfterUpdate: true,
  preventAutofocusTrigger: true,
})

export const figcaptionDefinition = blockDefinition<null>({
  name: "Caption",
  hasNodeMenu: false,
  inlineMenu: null,
})
