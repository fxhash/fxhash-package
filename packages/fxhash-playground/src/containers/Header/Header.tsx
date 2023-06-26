import { Spacing } from "@/components/Spacing/Spacing"
import Image from "next/image"
import LogoLight from "public/logo/blanq-light.png"
import classes from "./Header.module.scss"

export function Header() {
  return (
    <header className={classes.header}>
      <Spacing size="xl" xs="regular" />
      Hello World Header
    </header>
  )
}
