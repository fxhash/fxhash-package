import { blockDefinition, DefaultSlateElement } from "./_definition.js"

export const linkDefinition = blockDefinition<null>({
  name: "Link",
  renderElement: DefaultSlateElement("a", ({ element }) => ({
    href: element.url,
    title: element.title as string,
  })),
})
