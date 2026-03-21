'use client'

import { Button, Box, useColorModeValue } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { ReactNode } from 'react'

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(245, 158, 11, 0.3), 0 0 10px rgba(245, 158, 11, 0.2); }
  50% { box-shadow: 0 0 15px rgba(245, 158, 11, 0.5), 0 0 25px rgba(245, 158, 11, 0.3); }
`

const cursorBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`

const syntaxHighlight = keyframes`
  0% { background: rgba(13, 148, 136, 0.1); }
  50% { background: rgba(245, 158, 11, 0.1); }
  100% { background: rgba(13, 148, 136, 0.1); }
`

interface JsonButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'format' | 'minify' | 'validate' | 'clear' | 'compare' | 'swap'
  isLoading?: boolean
  isDisabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export default function JsonButton({
  children,
  onClick,
  variant = 'format',
  isLoading = false,
  isDisabled = false,
  size = 'md',
  leftIcon,
  rightIcon
}: JsonButtonProps) {
  const getVariantStyles = () => {
    const baseStyles = {
      fontFamily: 'Monaco, "Fira Code", "JetBrains Mono", monospace',
      fontWeight: 600,
      letterSpacing: '0.5px',
      border: '2px solid',
      borderRadius: '8px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      _before: {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        transition: 'left 0.5s ease',
      },
      _hover: {
        _before: {
          left: '100%',
        },
      },
    }

    switch (variant) {
      case 'format':
        return {
          ...baseStyles,
          bg: useColorModeValue('rgba(13, 148, 136, 0.1)', 'rgba(13, 148, 136, 0.2)'),
          borderColor: useColorModeValue('#0D9488', '#14B8A6'),
          color: useColorModeValue('#0D9488', '#5EEAD4'),
          _hover: {
            ...baseStyles._hover,
            bg: useColorModeValue('rgba(13, 148, 136, 0.2)', 'rgba(13, 148, 136, 0.3)'),
            borderColor: '#14B8A6',
            transform: 'translateY(-2px)',
            animation: `${glowPulse} 2s infinite`,
            color: useColorModeValue('#0F766E', '#7DD3FC'),
          },
          _active: {
            transform: 'translateY(0px)',
            animation: `${syntaxHighlight} 0.6s ease`,
          },
        }

      case 'minify':
        return {
          ...baseStyles,
          bg: useColorModeValue('rgba(245, 158, 11, 0.1)', 'rgba(245, 158, 11, 0.2)'),
          borderColor: useColorModeValue('#F59E0B', '#FBBF24'),
          color: useColorModeValue('#F59E0B', '#FCD34D'),
          _hover: {
            ...baseStyles._hover,
            bg: useColorModeValue('rgba(245, 158, 11, 0.2)', 'rgba(245, 158, 11, 0.3)'),
            borderColor: '#FBBF24',
            transform: 'translateY(-2px)',
            animation: `${glowPulse} 2s infinite`,
            color: useColorModeValue('#D97706', '#FEF3C7'),
          },
          _active: {
            transform: 'translateY(0px)',
            animation: `${syntaxHighlight} 0.6s ease`,
          },
        }

      case 'validate':
        return {
          ...baseStyles,
          bg: useColorModeValue('rgba(34, 197, 94, 0.1)', 'rgba(34, 197, 94, 0.2)'),
          borderColor: useColorModeValue('#22C55E', '#4ADE80'),
          color: useColorModeValue('#22C55E', '#86EFAC'),
          _hover: {
            ...baseStyles._hover,
            bg: useColorModeValue('rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.3)'),
            borderColor: '#4ADE80',
            transform: 'translateY(-2px)',
            animation: `${glowPulse} 2s infinite`,
            color: useColorModeValue('#16A34A', '#DCFCE7'),
          },
          _active: {
            transform: 'translateY(0px)',
            animation: `${syntaxHighlight} 0.6s ease`,
          },
        }

      case 'clear':
        return {
          ...baseStyles,
          bg: useColorModeValue('rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.2)'),
          borderColor: useColorModeValue('#EF4444', '#F87171'),
          color: useColorModeValue('#EF4444', '#FCA5A5'),
          _hover: {
            ...baseStyles._hover,
            bg: useColorModeValue('rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.3)'),
            borderColor: '#F87171',
            transform: 'translateY(-2px)',
            animation: `${glowPulse} 2s infinite`,
            color: useColorModeValue('#DC2626', '#FEE2E2'),
          },
          _active: {
            transform: 'translateY(0px)',
            animation: `${syntaxHighlight} 0.6s ease`,
          },
        }

      case 'compare':
        return {
          ...baseStyles,
          bg: useColorModeValue('rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.2)'),
          borderColor: useColorModeValue('#8B5CF6', '#A78BFA'),
          color: useColorModeValue('#8B5CF6', '#C4B5FD'),
          _hover: {
            ...baseStyles._hover,
            bg: useColorModeValue('rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.3)'),
            borderColor: '#A78BFA',
            transform: 'translateY(-2px)',
            animation: `${glowPulse} 2s infinite`,
            color: useColorModeValue('#7C3AED', '#EDE9FE'),
          },
          _active: {
            transform: 'translateY(0px)',
            animation: `${syntaxHighlight} 0.6s ease`,
          },
        }

      case 'swap':
        return {
          ...baseStyles,
          bg: useColorModeValue('rgba(168, 85, 247, 0.1)', 'rgba(168, 85, 247, 0.2)'),
          borderColor: useColorModeValue('#A855F7', '#C084FC'),
          color: useColorModeValue('#A855F7', '#DDD6FE'),
          _hover: {
            ...baseStyles._hover,
            bg: useColorModeValue('rgba(168, 85, 247, 0.2)', 'rgba(168, 85, 247, 0.3)'),
            borderColor: '#C084FC',
            transform: 'translateY(-2px) rotateY(180deg)',
            animation: `${glowPulse} 2s infinite`,
            color: useColorModeValue('#9333EA', '#F3E8FF'),
          },
          _active: {
            transform: 'translateY(0px) rotateY(0deg)',
            animation: `${syntaxHighlight} 0.6s ease`,
          },
        }

      default:
        return baseStyles
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { px: 4, py: 2, fontSize: 'sm', minH: '36px' }
      case 'lg':
        return { px: 8, py: 4, fontSize: 'lg', minH: '48px' }
      default:
        return { px: 6, py: 3, fontSize: 'md', minH: '42px' }
    }
  }

  return (
    <Button
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
      sx={{
        ...getVariantStyles(),
        ...getSizeStyles(),
      }}
      leftIcon={leftIcon as any}
      rightIcon={rightIcon as any}
    >
      <Box
        as="span"
        display="flex"
        alignItems="center"
        gap={2}
        position="relative"
      >
        <Box as="span" opacity={0.7} fontSize="0.9em" color="currentColor">
          {variant === 'format' && '{ '}
          {variant === 'minify' && '[ '}
          {variant === 'validate' && '✓ '}
          {variant === 'clear' && '∅ '}
          {variant === 'compare' && '⚡ '}
          {variant === 'swap' && '↔ '}
        </Box>

        {children}

        <Box as="span" opacity={0.7} fontSize="0.9em" color="currentColor">
          {variant === 'format' && ' }'}
          {variant === 'minify' && ' ]'}
          {variant === 'validate' && ''}
          {variant === 'clear' && ''}
          {variant === 'compare' && ''}
          {variant === 'swap' && ''}
        </Box>

        {isLoading && (
          <Box
            as="span"
            ml={2}
            w="1px"
            h="1em"
            bg="currentColor"
            animation={`${cursorBlink} 1s infinite`}
          />
        )}
      </Box>
    </Button>
  )
}

// Specialized button components for each use case
export function FormatButton(props: Omit<JsonButtonProps, 'variant'>) {
  return <JsonButton {...props} variant="format" />
}

export function MinifyButton(props: Omit<JsonButtonProps, 'variant'>) {
  return <JsonButton {...props} variant="minify" />
}

export function ValidateButton(props: Omit<JsonButtonProps, 'variant'>) {
  return <JsonButton {...props} variant="validate" />
}

export function ClearButton(props: Omit<JsonButtonProps, 'variant'>) {
  return <JsonButton {...props} variant="clear" />
}

export function CompareButton(props: Omit<JsonButtonProps, 'variant'>) {
  return <JsonButton {...props} variant="compare" />
}

export function SwapButton(props: Omit<JsonButtonProps, 'variant'>) {
  return <JsonButton {...props} variant="swap" />
}