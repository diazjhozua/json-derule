export interface ComparisonResult {
  areEqual: boolean
  differences: Difference[]
  summary: ComparisonSummary
}

export interface Difference {
  path: string
  type: 'added' | 'removed' | 'modified' | 'type-changed'
  oldValue?: any
  newValue?: any
  oldType?: string
  newType?: string
}

export interface ComparisonSummary {
  totalDifferences: number
  added: number
  removed: number
  modified: number
  typeChanged: number
}

/**
 * Compares two JSON objects and returns detailed differences
 */
export function compareJson(json1: string, json2: string): ComparisonResult {
  try {
    const obj1 = JSON.parse(json1)
    const obj2 = JSON.parse(json2)

    const differences = findDifferences(obj1, obj2, '')
    const summary = createSummary(differences)

    return {
      areEqual: differences.length === 0,
      differences,
      summary,
    }
  } catch (error) {
    throw new Error(`Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Recursively finds differences between two objects
 */
function findDifferences(obj1: any, obj2: any, path: string): Difference[] {
  const differences: Difference[] = []

  // Handle null/undefined cases
  if (obj1 === null && obj2 === null) return differences
  if (obj1 === null && obj2 !== null) {
    differences.push({
      path: path || 'root',
      type: 'added',
      newValue: obj2,
      newType: getType(obj2),
    })
    return differences
  }
  if (obj1 !== null && obj2 === null) {
    differences.push({
      path: path || 'root',
      type: 'removed',
      oldValue: obj1,
      oldType: getType(obj1),
    })
    return differences
  }

  // Check for type differences
  const type1 = getType(obj1)
  const type2 = getType(obj2)

  if (type1 !== type2) {
    differences.push({
      path: path || 'root',
      type: 'type-changed',
      oldValue: obj1,
      newValue: obj2,
      oldType: type1,
      newType: type2,
    })
    return differences
  }

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    const maxLength = Math.max(obj1.length, obj2.length)

    for (let i = 0; i < maxLength; i++) {
      const currentPath = path ? `${path}[${i}]` : `[${i}]`

      if (i >= obj1.length) {
        differences.push({
          path: currentPath,
          type: 'added',
          newValue: obj2[i],
          newType: getType(obj2[i]),
        })
      } else if (i >= obj2.length) {
        differences.push({
          path: currentPath,
          type: 'removed',
          oldValue: obj1[i],
          oldType: getType(obj1[i]),
        })
      } else {
        differences.push(...findDifferences(obj1[i], obj2[i], currentPath))
      }
    }

    return differences
  }

  // Handle objects
  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])

    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key

      if (!(key in obj1)) {
        differences.push({
          path: currentPath,
          type: 'added',
          newValue: obj2[key],
          newType: getType(obj2[key]),
        })
      } else if (!(key in obj2)) {
        differences.push({
          path: currentPath,
          type: 'removed',
          oldValue: obj1[key],
          oldType: getType(obj1[key]),
        })
      } else {
        differences.push(...findDifferences(obj1[key], obj2[key], currentPath))
      }
    }

    return differences
  }

  // Handle primitives
  if (obj1 !== obj2) {
    differences.push({
      path: path || 'root',
      type: 'modified',
      oldValue: obj1,
      newValue: obj2,
      oldType: type1,
      newType: type2,
    })
  }

  return differences
}

/**
 * Gets the type of a value for comparison
 */
function getType(value: any): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

/**
 * Creates a summary of differences
 */
function createSummary(differences: Difference[]): ComparisonSummary {
  const summary: ComparisonSummary = {
    totalDifferences: differences.length,
    added: 0,
    removed: 0,
    modified: 0,
    typeChanged: 0,
  }

  differences.forEach((diff) => {
    switch (diff.type) {
      case 'added':
        summary.added++
        break
      case 'removed':
        summary.removed++
        break
      case 'modified':
        summary.modified++
        break
      case 'type-changed':
        summary.typeChanged++
        break
    }
  })

  return summary
}

/**
 * Formats a value for display in comparison
 */
export function formatValueForDisplay(value: any): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return `"${value}"`
  if (typeof value === 'object') return JSON.stringify(value, null, 2)
  return String(value)
}

/**
 * Gets a color scheme for difference types
 */
export function getDifferenceColor(type: Difference['type']): {
  bg: string
  color: string
  label: string
} {
  switch (type) {
    case 'added':
      return { bg: 'green.100', color: 'green.800', label: 'Added' }
    case 'removed':
      return { bg: 'red.100', color: 'red.800', label: 'Removed' }
    case 'modified':
      return { bg: 'orange.100', color: 'orange.800', label: 'Modified' }
    case 'type-changed':
      return { bg: 'purple.100', color: 'purple.800', label: 'Type Changed' }
    default:
      return { bg: 'gray.100', color: 'gray.800', label: 'Unknown' }
  }
}