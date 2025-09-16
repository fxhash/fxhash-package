"use client"
import {
  AreaSeries,
  createChart,
  ColorType,
  type TimeChartOptions,
  type DeepPartial,
  type Time,
} from "lightweight-charts"
import { useTheme } from "next-themes"
import React, { useEffect, useRef } from "react"
import { Button } from "./Button"
import { cn } from "@/lib/cn"

export type ChartDuration = "1d" | "7d" | "30d"
const durations: ChartDuration[] = ["1d", "7d", "30d"]

export const ChartComponent = (props: {
  data: { time: Time | number; value: number }[]
  height?: number
  colors?: {
    backgroundColor?: string
    lineColor?: string
    textColor?: string
    areaTopColor?: string
    areaBottomColor?: string
  }
  options?: DeepPartial<TimeChartOptions>
  onDurationChange?: (duration: ChartDuration) => void
  duration?: ChartDuration
}) => {
  const { resolvedTheme } = useTheme()
  const {
    data,
    height = 300,
    colors: {
      backgroundColor = resolvedTheme === "dark" ? "#111111" : "#ffffff",
      lineColor = "#733AF8",
      textColor = resolvedTheme === "dark" ? "#ffffff" : "#111111",
      areaTopColor = "#733AF8",
      areaBottomColor = "rgba(227, 216, 254, 0.5)",
    } = {},
    options = {},
    onDurationChange,
    duration: selectedDuration = "1d",
  } = props

  const chartContainerRef = useRef<HTMLDivElement>(null)

  const handleDurationClick = (duration: ChartDuration) => {
    onDurationChange?.(duration)
  }

  useEffect(() => {
    const handleResize = () => {
      if (!chartContainerRef.current) return
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    if (!chartContainerRef.current) return
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height,
      ...options,
    })
    chart.timeScale().applyOptions({
      timeVisible: true,
    })
    chart.timeScale().fitContent()

    const newSeries = chart.addSeries(AreaSeries, {
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    })
    newSeries.setData(data as { time: Time; value: number }[])

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [
    data,
    height,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
    options,
  ])

  return (
    <div className="relative">
      {/* Chart Container */}
      <div ref={chartContainerRef} />

      {/* Time Interval Selector */}
      <div className="absolute top-2 left-2 z-10 flex gap-1 rounded-md p-1 backdrop-blur-sm">
        {durations.map(opt => (
          <Button
            key={opt}
            onClick={() => handleDurationClick(opt)}
            variant="ghost"
            className={cn(
              "bg-transparent px-2 text-black dark:bg-transparent dark:text-white",

              opt === selectedDuration
                ? "text-violet-900 underline dark:text-violet-900"
                : ""
            )}
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  )
}
