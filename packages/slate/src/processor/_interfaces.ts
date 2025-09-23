export interface ISlateElementProcessor {
  htmlTagName?: string
  htmlAttributes?: string[]
  transformSlateToMarkdownMdhast?: (
    node: unknown,
    next: (children: any[]) => any
  ) => object
  transformMarkdownMdhastToSlate?: (
    node: any,
    next: (children: any[]) => any
  ) => object
}
