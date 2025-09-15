export function convertSlateLeafDirectiveToMarkdown(node: any): object {
  const { children, type, ...attributes } = node

  return {
    type: "leafDirective",
    name: type,
    children: [
      {
        type: "text",
        value: children[0].text,
      },
    ],
    attributes,
  }
}
