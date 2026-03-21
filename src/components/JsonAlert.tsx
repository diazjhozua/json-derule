'use client'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Text,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface JsonAlertProps {
  status: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  children?: ReactNode
  showBrackets?: boolean
}

export default function JsonAlert({
  status,
  title,
  description,
  children,
  showBrackets = true,
}: JsonAlertProps) {
  const bracketColor = useColorModeValue('amber.500', 'amber.300')

  const statusConfig = {
    success: {
      bg: useColorModeValue('green.50', 'green.900'),
      borderColor: useColorModeValue('green.200', 'green.700'),
      iconColor: useColorModeValue('green.500', 'green.300'),
    },
    error: {
      bg: useColorModeValue('red.50', 'red.900'),
      borderColor: useColorModeValue('red.200', 'red.700'),
      iconColor: useColorModeValue('red.500', 'red.300'),
    },
    warning: {
      bg: useColorModeValue('amber.50', 'amber.900'),
      borderColor: useColorModeValue('amber.200', 'amber.700'),
      iconColor: useColorModeValue('amber.500', 'amber.300'),
    },
    info: {
      bg: useColorModeValue('brand.50', 'brand.900'),
      borderColor: useColorModeValue('brand.200', 'brand.700'),
      iconColor: useColorModeValue('brand.500', 'brand.300'),
    },
  }

  const config = statusConfig[status]

  return (
    <Alert
      status={status}
      bg={config.bg}
      borderColor={config.borderColor}
      borderWidth="2px"
      borderRadius="xl"
      boxShadow="lg"
      p={4}
      position="relative"
      overflow="hidden"
      _before={showBrackets ? {
        content: '"{"',
        position: 'absolute',
        top: 2,
        left: 2,
        fontSize: 'lg',
        fontFamily: 'mono',
        color: bracketColor,
        opacity: 0.3,
        fontWeight: 'bold',
      } : {}}
      _after={showBrackets ? {
        content: '"}"',
        position: 'absolute',
        bottom: 2,
        right: 2,
        fontSize: 'lg',
        fontFamily: 'mono',
        color: bracketColor,
        opacity: 0.3,
        fontWeight: 'bold',
      } : {}}
    >
      <HStack align="start" spacing={3} position="relative" zIndex={1}>
        <AlertIcon color={config.iconColor} mt={0.5} />
        <Box flex={1}>
          <AlertTitle fontSize="md" fontWeight="semibold" mb={1}>
            {title}
          </AlertTitle>
          {description && (
            <AlertDescription fontSize="sm" opacity={0.9}>
              {description}
            </AlertDescription>
          )}
          {children}
        </Box>
      </HStack>
    </Alert>
  )
}

// Specialized JSON Error Alert
export function JsonErrorAlert({
  title = 'Invalid JSON',
  error,
  line,
  suggestion,
}: {
  title?: string
  error: string
  line?: number
  suggestion?: string
}) {
  return (
    <JsonAlert status="error" title={title}>
      <Box mt={2}>
        <Text fontSize="sm" fontFamily="mono" color="red.700" _dark={{ color: 'red.300' }}>
          {error}
        </Text>
        {line && (
          <Text fontSize="xs" mt={1} opacity={0.8}>
            Line {line}
          </Text>
        )}
        {suggestion && (
          <Box
            mt={3}
            p={3}
            bg="red.100"
            _dark={{ bg: 'red.800' }}
            borderRadius="md"
            borderLeft="3px solid"
            borderLeftColor="red.400"
            w="100%"
            maxW="none"
          >
            <Text fontSize="sm" fontWeight="medium" mb={1}>
              💡 Suggestion:
            </Text>
            <Text fontSize="sm" lineHeight="tall">{suggestion}</Text>
          </Box>
        )}
      </Box>
    </JsonAlert>
  )
}

// Specialized JSON Success Alert
export function JsonSuccessAlert({
  title = 'Valid JSON',
  stats,
}: {
  title?: string
  stats?: {
    size: number
    keys: number
    depth: number
  }
}) {
  return (
    <JsonAlert status="success" title={title}>
      {stats && (
        <HStack mt={2} spacing={4} fontSize="sm">
          <Text>
            <Text as="span" fontFamily="mono" color="green.600" _dark={{ color: 'green.300' }}>
              {stats.size.toLocaleString()}
            </Text>{' '}
            bytes
          </Text>
          <Text>
            <Text as="span" fontFamily="mono" color="green.600" _dark={{ color: 'green.300' }}>
              {stats.keys}
            </Text>{' '}
            keys
          </Text>
          <Text>
            <Text as="span" fontFamily="mono" color="green.600" _dark={{ color: 'green.300' }}>
              {stats.depth}
            </Text>{' '}
            levels
          </Text>
        </HStack>
      )}
    </JsonAlert>
  )
}