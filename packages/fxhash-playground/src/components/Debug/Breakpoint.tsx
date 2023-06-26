import classes from "./Breakpoint.module.scss"

export function Breakpoint() {
  return (
    <div className={classes.debugBreakpoint}>
      <span className={classes.vlg}>vlg</span>
      <span className={classes.lg}>lg</span>
      <span className={classes.md}>md</span>
      <span className={classes.sm}>sm</span>
      <span className={classes.xs}>xs</span>
    </div>
  )
}
