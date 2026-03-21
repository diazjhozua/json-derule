'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import ErrorBoundary from '@/components/ErrorBoundary'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
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
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 'medium',
        fontSize: 'xs',
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