import { readFileSync, writeFileSync } from "fs"
import parse, { HTMLElement } from "node-html-parser"
import { format } from "prettier"

// Utility function to read and parse HTML
export function readAndParseHtml(filePath: string): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    try {
      const indexHtml = readFileSync(filePath)
      const html = indexHtml.toString()
      const root = parse(html)
      resolve(root)
    } catch (error) {
      reject(error)
    }
  })
}

// Utility function to format and write HTML
export function formatAndWriteHtml(
  root: HTMLElement,
  filePath: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const newHtml = root.toString()
      const pNewHtml = format(newHtml, { parser: "html" })
      writeFileSync(filePath, pNewHtml)
      resolve(pNewHtml)
    } catch (error) {
      reject(error)
    }
  })
}
