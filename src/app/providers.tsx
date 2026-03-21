'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import ErrorBoundary from '@/components/ErrorBoundary'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
    mono: `'Monaco', 'SF Mono', 'Roboto Mono', 'Courier New', monospace`,
  },
  fontSizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    md: '1rem',        // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: 2,
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  space: {
    px: '1px',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
  },
  sizes: {
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    '3xs': '14rem',    // 224px
    '2xs': '16rem',    // 256px
    xs: '20rem',       // 320px
    sm: '24rem',       // 384px
    md: '28rem',       // 448px
    lg: '32rem',       // 512px
    xl: '36rem',       // 576px
    '2xl': '42rem',    // 672px
    '3xl': '48rem',    // 768px
    '4xl': '56rem',    // 896px
    '5xl': '64rem',    // 1024px
    '6xl': '72rem',    // 1152px
    '7xl': '80rem',    // 1280px
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  colors: {
    // Primary Brand Color - Deep Emerald/Teal
    brand: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#0D9488',  // Main brand color
      600: '#0f766e',
      700: '#115e59',
      800: '#134e4a',
      900: '#042f2e',
    },
    // Secondary - Warm Amber
    amber: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#F59E0B',  // Secondary brand color
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    // Accent - Rich Purple
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7C3AED',  // Accent color
      800: '#6b21a8',
      900: '#581c87',
    },
    // Enhanced Neutrals with warm undertones
    gray: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
    },
  },
  styles: {
    global: {
      body: {
        transitionProperty: 'background-color',
        transitionDuration: '200ms',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        transitionDuration: '200ms',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          _hover: {
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
            filter: 'brightness(110%)',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        outline: {
          _hover: {
            transform: 'translateY(-1px)',
            boxShadow: 'md',
            borderColor: 'brand.400',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
      },
      sizes: {
        sm: {
          fontSize: 'sm',
          px: 4,
          py: 2,
        },
        md: {
          fontSize: 'md',
          px: 6,
          py: 3,
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          transitionProperty: 'transform, box-shadow',
          transitionDuration: '200ms',
          borderRadius: 'xl',
          boxShadow: 'sm',
          border: '1px solid',
          borderColor: 'gray.200',
          _dark: {
            borderColor: 'gray.700',
            bg: 'gray.800',
          },
        },
      },
      variants: {
        elevated: {
          container: {
            boxShadow: 'lg',
            _hover: {
              boxShadow: 'xl',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        fontFamily: 'Monaco, "Courier New", monospace',
        transitionProperty: 'border-color, box-shadow',
        transitionDuration: '200ms',
        borderRadius: 'lg',
      },
      variants: {
        outline: {
          _focus: {
            borderColor: 'brand.400',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
          },
          _hover: {
            borderColor: 'brand.300',
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 'lg',
            _focus: {
              borderColor: 'brand.400',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
            },
            _hover: {
              borderColor: 'brand.300',
            },
          },
        },
      },
    },
    Code: {
      baseStyle: {
        fontFamily: 'Monaco, "Courier New", monospace',
      },
    },
    Alert: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          borderWidth: '1px',
        },
      },
      variants: {
        subtle: {
          container: {
            bg: 'brand.50',
            borderColor: 'brand.200',
            _dark: {
              bg: 'brand.900',
              borderColor: 'brand.700',
            },
          },
        },
        'left-accent': {
          container: {
            borderLeftWidth: '4px',
            borderLeftColor: 'brand.500',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        lineHeight: 'shorter',
        letterSpacing: 'tight',
      },
      sizes: {
        xs: {
          fontSize: 'md',
          lineHeight: 'base',
        },
        sm: {
          fontSize: 'lg',
          lineHeight: 'base',
        },
        md: {
          fontSize: 'xl',
          lineHeight: 'short',
        },
        lg: {
          fontSize: '2xl',
          lineHeight: 'short',
        },
        xl: {
          fontSize: '3xl',
          lineHeight: 'shorter',
        },
        '2xl': {
          fontSize: '4xl',
          lineHeight: 'shorter',
        },
      },
      variants: {
        'json-themed': {
          position: 'relative',
          _before: {
            content: '"{"',
            position: 'absolute',
            left: '-1.5em',
            color: 'amber.400',
            fontFamily: 'mono',
            opacity: 0.6,
          },
          _after: {
            content: '"}"',
            position: 'absolute',
            right: '-1.5em',
            color: 'amber.400',
            fontFamily: 'mono',
            opacity: 0.6,
          },
        },
      },
    },
    Text: {
      baseStyle: {
        lineHeight: 'base',
      },
      variants: {
        caption: {
          fontSize: 'sm',
          color: 'gray.600',
          lineHeight: 'tall',
          _dark: {
            color: 'gray.400',
          },
        },
        code: {
          fontFamily: 'mono',
          fontSize: 'sm',
          bg: 'gray.100',
          px: 1,
          py: 0.5,
          borderRadius: 'sm',
          _dark: {
            bg: 'gray.800',
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 'medium',
        fontSize: 'xs',
        textTransform: 'none',
        letterSpacing: 'normal',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
        },
        'json-key': {
          bg: 'purple.100',
          color: 'purple.700',
          _dark: {
            bg: 'purple.900',
            color: 'purple.200',
          },
        },
        'json-value': {
          bg: 'amber.100',
          color: 'amber.700',
          _dark: {
            bg: 'amber.900',
            color: 'amber.200',
          },
        },
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </ChakraProvider>
  )
}