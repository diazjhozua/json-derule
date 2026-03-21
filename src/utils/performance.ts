import { useCallback, useRef, useEffect, useState } from 'react'

/**
 * Custom hook for debouncing values with cleanup
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Custom hook for debounced callbacks
 */
export function useDebounceCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>()

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  ) as T

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}

/**
 * Custom hook for throttling callbacks
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastRan = useRef<number>(0)

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()

      if (now - lastRan.current >= delay) {
        lastRan.current = now
        callback(...args)
      }
    },
    [callback, delay]
  ) as T

  return throttledCallback
}

/**
 * Performance monitoring utility
 */
export const Performance = {
  /**
   * Measures function execution time
   */
  measure<T>(name: string, fn: () => T): T {
    const start = performance.now()
    const result = fn()
    const end = performance.now()

    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`)
    }

    return result
  },

  /**
   * Measures async function execution time
   */
  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()

    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`)
    }

    return result
  },

  /**
   * Creates a performance mark
   */
  mark(name: string) {
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(name)
    }
  },

  /**
   * Measures between two marks
   */
  measureBetween(name: string, startMark: string, endMark?: string) {
    if (typeof performance !== 'undefined' && performance.measure) {
      try {
        performance.measure(name, startMark, endMark)
        const entry = performance.getEntriesByName(name)[0]

        if (process.env.NODE_ENV === 'development' && entry) {
          console.log(`⏱️ ${name}: ${entry.duration.toFixed(2)}ms`)
        }
      } catch {
        // Ignore if marks don't exist
      }
    }
  },
}

/**
 * Optimizes large lists by calculating visible items
 */
export function calculateVisibleItems(
  containerHeight: number,
  itemHeight: number,
  scrollTop: number,
  buffer: number = 5
): { start: number; end: number; total: number } {
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer)
  const end = start + visibleCount + buffer * 2

  return {
    start,
    end,
    total: visibleCount,
  }
}