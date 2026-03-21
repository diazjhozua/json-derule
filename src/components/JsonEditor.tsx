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
} from '@chakra-ui/react'
import { CopyIcon, DeleteIcon } from '@chakra-ui/icons'
import { useState } from 'react'

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
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="json-editor"
          fontFamily="Monaco, 'Courier New', monospace"
          fontSize="sm"
          height={height}
          minHeight={minHeight}
          resize="vertical"
          isReadOnly={isReadOnly}
          bg={isReadOnly ? 'gray.50' : 'white'}
          _dark={{
            bg: isReadOnly ? 'gray.800' : 'gray.900',
          }}
          spellCheck={false}
          whiteSpace="pre"
          overflowWrap="break-word"
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
    </VStack>
  )
}