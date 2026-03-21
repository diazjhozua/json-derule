'use client'

import {
  Box,
  HStack,
  Text,
  Badge,
  useColorModeValue,
  VStack,
  Icon,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { CheckIcon, WarningIcon } from '@chakra-ui/icons'

const statusPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`

interface JsonStatusIndicatorProps {
  status: 'valid' | 'invalid' | 'processing' | 'empty'
  size?: number
  lines?: number
  animate?: boolean
}

export default function JsonStatusIndicator({
  status,
  size = 100,
  lines = 0,
  animate = true,
}: JsonStatusIndicatorProps) {
  const validColor = useColorModeValue('green.500', 'green.300')
  const invalidColor = useColorModeValue('red.500', 'red.300')
  const processingColor = useColorModeValue('amber.500', 'amber.300')
  const emptyColor = useColorModeValue('gray.400', 'gray.500')

  const statusConfig = {
    valid: {
      color: validColor,
      icon: CheckIcon,
      text: 'Valid JSON',
      bgColor: useColorModeValue('green.50', 'green.900'),
    },
    invalid: {
      color: invalidColor,
      icon: WarningIcon,
      text: 'Invalid JSON',
      bgColor: useColorModeValue('red.50', 'red.900'),
    },
    processing: {
      color: processingColor,
      icon: null,
      text: 'Processing...',
      bgColor: useColorModeValue('amber.50', 'amber.900'),
    },
    empty: {
      color: emptyColor,
      icon: null,
      text: 'Empty',
      bgColor: useColorModeValue('gray.50', 'gray.800'),
    },
  }

  const config = statusConfig[status]

  return (
    <HStack
      spacing={3}
      bg={config.bgColor}
      px={4}
      py={2}
      rounded="full"
      border="1px solid"
      borderColor={config.color}
      opacity={animate && status === 'processing' ? undefined : 1}
      animation={
        animate && status === 'processing'
          ? `${statusPulse} 1.5s ease-in-out infinite`
          : undefined
      }
    >
      {config.icon && (
        <Icon as={config.icon} color={config.color} boxSize={4} />
      )}

      <VStack spacing={0} align="start">
        <Text fontSize="sm" fontWeight="medium" color={config.color}>
          {config.text}
        </Text>
        {lines > 0 && (
          <Text fontSize="xs" opacity={0.8} color={config.color}>
            {lines} lines
          </Text>
        )}
      </VStack>

      {status === 'processing' && animate && (
        <HStack spacing={1}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              w="4px"
              h="4px"
              bg={config.color}
              rounded="full"
              animation={`${statusPulse} 1s ease-in-out infinite ${i * 0.2}s`}
            />
          ))}
        </HStack>
      )}
    </HStack>
  )
}

// JSON File Size Badge
export function JsonSizeBadge({
  bytes,
  variant = 'default',
}: {
  bytes: number
  variant?: 'default' | 'compact'
}) {
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
  }

  const getColorScheme = (bytes: number): string => {
    if (bytes < 1024) return 'green'
    if (bytes < 1024 * 10) return 'amber'
    if (bytes < 1024 * 100) return 'orange'
    return 'red'
  }

  return (
    <Badge
      colorScheme={getColorScheme(bytes)}
      variant="subtle"
      fontFamily="mono"
      fontSize={variant === 'compact' ? 'xs' : 'sm'}
    >
      {formatSize(bytes)}
    </Badge>
  )
}