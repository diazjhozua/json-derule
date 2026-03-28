export interface FormatResult {
  success: boolean
  result?: string
  error?: string
  errorLine?: number
}

function extractErrorLine(errorMessage: string, input: string): number {
  // "line N" format — Firefox, Node.js v20+
  const lineMatch = errorMessage.match(/\bline (\d+)/i)
  if (lineMatch) return parseInt(lineMatch[1], 10)

  // "position N" format — Chrome/V8
  const positionMatch = errorMessage.match(/\bposition (\d+)/)
  if (positionMatch) {
    const position = parseInt(positionMatch[1], 10)
    return input.substring(0, position).split('\n').length
  }

  // "Unexpected end of JSON input" — the error is at the last non-empty line
  if (/end/i.test(errorMessage)) {
    const lastNonEmpty = input.split('\n').reduce((acc, line, i) => (line.trim() ? i + 1 : acc), 1)
    return lastNonEmpty
  }

  // Last resort: highlight line 1
  return 1
}

/**
 * Formats JSON string with proper indentation
 */
export function formatJson(input: string, indent: number = 2): FormatResult {
  if (!input.trim()) {
    return {
      success: false,
      error: 'Input is empty',
    }
  }

  try {
    const parsed = JSON.parse(input)
    const formatted = JSON.stringify(parsed, null, indent)

    return {
      success: true,
      result: formatted,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return {
      success: false,
      error: errorMessage,
      errorLine: extractErrorLine(errorMessage, input),
    }
  }
}

/**
 * Minifies JSON by removing all whitespace
 */
export function minifyJson(input: string): FormatResult {
  if (!input.trim()) {
    return {
      success: false,
      error: 'Input is empty',
    }
  }

  try {
    const parsed = JSON.parse(input)
    const minified = JSON.stringify(parsed)

    return {
      success: true,
      result: minified,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return {
      success: false,
      error: errorMessage,
      errorLine: extractErrorLine(errorMessage, input),
    }
  }
}

/**
 * Validates if the input string is valid JSON
 */
export function isValidJson(input: string): boolean {
  if (!input.trim()) return false

  try {
    JSON.parse(input)
    return true
  } catch {
    return false
  }
}

/**
 * Gets the size of JSON in a human-readable format
 */
export function getJsonSize(input: string): {
  bytes: number
  readable: string
} {
  const bytes = new Blob([input]).size

  if (bytes < 1024) {
    return { bytes, readable: `${bytes} bytes` }
  } else if (bytes < 1024 * 1024) {
    return { bytes, readable: `${(bytes / 1024).toFixed(1)} KB` }
  } else {
    return { bytes, readable: `${(bytes / (1024 * 1024)).toFixed(1)} MB` }
  }
}