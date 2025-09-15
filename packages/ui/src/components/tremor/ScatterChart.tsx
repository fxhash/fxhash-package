"use client"
import React, { useState } from "react"
import {
  CartesianGrid,
  Dot,
  ResponsiveContainer,
  Scatter,
  ScatterChart as ReChartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  Label,
} from "recharts"
import type { AxisDomain } from "recharts/types/util/types"
import {
  AvailableChartColors,
  type AvailableChartColorsKeys,
  constructCategoryColors,
  getColorClassName,
  getYAxisDomain,
} from "./chartUtils"
import { cn as cx } from "@/lib/cn"

function deepEqual<T>(obj1: T, obj2: T): boolean {
  if (obj1 === obj2) return true

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false
  }

  const keys1 = Object.keys(obj1) as Array<keyof T>
  const keys2 = Object.keys(obj2) as Array<keyof T>

  if (keys1.length !== keys2.length) return false

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false
  }

  return true
}

type TooltipProps = Pick<ChartTooltipProps, "active" | "payload" | "label">

type PayloadItem = {
  category: string
  value: number
  index: string
  color: AvailableChartColorsKeys
  type?: string
  payload: any
}

interface ChartTooltipProps {
  active: boolean | undefined
  payload: PayloadItem[]
  label: string
  valueFormatter: (value: number) => string
}

const ChartTooltip = ({
  active,
  payload,
  label,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    const legendPayload = payload.filter((item: any) => item.type !== "none")
    return (
      <div
        className={cx(
          // base
          "rounded-md border text-sm shadow-md",
          // border color
          "border-grey-800 dark:border-grey-200",
          // background color
          "bg-white dark:bg-grey-900"
        )}
      >
        <div className={cx("border-b border-inherit px-4 py-2")}>
          <p
            className={cx(
              // base
              "font-medium",
              // text color
              "text-gray-900 dark:text-gray-50"
            )}
          >
            {label}
          </p>
        </div>
        <div className={cx("space-y-1 px-4 py-2")}>
          {legendPayload.map(({ value, category, color }, index) => (
            <div
              key={`id-${index}`}
              className="flex items-center justify-between space-x-8"
            >
              <div className="flex items-center space-x-2">
                <span
                  aria-hidden="true"
                  className={cx(
                    "h-[3px] w-3.5 shrink-0 rounded-full",
                    getColorClassName(color, "bg")
                  )}
                />
                <p
                  className={cx(
                    // base
                    "text-right whitespace-nowrap",
                    // text color
                    "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {category}
                </p>
              </div>
              <p
                className={cx(
                  // base
                  "text-right font-medium whitespace-nowrap tabular-nums",
                  // text color
                  "text-gray-900 dark:text-gray-50"
                )}
              >
                {valueFormatter(value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export const constructCategories = (data: any[], color?: string): string[] => {
  if (!color) {
    return []
  }

  const categories = new Set<string>()
  data.forEach(datum => {
    categories.add(datum[color])
  })
  return Array.from(categories)
}

type ValueFormatter = (value: number) => string

const defaultValueFormatter = (value: number) => value.toString()

export type ScatterChartValueFormatter = {
  x?: ValueFormatter
  y?: ValueFormatter
  size?: ValueFormatter
}

type BaseEventProps = {
  eventType: "dot" | "category"
  categoryClicked: string
  [key: string]: number | string
}

type LineChartEventProps = BaseEventProps | null | undefined

export interface ScatterChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  x: string
  y: string
  category: string
  size?: string
  valueFormatter?: ScatterChartValueFormatter
  sizeRange?: number[]
  colors?: AvailableChartColorsKeys[]
  showOpacity?: boolean
  startEndOnly?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  yAxisWidth?: number
  intervalType?: "preserveStartEnd" | "equidistantPreserveStart"
  showTooltip?: boolean
  showLegend?: boolean
  showGridLines?: boolean
  autoMinXValue?: boolean
  minXValue?: number | "auto"
  maxXValue?: number | "auto"
  autoMinYValue?: boolean
  minYValue?: number
  maxYValue?: number
  allowDecimals?: boolean
  enableLegendSlider?: boolean
  onValueChange?: (value: LineChartEventProps) => void
  customTooltip?: React.ComponentType<TooltipProps>
  rotateLabelX?: {
    angle: number
    verticalShift: number
    xAxisHeight: number
  }
  tickGap?: number
  xAxisLabel?: string
  yAxisLabel?: string
}

const renderShape = (
  props: any,
  activeNode: any | undefined,
  activeLegend: string | undefined
) => {
  const { cx, cy, width, node, fillOpacity, name } = props

  return (
    <Dot
      cx={cx}
      cy={cy}
      r={width / 2}
      opacity={
        activeNode || (activeLegend && activeLegend !== name)
          ? deepEqual(activeNode, node)
            ? fillOpacity
            : 0.3
          : fillOpacity
      }
    />
  )
}

export const ScatterChart = React.forwardRef<HTMLDivElement, ScatterChartProps>(
  (props, ref) => {
    const {
      data = [],
      x,
      y,
      size,
      category,
      colors = AvailableChartColors,
      showOpacity = false,
      sizeRange = [1, 1000],
      valueFormatter = {
        x: defaultValueFormatter,
        y: defaultValueFormatter,
        size: defaultValueFormatter,
      },
      startEndOnly = false,
      showXAxis = true,
      showYAxis = true,
      yAxisWidth = 56,
      intervalType = "equidistantPreserveStart",
      showTooltip = true,
      showLegend = true,
      showGridLines = true,
      autoMinXValue = false,
      minXValue,
      maxXValue,
      autoMinYValue = false,
      minYValue,
      maxYValue,
      allowDecimals = true,
      onValueChange,
      customTooltip,
      rotateLabelX,
      className,
      enableLegendSlider = false,
      tickGap = 5,
      xAxisLabel,
      yAxisLabel,
      ...other
    } = props
    const CustomTooltip = customTooltip
    const [activeNode, setActiveNode] = React.useState<any | undefined>(
      undefined
    )
    const [activeLegend, setActiveLegend] = useState<string | undefined>(
      undefined
    )
    const hasOnValueChange = !!onValueChange

    function onNodeClick(data: any, index: number, event: React.MouseEvent) {
      event.stopPropagation()
      if (!hasOnValueChange) return
      if (deepEqual(activeNode, data.node)) {
        setActiveLegend(undefined)
        setActiveNode(undefined)
        onValueChange?.(null)
      } else {
        setActiveNode(data.node)
        setActiveLegend(data.payload[category])
        onValueChange?.({
          eventType: "bubble",
          categoryClicked: data.payload[category],
          ...data.payload,
        })
      }
    }

    const categories = constructCategories(data, category)
    const categoryColors = constructCategoryColors(categories, colors)

    //maybe rename getYAxisDomain to getAxisDomain
    const xAxisDomain = getYAxisDomain(autoMinXValue, minXValue, maxXValue)
    const yAxisDomain = getYAxisDomain(autoMinYValue, minYValue, maxYValue)

    return (
      <div ref={ref} className={cx("h-80 w-full", className)} {...other}>
        <ResponsiveContainer>
          <ReChartsScatterChart
            onClick={
              hasOnValueChange && (activeLegend || activeNode)
                ? () => {
                    setActiveNode(undefined)
                    setActiveLegend(undefined)
                    onValueChange?.(null)
                  }
                : undefined
            }
            margin={{
              bottom: xAxisLabel ? 20 : undefined,
              left: yAxisLabel ? 20 : undefined,
              right: yAxisLabel ? 5 : undefined,
              top: 5,
            }}
          >
            {showGridLines ? (
              <CartesianGrid
                className={cx("stroke-grey-400 stroke-1 dark:stroke-grey-600")}
                horizontal={true}
                vertical={false}
              />
            ) : null}
            {x ? (
              <XAxis
                hide={!showXAxis}
                dataKey={x}
                interval={startEndOnly ? "preserveStartEnd" : intervalType}
                tick={{ transform: "translate(0, 6)" }}
                ticks={
                  startEndOnly
                    ? [data[0][x], data[data.length - 1][x]]
                    : undefined
                }
                type="number"
                name={x}
                fill=""
                stroke=""
                className={cx("fill-grey-700 text-1 dark:fill-grey-300")}
                tickLine={false}
                tickFormatter={valueFormatter.x}
                axisLine={false}
                minTickGap={tickGap}
                domain={xAxisDomain as AxisDomain}
                allowDataOverflow={true}
                angle={rotateLabelX?.angle}
                dy={rotateLabelX?.verticalShift}
                height={rotateLabelX?.xAxisHeight}
              >
                {xAxisLabel && (
                  <Label
                    position="insideBottom"
                    offset={-20}
                    className="fill-grey-800 text-1 font-medium dark:fill-grey-200"
                  >
                    {xAxisLabel}
                  </Label>
                )}
              </XAxis>
            ) : null}
            {y ? (
              <YAxis
                width={yAxisWidth}
                hide={!showYAxis}
                axisLine={false}
                tickLine={false}
                dataKey={y}
                type="number"
                name={y}
                domain={yAxisDomain as AxisDomain}
                tick={{ transform: "translate(-3, 0)" }}
                tickFormatter={valueFormatter.y}
                fill=""
                stroke=""
                className={cx(
                  // common
                  "text-tremor-label",
                  // light
                  "fill-grey-700 dark:fill-grey-300"
                )}
                allowDecimals={allowDecimals}
                allowDataOverflow={true}
              >
                {yAxisLabel && (
                  <Label
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                    angle={-90}
                    offset={-15}
                    className="fill-grey-800 text-1 font-medium dark:fill-grey-200"
                  >
                    {yAxisLabel}
                  </Label>
                )}
              </YAxis>
            ) : null}
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              isAnimationActive={false}
              cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
              content={
                showTooltip ? (
                  ({ active, payload, label }) => {
                    let color = category
                      ? payload?.[1]?.payload?.[category]
                      : label
                    if (typeof color === "number") {
                      color = valueFormatter.x?.(color)
                    }

                    const cleanPayload: TooltipProps["payload"] = payload
                      ? payload
                          .filter(item => item.dataKey !== "date")
                          .map((item: any) => ({
                            category: item.dataKey as string,
                            value: item.value,
                            index: item.payload[x],
                            color: categoryColors.get(
                              item.dataKey as string
                            ) as AvailableChartColorsKeys,
                            type: item.type,
                            payload: item.payload,
                          }))
                      : []

                    console.log("label", label)
                    console.log("color", color)
                    console.log("payload", payload)
                    console.log("cleanPayload", cleanPayload)

                    return CustomTooltip ? (
                      <CustomTooltip
                        payload={cleanPayload}
                        active={active}
                        label={color}
                      />
                    ) : (
                      <ChartTooltip
                        active={active}
                        payload={cleanPayload}
                        label={color}
                        valueFormatter={valueFormatter.y!}
                      />
                    )
                  }
                ) : (
                  <></>
                )
              }
            />
            {size ? (
              <ZAxis
                dataKey={size}
                type="number"
                range={sizeRange}
                name={size}
              />
            ) : null}
            {categories.map(cat => {
              return (
                <Scatter
                  className={cx(
                    getColorClassName(
                      categoryColors.get(category) as AvailableChartColorsKeys,
                      "fill"
                    ),
                    onValueChange ? "cursor-pointer" : ""
                  )}
                  fill={`url(#${categoryColors.get(cat)})`}
                  fillOpacity={showOpacity ? 0.7 : 1}
                  key={cat}
                  name={cat}
                  data={category ? data.filter(d => d[category] === cat) : data}
                  shape={(props: any) =>
                    renderShape(props, activeNode, activeLegend)
                  }
                  onClick={onNodeClick}
                />
              )
            })}
          </ReChartsScatterChart>
        </ResponsiveContainer>
      </div>
    )
  }
)

ScatterChart.displayName = "ScatterChart"

export default ScatterChart
