/**
 * @dev Temp utility to make performance measurements on the graph.
 */

const arr = {
  sum<T>(A: T[], getV: (item: T) => number = v => v as any) {
    return A.reduce((acc, val) => acc + getV(val), 0)
  },
  avg<T>(A: T[], getV: (item: T) => number = v => v as any) {
    return this.sum(A, getV) / A.length
  },
}

export const Measure = {
  measures: {} as Record<string, number>,
  samples: {} as Record<string, number[]>,
  collect(name: string, value: number) {
    if (!this.samples[name]) this.samples[name] = []
    this.samples[name].push(value)
  },
  start(name: string) {
    this.measures[name] = performance.now()
  },
  end(name: string, ignoreError = false) {
    if (!(name in this.measures)) {
      if (ignoreError) return
      throw `invalid timer end on "${name}"`
    }
    this.collect(name, performance.now() - this.measures[name])
  },
  export() {
    const samples = Object.entries(this.samples)
    const rows = [samples.map(s => s[0]).join(",")]
    rows.push(samples.map(s => arr.avg(s[1])).join(","))
    downloadAsCsvFile("samples.csv", rows.join("\n"))
  },
  getSamples() {
    return this.samples
  },
}

function downloadAsCsvFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename.endsWith(".csv") ? filename : filename + ".csv"
  document.body.appendChild(a)
  a.click()

  // Cleanup
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
