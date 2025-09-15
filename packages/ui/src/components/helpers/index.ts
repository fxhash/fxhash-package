// `interface HTMLAttributes` includes 'color', which may lead to clashes
export type PropsWithoutRefOrColor<T extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<T>,
  "color"
>

// Omits the specified props from the component props. Autocomplete will suggest props
// of the component, but won't restrict the omittable props to those that actually exist.
export type ComponentPropsWithout<
  T extends React.ElementType,
  O extends
    | Omit<string, keyof React.ComponentPropsWithoutRef<T>>
    | keyof React.ComponentPropsWithoutRef<T>,
> = Omit<React.ComponentPropsWithoutRef<T>, O & string>

export type RemovedProps =
  | "asChild"
  | "defaultChecked"
  | "defaultValue"
  | "color"
