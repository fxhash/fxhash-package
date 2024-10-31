import { ExtraProps, Components } from "hast-util-to-jsx-runtime"
import { FxArticleComponentsMap } from "./_interfaces"

type _Component<ComponentProps> =
  | (new (props: ComponentProps) => JSX.ElementClass)
  | ((props: ComponentProps) => JSX.Element | string | null | undefined)

export type FxTextComponents = Partial<
  Components & {
    [ComponentName in keyof FxArticleComponentsMap]:
      | _Component<FxArticleComponentsMap[ComponentName] & ExtraProps>
      | keyof JSX.IntrinsicElements
  }
>
