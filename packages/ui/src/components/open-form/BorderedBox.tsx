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
  cornerSize = 4,
  cornerColor = "white",
  borderColor = "white",
  borderWidth = 2,
  padding = "p-6",
  backdropBlur = true,
}: BorderedBoxProps) {
  return (
    <div
      className={cn(
        "relative",
        backdropBlur ? "" : "",
        padding,
        "", // Small rounded corners to match with outline style
        className
      )}
      style={{
        outline: `${borderWidth}px solid ${borderColor}`,
        outlineOffset: `${-(borderWidth / 2)}px`, // This makes the outline centered on the element's edge
      }}
    >
      {/* Top-left corner pin */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          top: 0,
          left: 0,
          width: `${cornerSize}px`,
          height: `${cornerSize}px`,
          backgroundColor: cornerColor,
        }}
      />

      {/* Top-right corner pin */}
      <div
        className="absolute translate-x-1/2 -translate-y-1/2"
        style={{
          top: 0,
          right: 0,
          width: `${cornerSize}px`,
          height: `${cornerSize}px`,
          backgroundColor: cornerColor,
        }}
      />

      {/* Bottom-left corner pin */}
      <div
        className="absolute -translate-x-1/2 translate-y-1/2"
        style={{
          bottom: 0,
          left: 0,
          width: `${cornerSize}px`,
          height: `${cornerSize}px`,
          backgroundColor: cornerColor,
        }}
      />

      {/* Bottom-right corner pin */}
      <div
        className="absolute translate-x-1/2 translate-y-1/2"
        style={{
          bottom: 0,
          right: 0,
          width: `${cornerSize}px`,
          height: `${cornerSize}px`,
          backgroundColor: cornerColor,
        }}
      />

      {children}
    </div>
  )
}
