"use client"

import * as React from "react"
import {
  Chevron,
  DayPicker,
  PropsBase,
  PropsSingle,
  getDefaultClassNames,
} from "react-day-picker"
import { cn } from "@/lib/cn"
import { Input, Label } from "."
import { format, setHours, setMinutes } from "date-fns"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
} from "@tabler/icons-react"

interface TimeInputProps {
  value: Date
  onChange: (value: Date) => void
}

export function TimeInput(props: TimeInputProps) {
  const { value } = props
  function handleChangeTime(e: React.ChangeEvent<HTMLInputElement>) {
    const time = e.target.value
    const [hours, minutes] = time.split(":").map(str => parseInt(str, 10))
    const newSelectedDate = setHours(setMinutes(value, minutes), hours)
    props.onChange(newSelectedDate)
  }
  return (
    <div className="flex items-center justify-between gap-2 border-t border-grey-300 px-8 py-4 dark:border-grey-600">
      <Label htmlFor="calendar-time-input">time</Label>
      <span>
        <Input
          value={format(value, "HH:mm")}
          onChange={handleChangeTime}
          id="calendar-time-input"
          type="time"
        />
      </span>
    </div>
  )
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function CustomChevron(props: React.ComponentProps<typeof Chevron>) {
  switch (props.orientation) {
    case "left":
      return <IconChevronLeft size={16} />
    case "right":
      return <IconChevronRight size={16} />
    case "up":
      return <IconChevronUp size={16} />
    case "down":
    default:
      return <IconChevronDown size={16} />
  }
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          nav: "space-x-1 flex items-center absolute right-8 gap-4 top-4",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-1 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-grey-500 [&:has([aria-selected].day-outside)]:bg-grey-500 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn("size-8 p-0 text-center"),
          selected:
            "bg-black dark:bg-white text-white dark:text-black font-medium rounded-full",
          outside: "text-grey-400",
          disabled: "text-grey-300 dark:text-grey-500 hover:bg-transparent",
          hidden: "invisible",
          button_next: cn(defaultClassNames.button_next),
          button_previous: cn(defaultClassNames.button_previous),
          chevron: "size-4",
          ...classNames,
        }}
        components={{
          Chevron: CustomChevron,
        }}
        {...props}
      />
    </>
  )
}
Calendar.displayName = "Calendar"

export type DayTimeInputProps = Omit<
  PropsSingle & PropsBase,
  "onSelect" | "selected"
> & {
  selected: Date
  onChange: (date: Date | undefined) => void
}

export function DayTimeInput(props: DayTimeInputProps) {
  function handleChangeDate(date: Date | undefined) {
    if (!date) {
      return props.onChange(undefined)
    }
    const timeValue = format(props.selected, "HH:mm")
    const [hours, minutes] = timeValue.split(":").map(str => parseInt(str, 10))
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    )
    props.onChange(newDate)
  }

  return (
    <>
      <Calendar {...props} mode="single" onSelect={handleChangeDate} />
      <TimeInput
        value={props.selected}
        onChange={date => props.onChange(date)}
      />
    </>
  )
}

Calendar.displayName = "DayTimeInput"
