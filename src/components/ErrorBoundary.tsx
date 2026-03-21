'use client'

import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Code,
  useColorModeValue,
} from '@chakra-ui/react'
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: any
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Box
          minH="400px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={8}
        >
          <VStack spacing={6} maxW="600px" textAlign="center">
            <Alert status="error" rounded="lg" p={6}>
              <AlertIcon boxSize={8} />
              <Box flex={1} ml={4}>
                <AlertTitle fontSize="xl" mb={2}>
                  Oops! Something went wrong
                </AlertTitle>
                <AlertDescription fontSize="md">
                  An unexpected error occurred while processing your request.
                  Please try again or refresh the page.
                </AlertDescription>
              </Box>
            </Alert>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box
                w="full"
                bg="gray.50"
                _dark={{ bg: 'gray.800' }}
                p={4}
                rounded="md"
                textAlign="left"
              >
                <Text fontSize="sm" fontWeight="bold" mb={2} color="red.600">
                  Error Details (Development Mode):
                </Text>
                <Code
                  display="block"
                  whiteSpace="pre-wrap"
                  p={3}
                  fontSize="xs"
                  bg="red.50"
                  _dark={{ bg: 'red.900' }}
                  rounded="sm"
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack && (
                    <>
                      {'\n\nComponent Stack:'}
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </Code>
              </Box>
            )}

            <VStack spacing={3}>
              <Button colorScheme="blue" onClick={this.handleReset}>
                Try Again
              </Button>
              <Button
                variant="ghost"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </VStack>
          </VStack>
        </Box>
      )
    }

    return this.props.children
  }
}

// Simple error boundary hook for function components
export function withErrorBoundary<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: T) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  return WrappedComponent
}