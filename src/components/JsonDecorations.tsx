'use client'

import {
  Box,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  keyframes,
  Flex,
} from '@chakra-ui/react'
import { keyframes as emotionKeyframes } from '@emotion/react'

// JSON Bracket Animations
const bracketPulse = emotionKeyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
`

const bracketFloat = emotionKeyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
`

const jsonFlow = emotionKeyframes`
  0% { opacity: 0; transform: translateX(-10px); }
  50% { opacity: 1; transform: translateX(0px); }
  100% { opacity: 0; transform: translateX(10px); }
`

// Floating JSON Brackets
export function FloatingBrackets({ animate = true }: { animate?: boolean }) {
  const bracketColor = useColorModeValue('amber.400', 'amber.300')

  return (
    <Box position="absolute" top={4} right={4} pointerEvents="none">
      <HStack spacing={2} opacity={0.4}>
        <Text
          fontFamily="mono"
          fontSize="lg"
          color={bracketColor}
          animation={animate ? `${bracketFloat} 3s ease-in-out infinite` : undefined}
        >
          {'{'}
        </Text>
        <Text
          fontFamily="mono"
          fontSize="lg"
          color={bracketColor}
          animation={animate ? `${bracketFloat} 3s ease-in-out infinite 0.5s` : undefined}
        >
          {'}'}
        </Text>
      </HStack>
    </Box>
  )
}

// JSON Code Flow Animation
export function JsonCodeFlow() {
  const textColor = useColorModeValue('gray.400', 'gray.600')

  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      pointerEvents="none"
      opacity={0.1}
    >
      <VStack spacing={2} fontFamily="mono" fontSize="xs" color={textColor}>
        {[
          '{ "format": true,',
          '  "validate": "json",',
          '  "compare": ["old", "new"],',
          '  "tools": 3 }',
        ].map((line, index) => (
          <Text
            key={index}
            animation={`${jsonFlow} 4s ease-in-out infinite ${index * 0.5}s`}
          >
            {line}
          </Text>
        ))}
      </VStack>
    </Box>
  )
}

// Corner Brackets
export function CornerBrackets({
  size = 'md',
  color,
}: {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}) {
  const bracketColor = color || useColorModeValue('brand.300', 'brand.500')
  const sizes = { sm: '12px', md: '16px', lg: '20px' }
  const bracketsSize = sizes[size]

  return (
    <>
      {/* Top Left */}
      <Box
        position="absolute"
        top={2}
        left={2}
        width={bracketsSize}
        height={bracketsSize}
        borderTop="2px solid"
        borderLeft="2px solid"
        borderColor={bracketColor}
        opacity={0.6}
      />
      {/* Top Right */}
      <Box
        position="absolute"
        top={2}
        right={2}
        width={bracketsSize}
        height={bracketsSize}
        borderTop="2px solid"
        borderRight="2px solid"
        borderColor={bracketColor}
        opacity={0.6}
      />
      {/* Bottom Left */}
      <Box
        position="absolute"
        bottom={2}
        left={2}
        width={bracketsSize}
        height={bracketsSize}
        borderBottom="2px solid"
        borderLeft="2px solid"
        borderColor={bracketColor}
        opacity={0.6}
      />
      {/* Bottom Right */}
      <Box
        position="absolute"
        bottom={2}
        right={2}
        width={bracketsSize}
        height={bracketsSize}
        borderBottom="2px solid"
        borderRight="2px solid"
        borderColor={bracketColor}
        opacity={0.6}
      />
    </>
  )
}

// JSON Empty State Illustration
export function JsonEmptyState({
  title = 'No JSON Data',
  description = 'Paste your JSON here to get started',
  showAnimation = true,
}: {
  title?: string
  description?: string
  showAnimation?: boolean
}) {
  const bracketColor = useColorModeValue('amber.400', 'amber.300')
  const textColor = useColorModeValue('gray.500', 'gray.400')

  return (
    <VStack spacing={6} py={16} px={8} textAlign="center">
      <Box position="relative">
        <VStack spacing={3} fontFamily="mono" fontSize="2xl" color={bracketColor}>
          <Text
            animation={showAnimation ? `${bracketPulse} 2s ease-in-out infinite` : undefined}
          >
            {'{'}
          </Text>
          <HStack spacing={4} opacity={0.7}>
            <Text fontSize="sm">"data"</Text>
            <Text color="purple.400">:</Text>
            <Text fontSize="sm" color="gray.400">"..."</Text>
          </HStack>
          <Text
            animation={showAnimation ? `${bracketPulse} 2s ease-in-out infinite 0.5s` : undefined}
          >
            {'}'}
          </Text>
        </VStack>
      </Box>

      <VStack spacing={2}>
        <Text fontSize="lg" fontWeight="semibold" color={textColor}>
          {title}
        </Text>
        <Text fontSize="sm" color={textColor} opacity={0.8}>
          {description}
        </Text>
      </VStack>
    </VStack>
  )
}

// JSON Syntax Highlighter for Code Snippets
export function JsonSyntax({
  json,
  compact = false,
}: {
  json: any
  compact?: boolean
}) {
  const keyColor = useColorModeValue('purple.600', 'purple.300')
  const stringColor = useColorModeValue('green.600', 'green.300')
  const numberColor = useColorModeValue('amber.600', 'amber.300')
  const bracketColor = useColorModeValue('gray.600', 'gray.400')

  const formatValue = (value: any, key?: string): JSX.Element => {
    if (typeof value === 'string') {
      return (
        <Text as="span" color={stringColor}>
          "{value}"
        </Text>
      )
    }
    if (typeof value === 'number') {
      return (
        <Text as="span" color={numberColor}>
          {value}
        </Text>
      )
    }
    if (typeof value === 'boolean') {
      return (
        <Text as="span" color={numberColor}>
          {value.toString()}
        </Text>
      )
    }
    if (value === null) {
      return (
        <Text as="span" color="gray.500">
          null
        </Text>
      )
    }
    return <Text as="span">{JSON.stringify(value)}</Text>
  }

  const jsonString = compact ? JSON.stringify(json) : JSON.stringify(json, null, 2)

  return (
    <Box
      fontFamily="mono"
      fontSize="sm"
      bg={useColorModeValue('gray.50', 'gray.800')}
      p={4}
      rounded="lg"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      maxH="300px"
      overflowY="auto"
    >
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
        <Text as="span" color={bracketColor}>
          {jsonString}
        </Text>
      </pre>
    </Box>
  )
}

// Animated JSON Loading Dots
export function JsonLoadingDots() {
  const dotColor = useColorModeValue('brand.400', 'brand.300')

  return (
    <HStack spacing={1}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          w="6px"
          h="6px"
          bg={dotColor}
          rounded="full"
          animation={`${bracketPulse} 1s ease-in-out infinite ${i * 0.3}s`}
        />
      ))}
    </HStack>
  )
}