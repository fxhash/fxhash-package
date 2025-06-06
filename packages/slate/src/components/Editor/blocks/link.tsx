import { IFxTextBlockDefinition } from "./_interfaces.js"

export const linkDefinition: IFxTextBlockDefinition<any> = {
  name: "Link",
  hasNodeMenu: false,
  renderElement: ({ attributes, element, children }) => {
    return (
      <a {...attributes} href={element.url} title={element.title as string}>
        {children}
      </a>
    )
  },
}
