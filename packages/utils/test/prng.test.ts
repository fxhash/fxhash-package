import { describe, it, expect } from "vitest"
import {
  mockEthereumTransactionHash,
  mockTezosTransactionHash,
} from "../src/hash"

import { createFxRandom } from "../src/math"

// The critical value for a 0.05 significance level and 9 degrees of freedom
// This value can be looked up in a Chi-Square distribution table
const CHI_TEST_CRITICAL_VALUE = 16.919
const NUM_SAMPLES = 1000
const NUM_BINS = 10
const NUM_TESTS = 10000
const MAX_FAILURES = NUM_TESTS * 0.05

function createSample(count: number, seed: string) {
  const fxRand = createFxRandom(seed)
  return Array(count)
    .fill(0)
    .map(() => fxRand())
}

function plotBins(bins: number[]) {
  const maxCount = Math.max(...bins)
  const binSize = 1 / bins.length

  for (let i = 0; i < bins.length; i++) {
    const count = bins[i]
    const length = Math.round((count / maxCount) * 50)
    const line = "#".repeat(length)
    const binStart = (i * binSize).toFixed(2)
    const binEnd = ((i + 1) * binSize).toFixed(2)
    console.log(`[${binStart}-${binEnd}] | ${line}`)
  }
}

function chiSquared(samples: number[], numBins: number): [number, number[]] {
  // count the number of samples in each bin
  const bins = new Array(numBins).fill(0)
  for (const number of samples) {
    const bin = Math.floor(number * numBins)
    bins[bin]++
  }
  // expected count in each bin if the numbers are uniformly distributed
  const expectedCount = samples.length / numBins
  // calculate the chi square statistic
  let chiSquare = 0
  for (const bin of bins) {
    const difference = bin - expectedCount
    chiSquare += (difference * difference) / expectedCount
  }
  return [chiSquare, bins]
}

function runChiSquaredTests(
  numSamples: number,
  numBins: number,
  numTests: number,
  seed: () => string
): number {
  let numFailures = 0
  for (let i = 0; i < numTests; i++) {
    const samples = createSample(numSamples, seed())
    const [x2, bins] = chiSquared(samples, numBins)
    if (x2 > CHI_TEST_CRITICAL_VALUE) {
      numFailures++
      console.log()
      console.log("x2", x2)
      console.log(bins)
      plotBins(bins)
      console.log()
    }
  }
  return numFailures
}

function runKolmogorovSmirnovTests(
  numSamples: number,
  numTests: number,
  seed: () => string
) {
  let numFailures = 0
  for (let i = 0; i < numTests; i++) {
    const samples = createSample(numSamples, seed())

    samples.sort((a, b) => a - b)

    // Calculate the Kolmogorov-Smirnov statistic
    let ksStatistic = 0
    for (let i = 0; i < numSamples; i++) {
      const uniform = (i + 1) / numSamples
      const diff = Math.abs(samples[i] - uniform)
      if (diff > ksStatistic) {
        ksStatistic = diff
      }
    }

    // The critical value for a 0.05 significance level and large sample size
    // This value can be looked up in a Kolmogorov-Smirnov distribution table
    const criticalValue = 1.36 / Math.sqrt(numSamples)

    if (ksStatistic > criticalValue) {
      numFailures++
    }
  }
  return numFailures
}

describe(`prng tests: samples ${NUM_SAMPLES}, bins: ${NUM_BINS}, test runs ${NUM_TESTS}x`, () => {
  /*
  it(`Tezos hash seed passes chi square test`, () => {
    const numFailures = runChiSquaredTests(
      NUM_SAMPLES,
      NUM_BINS,
      NUM_TESTS,
      () => mockTezosTransactionHash()
    )
    expect(numFailures).toBeLessThanOrEqual(MAX_FAILURES)
  })
  it(`Ethereum hash seed passes chi square test`, () => {
    const numFailures = runChiSquaredTests(
      NUM_SAMPLES,
      NUM_BINS,
      NUM_TESTS,
      () => mockEthereumTransactionHash()
    )
    expect(numFailures).toBeLessThanOrEqual(MAX_FAILURES)
  })
  */
  it(`Tezos hash seed passes Kolmogorov-Smirnov test`, () => {
    const numFailures = runKolmogorovSmirnovTests(NUM_SAMPLES, NUM_TESTS, () =>
      mockTezosTransactionHash()
    )
    if (numFailures > MAX_FAILURES) {
      console.log(`${(numFailures / NUM_TESTS) * 100}% Failure`)
    }
    expect(numFailures).toBeLessThanOrEqual(MAX_FAILURES)
  })
  it(`Ethereum hash seed passes Kolmogorov-Smirnov test`, () => {
    const numFailures = runKolmogorovSmirnovTests(NUM_SAMPLES, NUM_TESTS, () =>
      mockEthereumTransactionHash()
    )
    if (numFailures > MAX_FAILURES) {
      console.log(`${(numFailures / NUM_TESTS) * 100}% Failure`)
    }
    expect(numFailures).toBeLessThanOrEqual(MAX_FAILURES)
  })
})
