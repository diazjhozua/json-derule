'use client'

import {
  Box,
  Button,
  HStack,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Badge,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { useState } from 'react'
import Layout from '@/components/Layout'
import JsonEditor from '@/components/JsonEditor'
import { formatJson, minifyJson, getJsonSize, isValidJson } from '@/utils/jsonFormatter'
import { useKeyboardShortcuts, createShortcuts } from '@/utils/useKeyboardShortcuts'
import { FormatResult } from '@/types'

export default function FormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorLine, setErrorLine] = useState<number | undefined>(undefined)
  const [indent, setIndent] = useState(2)
  const [lastOperation, setLastOperation] = useState<'format' | 'minify' | null>(null)

  const toast = useToast()

  const handleFormat = () => {
    if (!input.trim()) {
      toast({
        title: 'No input',
        description: 'Please enter some JSON to format',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsProcessing(true)
    setError(null)
    setErrorLine(undefined)

    // Add small delay to show processing state for better UX
    setTimeout(() => {
      const result: FormatResult = formatJson(input, indent)

      if (result.success && result.result) {
        setOutput(result.result)
        setLastOperation('format')
        toast({
          title: 'JSON Formatted',
          description: 'JSON has been formatted successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      } else {
        setError(result.error || 'Unknown error occurred')
        setErrorLine(result.errorLine)
        setOutput(input) // show raw input as best-effort
        setLastOperation(null)
      }

      setIsProcessing(false)
    }, 100)
  }

  const handleMinify = () => {
    if (!input.trim()) {
      toast({
        title: 'No input',
        description: 'Please enter some JSON to minify',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsProcessing(true)
    setError(null)
    setErrorLine(undefined)

    setTimeout(() => {
      const result: FormatResult = minifyJson(input)

      if (result.success && result.result) {
        setOutput(result.result)
        setLastOperation('minify')
        toast({
          title: 'JSON Minified',
          description: 'JSON has been minified successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      } else {
        setError(result.error || 'Unknown error occurred')
        setErrorLine(result.errorLine)
        setOutput(input) // show raw input as best-effort
        setLastOperation(null)
      }

      setIsProcessing(false)
    }, 100)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError(null)
    setErrorLine(undefined)
    setLastOperation(null)
    toast({
      title: 'Cleared',
      description: 'All content has been cleared',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  // Keyboard shortcuts
  useKeyboardShortcuts([
    createShortcuts.format(handleFormat),
    createShortcuts.minify(handleMinify),
    createShortcuts.clear(handleClear),
  ])

  const inputSize = input ? getJsonSize(input) : null
  const outputSize = output ? getJsonSize(output) : null
  const isValidInput = input ? isValidJson(input) : false

  return (
    <Layout>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            JSON Formatter
          </Heading>
          <Text color="gray.600">
            Format and beautify your JSON or minify it for production
          </Text>
        </Box>

        {/* Controls */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={4}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
          bg="gray.50"
          p={4}
          rounded="md"
          _dark={{ bg: 'gray.800' }}
        >
          <HStack spacing={4} flex={1}>
            <FormControl maxW="150px">
              <FormLabel fontSize="sm" mb={1}>
                Indentation
              </FormLabel>
              <NumberInput
                value={indent}
                onChange={(_, value) => setIndent(value || 2)}
                min={1}
                max={8}
                size="sm"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            {input && (
              <VStack spacing={1} align="start">
                <Text fontSize="xs" color="gray.500">
                  Input Status
                </Text>
                <Badge
                  colorScheme={isValidInput ? 'green' : 'red'}
                  size="sm"
                >
                  {isValidInput ? 'Valid JSON' : 'Invalid JSON'}
                </Badge>
              </VStack>
            )}
          </HStack>

          <HStack spacing={2}>
            <Button
              colorScheme="blue"
              onClick={handleFormat}
              isLoading={isProcessing && lastOperation !== 'minify'}
              loadingText="Formatting..."
              isDisabled={!input.trim()}
              size="sm"
            >
              Format
            </Button>
            <Button
              colorScheme="green"
              variant="outline"
              onClick={handleMinify}
              isLoading={isProcessing && lastOperation !== 'format'}
              loadingText="Minifying..."
              isDisabled={!input.trim()}
              size="sm"
            >
              Minify
            </Button>
            <Button
              variant="ghost"
              onClick={handleClear}
              isDisabled={!input && !output}
              size="sm"
            >
              Clear All
            </Button>
          </HStack>
        </Flex>

        {/* Error Display */}
        {error && (
          <Alert status="error" rounded="md">
            <AlertIcon />
            <Box>
              <AlertTitle>
                Invalid JSON{errorLine ? ` — line ${errorLine}` : ''}
              </AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Editors */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {/* Input Editor */}
          <VStack spacing={3} align="stretch">
            <Flex justify="space-between" align="center">
              <Text fontWeight="medium" fontSize="sm">
                Input JSON
              </Text>
              {inputSize && (
                <Text fontSize="xs" color="gray.500">
                  {inputSize.readable}
                </Text>
              )}
            </Flex>
            <JsonEditor
              value={input}
              onChange={setInput}
              placeholder="Paste your JSON here to format or minify..."
              height="500px"
              errorLine={errorLine}
            />
          </VStack>

          {/* Output Editor */}
          <VStack spacing={3} align="stretch">
            <Flex justify="space-between" align="center">
              <Text fontWeight="medium" fontSize="sm">
                Formatted Output
                {lastOperation && (
                  <Badge ml={2} colorScheme="blue" size="sm">
                    {lastOperation === 'format' ? 'Formatted' : 'Minified'}
                  </Badge>
                )}
                {error && output && (
                  <Badge ml={2} colorScheme="orange" size="sm">
                    Raw (invalid)
                  </Badge>
                )}
              </Text>
              {outputSize && (
                <Text fontSize="xs" color="gray.500">
                  {outputSize.readable}
                  {inputSize && (
                    <span>
                      {' • '}
                      {lastOperation === 'minify'
                        ? `${Math.round((1 - outputSize.bytes / inputSize.bytes) * 100)}% smaller`
                        : `${Math.round((outputSize.bytes / inputSize.bytes - 1) * 100)}% larger`
                      }
                    </span>
                  )}
                </Text>
              )}
            </Flex>
            <JsonEditor
              value={output}
              onChange={() => {}} // Read-only
              placeholder="Formatted JSON will appear here..."
              isReadOnly
              height="500px"
            />
          </VStack>
        </SimpleGrid>

        {/* Tips */}
        <Box bg="blue.50" p={4} rounded="md" _dark={{ bg: 'blue.900' }}>
          <Text fontSize="sm" color="blue.700" _dark={{ color: 'blue.200' }}>
            <strong>💡 Tips:</strong> Paste any JSON to format it with proper indentation, or minify it to remove all whitespace.
            You can adjust the indentation level using the controls above.
            <br />
            <strong>⌨️ Shortcuts:</strong> Ctrl+F to format, Ctrl+M to minify, Ctrl+K to clear all.
          </Text>
        </Box>
      </VStack>
    </Layout>
  )
}