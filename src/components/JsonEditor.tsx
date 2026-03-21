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

  const lineNumbersBg = useColorModeValue('gray.100', 'gray.700')
  const lineNumbersColor = useColorModeValue('gray.500', 'gray.400')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

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
          border="1px solid"
          borderColor={borderColor}
          borderRadius="md"
          overflow="hidden"
          bg="white"
          _dark={{ bg: 'gray.900' }}
        >
          {/* Line Numbers */}
          <Box
            ref={lineNumbersRef}
            width="45px"
            bg={lineNumbersBg}
            borderRight="1px solid"
            borderRightColor={borderColor}
            overflow="hidden"
            fontSize="sm"
            fontFamily="Monaco, 'Courier New', monospace"
            lineHeight="1.4"
            py={3}
            userSelect="none"
            position="relative"
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
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onScroll={handleScroll}
              placeholder={placeholder}
              className="json-editor"
              fontFamily="Monaco, 'Courier New', monospace"
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
              }}
              spellCheck={false}
              whiteSpace="pre"
              overflowWrap="break-word"
              lineHeight="1.4"
              py={3}
              pl={3}
              pr={10}
            />

            {value && (
              <Text
                position="absolute"
                bottom={2}
                right={2}
                fontSize="xs"
                color="gray.500"
                pointerEvents="none"
                bg="rgba(255,255,255,0.8)"
                px={1}
                rounded="sm"
                _dark={{
                  bg: 'rgba(0,0,0,0.8)',
                }}
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