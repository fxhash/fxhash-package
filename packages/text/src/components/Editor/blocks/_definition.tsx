import mergeWith from "lodash.mergewith"
import { IFxTextBlockDefinition } from "./_interfaces"
import { createElement } from "react"
import { RenderElementProps } from "slate-react"

const defaultBlockDefinition: IFxTextBlockDefinition<null> = {
  name: "default",
  renderElement: DefaultSlateElement("div"),
  hasNodeMenu: false,
  isInstantiable: false,
}

export function blockDefinition<T>(
  props: Partial<IFxTextBlockDefinition<T>>
): IFxTextBlockDefinition<T> {
  return mergeWith(defaultBlockDefinition, props)
}

export function DefaultSlateElement(
  dom: string,
  getProps?: (
    props: Omit<RenderElementProps, "children">
  ) => Record<string, any>
) {
  return ({ children, ...props }: RenderElementProps) => {
    return createElement(
      dom,
      { ...props, ...(getProps?.(props) || {}) },
      children
    )
  }
}
