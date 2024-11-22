import { FunctionComponent, PropsWithChildren, ReactNode } from "react"
import { RenderElementProps } from "slate-react"
import { Element } from "slate"
import {
  AttributesEditorWrapper,
  EditAttributeComp,
  TEditNodeFnFactory,
} from "./_types"
import { EBreakBehavior, InsertBreakFunction } from "../plugins/_index"

/**
 * The Instanciation Component can be displayed to enter informations about a
 * block, so that non-empty blocks aren't inserted by default
 */
export interface IEditAttributeProps {
  element: any
  onEdit: (element: any) => void
}

/**
 * The attribute edition can be rendered in a contextual menu or in a modal
 * popin. This type provides a generic interface to define such components.
 */
export interface IAttributesEditorWrapperProps {
  onClose: () => void
  className: string
}

export interface IFxTextBlockDefinition<InstanciateOpts> {
  name: string
  icon: ReactNode
  buttonInstantiable?: boolean
  render: (props: RenderElementProps) => ReactNode
  hasUtilityWrapper: boolean
  inlineMenu?: undefined | null | Array<string>
  instanciateElement?: (opts?: InstanciateOpts) => Element
  editAttributeComp?: EditAttributeComp
  editAttributeWrapper?: AttributesEditorWrapper
  // the definition can specify a function which can be called to output a
  // function which will be called to update a node. This is useful if the
  // default editNode function doesn't support certain edge cases
  onEditNodeFactory?: TEditNodeFnFactory
  // should the settings menu be hidden after node is update
  hideSettingsAfterUpdate?: boolean
  // prevent the auto-focus trigger when creating the element
  preventAutofocusTrigger?: boolean
  insertBreakBehavior?: EBreakBehavior | InsertBreakFunction
  hasDeleteBehaviorRemoveBlock?: boolean
}
