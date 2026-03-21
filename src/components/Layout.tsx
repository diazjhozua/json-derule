'use client'

import { Box, Container, VStack, useColorModeValue } from '@chakra-ui/react'
import Navigation from './Navigation'

interface LayoutProps {
  children: React.ReactNode
  maxWidth?: string
  variant?: 'default' | 'wide' | 'narrow'
  showBackground?: boolean
}

export default function Layout({
  children,
  maxWidth,
  variant = 'default',
  showBackground = true
}: LayoutProps) {
  const containerSizes = {
    default: '6xl',
    wide: '7xl',
    narrow: '4xl',
  }

  const finalMaxWidth = maxWidth || containerSizes[variant]

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const bgGradient = useColorModeValue(
    'linear(to-br, gray.50, gray.100)',
    'linear(to-br, gray.900, gray.800)'
  )
  const overlayGradient = useColorModeValue(
    'linear(to-b, brand.50, transparent)',
    'linear(to-b, brand.900, transparent)'
  )
  const containerBg = useColorModeValue('white', 'gray.800')
  const containerShadow = useColorModeValue(
    '0 10px 30px rgba(13, 148, 136, 0.1)',
    '0 10px 30px rgba(0, 0, 0, 0.3)'
  )
  const containerBorder = useColorModeValue('brand.100', 'brand.800')

  return (
    <VStack spacing={0} minH="100vh" align="stretch">
      <Navigation />

      <Box
        flex={1}
        bg={showBackground ? bgColor : 'transparent'}
        bgGradient={showBackground ? bgGradient : undefined}
        position="relative"
        _before={showBackground ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          bgGradient: overlayGradient,
          opacity: 0.5,
          pointerEvents: 'none',
        } : {}}
      >
        <Container
          maxW={finalMaxWidth}
          py={10}
          px={6}
          position="relative"
          zIndex={1}
        >
          <Box
            bg={containerBg}
            borderRadius="2xl"
            boxShadow={containerShadow}
            border="1px solid"
            borderColor={containerBorder}
            overflow="hidden"
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              bgGradient: 'linear(to-r, brand.500, amber.400, purple.500)',
            }}
          >
            <Box p={8}>
              {children}
            </Box>
          </Box>
        </Container>
      </Box>
    </VStack>
  )
}

// Specialized layout variants
export function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout variant="wide" showBackground>
      {children}
    </Layout>
  )
}

export function CompactLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout variant="narrow" showBackground={false}>
      {children}
    </Layout>
  )
}