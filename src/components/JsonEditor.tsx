'use client'

import {
  Textarea,
  Box,
  Button,
  HStack,
  Text,
  useToast,
  VStack,
  FormLabel,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import { CopyIcon, DeleteIcon } from '@chakra-ui/icons'
import { useState, useRef, useEffect } from 'react'
import { JsonEmptyState, CornerBrackets } from './JsonDecorations'

interface JsonEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  isReadOnly?: boolean
  height?: string
  minHeight?: string
}

export default function JsonEditor({
  value,
  onChange,
  placeholder = 'Paste your JSON here...',
  label,
  isReadOnly = false,
  height = '400px',
  minHeight = '200px',
}: JsonEditorProps) {
  const toast = useToast()
  const [isCopying, setIsCopying] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  const lineNumbersBg = useColorModeValue('gray.100', 'gray.800')
  const lineNumbersColor = useColorModeValue('gray.500', 'gray.400')
  const borderColor = useColorModeValue('brand.200', 'brand.700')
  const editorBg = useColorModeValue('white', 'gray.900')
  const focusColor = useColorModeValue('brand.400', 'brand.300')
  const shadowColor = useColorModeValue('rgba(13, 148, 136, 0.1)', 'rgba(45, 212, 191, 0.2)')

  // Calculate number of lines
  const lines = value.split('\n')
  const lineCount = Math.max(1, lines.length)

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  const handleCopy = async () => {
    try {
      setIsCopying(true)
      await navigator.clipboard.writeText(value)
      toast({
        title: 'Copied!',
        description: 'JSON copied to clipboard',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Copy failed',
        description: 'Failed to copy to clipboard',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsCopying(false)
    }
  }

  const handleClear = () => {
    onChange('')
    toast({
      title: 'Cleared',
      description: 'Editor content cleared',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <VStack spacing={3} align="stretch">
      {label && (
        <HStack justify="space-between" align="center">
          <FormLabel mb={0} fontSize="sm" fontWeight="medium">
            {label}
          </FormLabel>
          <HStack spacing={2}>
            {value && (
              <Button
                size="xs"
                variant="ghost"
                leftIcon={<CopyIcon />}
                onClick={handleCopy}
                isLoading={isCopying}
                loadingText="Copying"
              >
                Copy
              </Button>
            )}
            {!isReadOnly && value && (
              <Button
                size="xs"
                variant="ghost"
                leftIcon={<DeleteIcon />}
                onClick={handleClear}
                colorScheme="red"
              >
                Clear
              </Button>
            )}
          </HStack>
        </HStack>
      )}

      <Box position="relative">
        <Flex
          border="2px solid"
          borderColor={borderColor}
          borderRadius="xl"
          overflow="hidden"
          bg={editorBg}
          boxShadow={`0 4px 12px ${shadowColor}`}
          transition="all 0.2s ease"
          _hover={{
            borderColor: focusColor,
            boxShadow: `0 8px 24px ${shadowColor}`,
          }}
          _focusWithin={{
            borderColor: focusColor,
            boxShadow: `0 0 0 1px ${focusColor}, 0 8px 24px ${shadowColor}`,
          }}
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: `linear-gradient(45deg, ${focusColor}, transparent, ${focusColor})`,
            borderRadius: 'xl',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            zIndex: -1,
          }}
          _focusWithin_before={{
            opacity: 0.1,
          }}
        >
          {/* Line Numbers */}
          <Box
            ref={lineNumbersRef}
            width="50px"
            bg={lineNumbersBg}
            borderRight="2px solid"
            borderRightColor={borderColor}
            overflow="hidden"
            fontSize="sm"
            fontFamily="mono"
            lineHeight="1.4"
            py={4}
            userSelect="none"
            position="relative"
            _before={{
              content: '"{"',
              position: 'absolute',
              top: 1,
              left: 2,
              fontSize: 'xs',
              color: 'amber.400',
              opacity: 0.5,
            }}
            _after={{
              content: '"}"',
              position: 'absolute',
              bottom: 1,
              left: 2,
              fontSize: 'xs',
              color: 'amber.400',
              opacity: 0.5,
            }}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <Text
                key={i + 1}
                color={lineNumbersColor}
                textAlign="right"
                px={2}
                height="1.4em"
                fontSize="sm"
              >
                {i + 1}
              </Text>
            ))}
          </Box>

          {/* Code Editor */}
          <Box flex={1} position="relative">
            {!value && !isReadOnly && (
              <Box position="absolute" inset={0} zIndex={1} pointerEvents="none">
                <JsonEmptyState
                  title="Start typing JSON"
                  description="Paste or type your JSON content here"
                  showAnimation={true}
                />
              </Box>
            )}

            <CornerBrackets size="sm" />

            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onScroll={handleScroll}
              placeholder={placeholder}
              className="json-editor"
              fontFamily="mono"
              fontSize="sm"
              height={height}
              minHeight={minHeight}
              resize="vertical"
              isReadOnly={isReadOnly}
              bg={isReadOnly ? 'gray.50' : 'transparent'}
              _dark={{
                bg: isReadOnly ? 'gray.800' : 'transparent',
              }}
              border="none"
              borderRadius={0}
              _focus={{
                boxShadow: 'none',
                border: 'none',
                outline: 'none',
              }}
              _hover={{
                bg: isReadOnly ? 'gray.50' : 'transparent',
              }}
              spellCheck={false}
              whiteSpace="pre"
              overflowWrap="break-word"
              lineHeight="1.4"
              py={4}
              pl={4}
              pr={12}
              color={useColorModeValue('gray.800', 'gray.100')}
              _placeholder={{
                color: useColorModeValue('gray.400', 'gray.500'),
                fontStyle: 'italic',
              }}
            />

            {value && (
              <Text
                position="absolute"
                bottom={3}
                right={3}
                fontSize="xs"
                color="gray.500"
                pointerEvents="none"
                bg={useColorModeValue('rgba(255,255,255,0.9)', 'rgba(0,0,0,0.9)')}
                px={2}
                py={1}
                rounded="md"
                fontFamily="mono"
                border="1px solid"
                borderColor={useColorModeValue('gray.200', 'gray.600')}
                backdropFilter="blur(4px)"
              >
                {value.length} chars
              </Text>
            )}
          </Box>
        </Flex>
      </Box>
    </VStack>
  )
}