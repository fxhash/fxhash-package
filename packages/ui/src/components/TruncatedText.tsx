"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { Link } from "./Link"
import { cn } from "@/lib"

interface TruncatedTextProps {
  maxLines: number
  children: ReactNode
  className?: string
  openClassName?: string
  lineHeight?: number
  expandable?: boolean
}

export const TruncatedText = ({
  className,
  openClassName,
  maxLines,
  lineHeight = 1.5,
  expandable = true,
  children,
}: TruncatedTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    if (content) {
      const maxHeight =
        lineHeight *
        maxLines *
        parseFloat(getComputedStyle(document.documentElement).fontSize)
      setIsTruncated(content.scrollHeight > maxHeight)
    }
  }, [children, maxLines, lineHeight])

  return (
    <>
      <div
        ref={contentRef}
        className={cn(className, !isExpanded && "line-clamp-1", {
          [openClassName || ""]: isExpanded,
        })}
        style={{
          WebkitLineClamp: isExpanded ? "unset" : maxLines,
          lineHeight: `${lineHeight}em`,
          maxHeight: isExpanded ? "none" : `${lineHeight * maxLines}em`,
          overflow: isExpanded ? "visible" : "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
        }}
      >
        {children}
      </div>
      {expandable && isTruncated && (
        <Link color="grey-light" className="mt-2 underline" asChild>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "show less" : "show more"}
          </button>
        </Link>
      )}
    </>
  )
}
