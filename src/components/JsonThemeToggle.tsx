'use client'

import { Box, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const flipAnimation = keyframes`
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(90deg); }
  100% { transform: rotateY(0deg); }
`

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 8px rgba(245, 158, 11, 0.3); }
  50% { box-shadow: 0 0 16px rgba(245, 158, 11, 0.6); }
`

export default function JsonThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box
      as="button"
      onClick={toggleColorMode}
      position="relative"
      minW="120px"
      h="40px"
      bg={useColorModeValue('rgba(13, 148, 136, 0.15)', 'rgba(13, 148, 136, 0.2)')}
      border="2px solid"
      borderColor={useColorModeValue('#0F766E', '#14B8A6')}
      borderRadius="8px"
      fontFamily="Monaco, 'Fira Code', 'JetBrains Mono', monospace"
      fontSize="sm"
      fontWeight="600"
      color={useColorModeValue('#0F766E', '#5EEAD4')}
      cursor="pointer"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      overflow="hidden"
      _hover={{
        bg: useColorModeValue('rgba(13, 148, 136, 0.25)', 'rgba(13, 148, 136, 0.3)'),
        borderColor: useColorModeValue('#0D9488', '#14B8A6'),
        transform: 'translateY(-2px)',
        animation: `${glowPulse} 2s infinite`,
        color: useColorModeValue('#0D9488', '#7DD3FC'),
      }}
      _active={{
        transform: 'translateY(0px)',
        animation: `${flipAnimation} 0.6s ease`,
      }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: colorMode === 'light' ? '0%' : '50%',
        width: '50%',
        height: '100%',
        bg: useColorModeValue('rgba(245, 158, 11, 0.3)', 'rgba(245, 158, 11, 0.2)'),
        borderRadius: '4px',
        transition: 'left 0.3s ease',
        zIndex: 1,
      }}
    >
      {/* JSON Key */}
      <Box
        position="absolute"
        top="2px"
        left="4px"
        fontSize="10px"
        opacity="0.6"
        zIndex="2"
      >
        &quot;theme&quot;:
      </Box>

      {/* Values Container */}
      <Box
        position="absolute"
        bottom="2px"
        left="0"
        right="0"
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        zIndex="2"
      >
        {/* Light Mode Value */}
        <Box
          fontSize="xs"
          fontWeight={colorMode === 'light' ? 'bold' : 'normal'}
          opacity={colorMode === 'light' ? 1 : 0.5}
          color={colorMode === 'light' ? '#F59E0B' : 'currentColor'}
          transition="all 0.3s ease"
          textShadow={colorMode === 'light' ? '0 0 8px rgba(245, 158, 11, 0.5)' : 'none'}
        >
          false
        </Box>

        {/* Dark Mode Value */}
        <Box
          fontSize="xs"
          fontWeight={colorMode === 'dark' ? 'bold' : 'normal'}
          opacity={colorMode === 'dark' ? 1 : 0.5}
          color={colorMode === 'dark' ? '#F59E0B' : 'currentColor'}
          transition="all 0.3s ease"
          textShadow={colorMode === 'dark' ? '0 0 8px rgba(245, 158, 11, 0.5)' : 'none'}
        >
          true
        </Box>
      </Box>

      {/* Blinking Cursor */}
      <Box
        position="absolute"
        top="50%"
        right="4px"
        transform="translateY(-50%)"
        w="1px"
        h="12px"
        bg="currentColor"
        animation={`${keyframes`
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        `} 1.5s infinite`}
        zIndex="2"
      />

      {/* Syntax Highlighting Shimmer */}
      <Box
        position="absolute"
        top="0"
        left="-100%"
        width="100%"
        height="100%"
        background="linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
        transition="left 0.5s ease"
        zIndex="1"
        sx={{
          '.chakra-button:hover &': {
            left: '100%',
          },
        }}
      />
    </Box>
  )
}