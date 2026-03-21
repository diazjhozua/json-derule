// JSON Formatter Types
export interface FormatOptions {
  indent: number;
  sortKeys?: boolean;
}

export interface FormatResult {
  success: boolean;
  result?: string;
  error?: string;
  errorLine?: number;
}

// JSON Validator Types
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  errorLine?: number;
  errorColumn?: number;
  suggestion?: string;
  data?: any;
  stats?: JsonStats;
}

export interface JsonStats {
  size: number;
  depth: number;
  keys: number;
  values: number;
  arrays: number;
  objects: number;
  strings: number;
  numbers: number;
  booleans: number;
  nulls: number;
}

// JSON Comparison Types
export interface ComparisonResult {
  areEqual: boolean;
  differences: Difference[];
  summary: ComparisonSummary;
}

export interface Difference {
  path: string;
  type: 'added' | 'removed' | 'modified' | 'type-changed';
  oldValue?: any;
  newValue?: any;
  oldType?: string;
  newType?: string;
}

export interface ComparisonSummary {
  totalDifferences: number;
  added: number;
  removed: number;
  modified: number;
  typeChanged: number;
}

// Component Props Types
export interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  isReadOnly?: boolean;
  height?: string;
  minHeight?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

// Tool State Types
export interface FormatterState {
  input: string;
  output: string;
  isProcessing: boolean;
  error: string | null;
  indent: number;
}

export interface ValidatorState {
  input: string;
  result: ValidationResult | null;
  isValidating: boolean;
}

export interface ComparisonState {
  json1: string;
  json2: string;
  result: ComparisonResult | null;
  isComparing: boolean;
  error: string | null;
}
