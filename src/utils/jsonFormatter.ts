export interface FormatResult {
  success: boolean
  result?: string
  error?: string
  errorLine?: number
}

function extractErrorLine(errorMessage: string, input: string): number | undefined {
  const lineMatch = errorMessage.match(/line (\d+)/i)
  if (lineMatch) return parseInt(lineMatch[1], 10)

  const positionMatch = errorMessage.match(/position (\d+)/)
  if (positionMatch) {
    const position = parseInt(positionMatch[1], 10)
    return input.substring(0, position).split('\n').length
  }

  return undefined
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