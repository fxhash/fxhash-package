import { IArticleBlockDefinition } from "./_interfaces"

export const linkDefinition: IArticleBlockDefinition<any> = {
  name: "Link",
  icon: <i className="fa-solid fa-link" aria-hidden />,
  render: ({ attributes, element, children }) => {
    return (
      <a {...attributes} href={element.url} title={element.title as string}>
        {children}
      </a>
    )
  },
  hasUtilityWrapper: false,
}
