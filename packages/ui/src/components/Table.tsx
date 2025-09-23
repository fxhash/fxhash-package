import * as React from "react"
import { ComponentPropsWithout, RemovedProps } from "./helpers"
import { cn } from "@/lib/cn"
import { ScrollArea } from "./ScrollArea"

type TableElement = React.ElementRef<"table">
interface TableHProps extends ComponentPropsWithout<"table", RemovedProps> {}
const Table = React.forwardRef<TableElement, TableHProps>(
  ({ className, children, ...props }, forwardedRef) => (
    <div {...props} ref={forwardedRef}>
      <ScrollArea>
        <table className={cn("h-0 w-full text-left", className)}>
          {children}
        </table>
      </ScrollArea>
    </div>
  )
)
Table.displayName = "Table.Root"

type TableHeaderElement = React.ElementRef<"thead">
interface TableHeaderProps
  extends ComponentPropsWithout<"thead", RemovedProps> {}
const TableHeader = React.forwardRef<TableHeaderElement, TableHeaderProps>(
  (props, forwardedRef) => <thead {...props} ref={forwardedRef} />
)
TableHeader.displayName = "Table.Header"

type TableBodyElement = React.ElementRef<"tbody">
interface TableBodyProps extends ComponentPropsWithout<"tbody", RemovedProps> {}
const TableBody = React.forwardRef<TableBodyElement, TableBodyProps>(
  (props, forwardedRef) => (
    <tbody {...props} ref={forwardedRef} className="overflow-auto" />
  )
)
TableBody.displayName = "Table.Body"

type TableRowElement = React.ElementRef<"tr">
interface TableRowProps extends ComponentPropsWithout<"tr", RemovedProps> {}
const TableRow = React.forwardRef<TableRowElement, TableRowProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <tr
        {...props}
        ref={forwardedRef}
        className={cn(
          "border-b border-grey-200 last:border-none dark:border-grey-700",
          className
        )}
      />
    )
  }
)
TableRow.displayName = "Table.Row"

type TableCellElement = React.ElementRef<"td">
interface TableCellProps
  extends ComponentPropsWithout<"td", RemovedProps | "width"> {}
const TableCell = React.forwardRef<TableCellElement, TableCellProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <td
        {...props}
        ref={forwardedRef}
        className={cn(
          "px-5 py-3 whitespace-nowrap first:pl-0 last:pr-0",
          className
        )}
      />
    )
  }
)
TableCell.displayName = "Table.Cell"

type TableColumnHeaderCellElement = React.ElementRef<"th">
interface TableColumnHeaderCellProps
  extends ComponentPropsWithout<"th", RemovedProps> {}
const TableColumnHeaderCell = React.forwardRef<
  TableColumnHeaderCellElement,
  TableColumnHeaderCellProps
>(({ className, ...props }, forwardedRef) => {
  return (
    <th
      {...props}
      ref={forwardedRef}
      scope="col"
      className={cn(
        "px-5 pb-1 text-2 leading-2 font-normal text-grey-500 first:pl-0 last:pr-0 dark:text-grey-400",
        className
      )}
    />
  )
})
TableColumnHeaderCell.displayName = "Table.ColumnHeaderCell"

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumnHeaderCell,
}
