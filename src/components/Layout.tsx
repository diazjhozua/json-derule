'use client'

import { Box, Container, VStack } from '@chakra-ui/react'
import Navigation from './Navigation'

interface LayoutProps {
  children: React.ReactNode
  maxWidth?: string
}

export default function Layout({ children, maxWidth = '6xl' }: LayoutProps) {
  return (
    <VStack spacing={0} minH="100vh" align="stretch">
      <Navigation />
      <Box flex={1} bg="gray.50" _dark={{ bg: 'gray.900' }}>
        <Container maxW={maxWidth} py={8}>
          {children}
        </Container>
      </Box>
    </VStack>
  )
}