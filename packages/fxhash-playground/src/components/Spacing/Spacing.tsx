import cx from "classnames"
import classes from "./Spacing.module.scss"

type SpacingSize =
  | "regular"
  | "sm"
  | "xs"
  | "xxs"
  | "l"
  | "xl"
  | "xxl"
  | "hidden"

interface SpacingProps {
  size: SpacingSize
  xs?: SpacingSize
  sm?: SpacingSize
  md?: SpacingSize
  lg?: SpacingSize
  vlg?: SpacingSize
}

export function Spacing(props: SpacingProps) {
  const { size = "regular", xs, sm, md, lg, vlg } = props
  return (
    <hr
      className={cx(classes.spacing, classes[`spacing-${size}`], {
        [classes[`xs-spacing-${xs}`]]: !!xs,
        [classes[`sm-spacing-${sm}`]]: !!sm,
        [classes[`md-spacing-${md}`]]: !!md,
        [classes[`lg-spacing-${lg}`]]: !!lg,
        [classes[`vlg-spacing-${vlg}`]]: !!vlg,
      })}
    />
  )
}
