import React, { ReactNode } from "react"
import { cn } from "@/lib/cn"

interface BorderedBoxProps {
  children: ReactNode
  className?: string
  cornerSize?: number // Size of corner pins in pixels
  cornerColor?: string // Color of corner pins
  borderColor?: string // Border color
  borderWidth?: number // Border width in pixels
  padding?: string // Custom padding
  backdropBlur?: boolean // Whether to apply backdrop blur
}

export function BorderedBox({
  children,
  className,
  cornerSize = 12,
  borderWidth = 2,
  padding = "p-6",
  backdropBlur = true,
}: BorderedBoxProps) {
  return (
    <div
      className={cn(
        "relative",
        //backdropBlur ? "bg-white/60 backdrop-blur-sm" : "",
        padding,
        className
      )}
      style={{
        outline: `${borderWidth}px solid`,
        outlineOffset: `${-(borderWidth / 2)}px`, // This makes the outline centered on the element's edge
        //opacity: 0.3,
      }}
    >
      {/* Top-left corner pin */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 bg-black dark:bg-white"
        style={{
          top: 0,
          left: 0,
          width: `${cornerSize}px`,
          height: `${cornerSize}px`,
        }}
      />

      {/* Top-right corner pin */}
      <div
        className="absolute translate-x-1/2 -translate-y-1/2 bg-black dark:bg-white"
        style={{
          top: 0,
          right: 0,
          width: `${cornerSize}px`,
          height: `${cornerSize}px`,
        }}
      />

      {/* Bottom-left corner pin */}
      <div
        className="absolute -translate-x-1/2 translate-y-1/2 bg-black dark:bg-white"
        style={{
          bottom: 0,
          left: 0,
          width: `${cornerSize}px`,
          height: `${cornerSize}px`,
        }}
      />

      {/* Bottom-right corner pin */}
      <div
        className="absolute translate-x-1/2 translate-y-1/2 bg-black dark:bg-white"
        style={{
          bottom: 0,
          right: 0,
          width: `${cornerSize}px`,
          height: `${cornerSize}px`,
        }}
      />

      {children}
    </div>
  )
}
