'use client'

import {
  Box,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showSubtext?: boolean
  animate?: boolean
}

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
`

const bracketSlide = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(2px); }
  100% { transform: translateX(0); }
`

export default function Logo({
  size = 'md',
  showSubtext = false,
  animate = false
}: LogoProps) {
  const sizeMap = {
    sm: { text: 'lg', bracket: 'xl', spacing: 2 },
    md: { text: 'xl', bracket: '2xl', spacing: 3 },
    lg: { text: '2xl', bracket: '3xl', spacing: 4 },
  }

  const { text, bracket, spacing } = sizeMap[size]

  const brandGradient = useColorModeValue(
    'linear(to-r, teal.600, emerald.500)',
    'linear(to-r, teal.300, emerald.300)'
  )

  const bracketColor = useColorModeValue('amber.500', 'amber.300')
  const subtextColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box>
      <HStack spacing={spacing} align="center">
        {/* Opening Bracket */}
        <Text
          fontSize={bracket}
          fontWeight="bold"
          color={bracketColor}
          fontFamily="Monaco, 'Courier New', monospace"
          animation={animate ? `${bracketSlide} 2s ease-in-out infinite` : undefined}
          transition="all 0.3s ease"
          _hover={{
            transform: 'scale(1.1)',
            filter: 'drop-shadow(0 0 8px currentColor)',
          }}
        >
          {'{'}
        </Text>

        {/* Main Logo Text */}
        <Box>
          <Heading
            as="h1"
            fontSize={text}
            fontWeight="bold"
            bgGradient={brandGradient}
            bgClip="text"
            letterSpacing="tight"
            animation={animate ? `${pulseGlow} 3s ease-in-out infinite` : undefined}
          >
            JSON DERULE
          </Heading>

          {showSubtext && (
            <Text
              fontSize="xs"
              color={subtextColor}
              fontWeight="medium"
              textAlign="center"
              mt={-1}
              letterSpacing="wider"
              textTransform="uppercase"
            >
              JSON Tools
            </Text>
          )}
        </Box>

        {/* Closing Bracket */}
        <Text
          fontSize={bracket}
          fontWeight="bold"
          color={bracketColor}
          fontFamily="Monaco, 'Courier New', monospace"
          animation={animate ? `${bracketSlide} 2s ease-in-out infinite reverse` : undefined}
          transition="all 0.3s ease"
          _hover={{
            transform: 'scale(1.1)',
            filter: 'drop-shadow(0 0 8px currentColor)',
          }}
        >
          {'}'}
        </Text>
      </HStack>

      {/* Decorative JSON Structure Hint */}
      {size === 'lg' && (
        <HStack
          justify="center"
          mt={2}
          opacity={0.6}
          fontSize="xs"
          fontFamily="Monaco, 'Courier New', monospace"
          color={subtextColor}
        >
          <Text>"format"</Text>
          <Text color={bracketColor}>:</Text>
          <Text>"validate"</Text>
          <Text color={bracketColor}>:</Text>
          <Text>"compare"</Text>
        </HStack>
      )}
    </Box>
  )
}

// Simplified logo for navigation
export function LogoMark({ size = 'sm' }: Pick<LogoProps, 'size'>) {
  const bracketColor = useColorModeValue('amber.500', 'amber.300')
  const brandColor = useColorModeValue('teal.600', 'teal.300')

  return (
    <HStack spacing={1} align="center">
      <Text
        fontSize={size === 'sm' ? 'lg' : 'xl'}
        fontWeight="bold"
        color={bracketColor}
        fontFamily="Monaco, 'Courier New', monospace"
      >
        {'{'}
      </Text>
      <Text
        fontSize={size === 'sm' ? 'md' : 'lg'}
        fontWeight="bold"
        color={brandColor}
        letterSpacing="tight"
      >
        JSON
      </Text>
      <Text
        fontSize={size === 'sm' ? 'lg' : 'xl'}
        fontWeight="bold"
        color={bracketColor}
        fontFamily="Monaco, 'Courier New', monospace"
      >
        {'}'}
      </Text>
    </HStack>
  )
}