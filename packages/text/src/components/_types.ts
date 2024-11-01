import { ExtraProps, Components } from "hast-util-to-jsx-runtime"
import { FxArticleComponentsMap } from "./_interfaces"

type _Component<Props = any> = (props: Props) => JSX.Element | null | undefined

export type FxTextComponents =
  | Components
  | Partial<{
      [ComponentName in keyof FxArticleComponentsMap]:
        | _Component<FxArticleComponentsMap[ComponentName] & ExtraProps>
        | keyof JSX.IntrinsicElements
    }>
