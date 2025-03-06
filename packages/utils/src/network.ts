const DEFAULT_RETRY_OPTIONS = {
  maxAttempts: 5,
  initialDelay: 500,
  maxDelay: 32000,
  factor: 2,
  jitter: 0.1,
}

interface RetryOptions {
  maxAttempts?: number
  initialDelay?: number
  maxDelay?: number
  factor?: number
  jitter?: number
}

export async function withExponentialBackoff<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_RETRY_OPTIONS, ...options }
  let attempt = 1
  let delay = opts.initialDelay

  while (true) {
    try {
      return await operation()
    } catch (error) {
      if (attempt >= opts.maxAttempts) {
        throw error
      }

      // Calculate delay with jitter
      const jitterAmount = delay * opts.jitter
      const actualDelay = delay + (Math.random() * 2 - 1) * jitterAmount

      await new Promise(resolve => setTimeout(resolve, actualDelay))

      delay = Math.min(delay * opts.factor, opts.maxDelay)
      attempt++
    }
  }
}
