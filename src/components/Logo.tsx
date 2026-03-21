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
  subtext?: string
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
  animate = false,
  subtext = 'JSON Tools'
}: LogoProps) {
  const sizeMap = {
    sm: { text: 'lg', bracket: 'xl', spacing: 2 },
    md: { text: 'xl', bracket: '2xl', spacing: 3 },
    lg: { text: '2xl', bracket: '3xl', spacing: 4 },
  }

  const { text, bracket, spacing } = sizeMap[size]


  const bracketColor = useColorModeValue('amber.500', 'amber.300')
  const subtextColor = useColorModeValue('gray.600', 'gray.400')
  const titleColor = useColorModeValue('gray.800', 'white')
  const decorativeOpacity = useColorModeValue(0.6, 0.8)
  const decorativeTextColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Box textAlign="center">
      <HStack spacing={spacing} align="center" justify="center">
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
            color={titleColor}
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
              {subtext}
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
          opacity={decorativeOpacity}
          fontSize="xs"
          fontFamily="Monaco, 'Courier New', monospace"
          color={decorativeTextColor}
          w="100%"
        >
          <Text>&quot;format&quot;</Text>
          <Text color={bracketColor}>:</Text>
          <Text>&quot;validate&quot;</Text>
          <Text color={bracketColor}>:</Text>
          <Text>&quot;compare&quot;</Text>
        </HStack>
      )}
    </Box>
  )
}

// Simplified logo for navigation
export function LogoMark({ size = 'sm' }: Pick<LogoProps, 'size'>) {
  const bracketColor = useColorModeValue('amber.500', 'amber.400')

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="40px">
      <Box
        as="span"
        fontSize={size === 'sm' ? 'md' : 'lg'}
        fontWeight="bold"
        color={bracketColor}
        fontFamily="mono"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {'{'}
      </Box>
      <Box
        as="span"
        fontSize={size === 'sm' ? 'sm' : 'md'}
        fontWeight="bold"
        color="#000000"
        letterSpacing="tight"
        _dark={{ color: '#ffffff' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mx={1}
      >
        JSON DERULE
      </Box>
      <Box
        as="span"
        fontSize={size === 'sm' ? 'md' : 'lg'}
        fontWeight="bold"
        color={bracketColor}
        fontFamily="mono"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {'}'}
      </Box>
    </Box>
  )
}