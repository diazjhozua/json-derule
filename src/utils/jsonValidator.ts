export interface ValidationResult {
  isValid: boolean
  error?: string
  errorLine?: number
  errorColumn?: number
  suggestion?: string
  data?: unknown
  stats?: JsonStats
}

export interface JsonStats {
  size: number
  depth: number
  keys: number
  values: number
  arrays: number
  objects: number
  strings: number
  numbers: number
  booleans: number
  nulls: number
}

/**
 * Validates JSON and provides detailed error information
 */
export function validateJson(input: string): ValidationResult {
  if (!input.trim()) {
    return {
      isValid: false,
      error: 'Input is empty',
      suggestion: 'Please enter some JSON to validate',
    }
  }

  try {
    const parsed = JSON.parse(input)
    const stats = getJsonStats(parsed)

    return {
      isValid: true,
      data: parsed,
      stats,
    }
  } catch (error) {
    return parseJsonError(error as Error, input)
  }
}

/**
 * Parses JSON error and extracts useful information
 */
function parseJsonError(error: Error, input: string): ValidationResult {
  const message = error.message
  let errorLine: number | undefined
  let errorColumn: number | undefined
  let suggestion: string | undefined

  // "line N" format — Firefox, Node.js v20+
  const lineMatch = message.match(/\bline (\d+)/i)
  if (lineMatch) {
    errorLine = parseInt(lineMatch[1], 10)
    const colMatch = message.match(/column (\d+)/i)
    errorColumn = colMatch ? parseInt(colMatch[1], 10) : undefined
  }

  // "position N" format — Chrome/V8 (only if line not already found)
  if (!errorLine) {
    const positionMatch = message.match(/\bposition (\d+)/)
    if (positionMatch) {
      const position = parseInt(positionMatch[1], 10)
      const lines = input.substring(0, position).split('\n')
      errorLine = lines.length
      errorColumn = lines[lines.length - 1].length + 1
    }
  }

  // "Unexpected end" — point to last non-empty line
  if (!errorLine && /end/i.test(message)) {
    errorLine = input.split('\n').reduce((acc, line, i) => (line.trim() ? i + 1 : acc), 1)
  }

  // Last resort
  if (!errorLine) errorLine = 1

  // Provide suggestions based on common errors
  if (message.includes('Unexpected token')) {
    if (message.includes("'")) {
      suggestion = "JSON strings must use double quotes (\") instead of single quotes (')"
    } else if (message.includes('Unexpected token }')) {
      suggestion = 'Remove trailing comma before closing brace'
    } else if (message.includes('Unexpected token ]')) {
      suggestion = 'Remove trailing comma before closing bracket'
    } else {
      suggestion = 'Check for invalid characters or missing quotes around strings'
    }
  } else if (message.includes('Unexpected end')) {
    suggestion = 'JSON is incomplete. Check for missing closing braces or brackets'
  } else if (message.includes('Expected')) {
    suggestion = 'Check JSON syntax - missing quotes, commas, or brackets'
  }

  return {
    isValid: false,
    error: message,
    errorLine,
    errorColumn,
    suggestion,
  }
}

/**
 * Analyzes JSON structure and provides statistics
 */
function getJsonStats(data: unknown): JsonStats {
  const stats: JsonStats = {
    size: JSON.stringify(data).length,
    depth: 0,
    keys: 0,
    values: 0,
    arrays: 0,
    objects: 0,
    strings: 0,
    numbers: 0,
    booleans: 0,
    nulls: 0,
  }

  function analyze(obj: unknown, currentDepth = 0): void {
    stats.depth = Math.max(stats.depth, currentDepth)

    if (obj === null) {
      stats.nulls++
      stats.values++
    } else if (typeof obj === 'boolean') {
      stats.booleans++
      stats.values++
    } else if (typeof obj === 'number') {
      stats.numbers++
      stats.values++
    } else if (typeof obj === 'string') {
      stats.strings++
      stats.values++
    } else if (Array.isArray(obj)) {
      stats.arrays++
      stats.values++
      (obj as unknown[]).forEach((item) => analyze(item, currentDepth + 1))
    } else if (typeof obj === 'object' && obj !== null) {
      stats.objects++
      stats.values++
      const record = obj as Record<string, unknown>
      Object.keys(record).forEach((key) => {
        stats.keys++
        analyze(record[key], currentDepth + 1)
      })
    }
  }

  analyze(data)
  return stats
}

/**
 * Formats validation errors for display
 */
export function formatValidationError(result: ValidationResult): string {
  if (result.isValid) return ''

  let formatted = result.error || 'Unknown error'

  if (result.errorLine) {
    formatted += ` (Line ${result.errorLine}`
    if (result.errorColumn) {
      formatted += `, Column ${result.errorColumn}`
    }
    formatted += ')'
  }

  return formatted
}