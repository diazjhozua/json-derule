import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JSON Validator Online - Validate JSON Syntax & Structure | JSON DERULE',
  description: 'Free online JSON validator with detailed error reporting. Validate JSON syntax, check structure, get line-by-line error messages with suggestions. Real-time validation as you type.',
  keywords: [
    'json validator', 'validate json online', 'json syntax checker', 'json verification',
    'check json validity', 'json error checker', 'json validation tool', 'json parser online'
  ],
  openGraph: {
    title: 'JSON Validator Online - Validate JSON with Detailed Error Reports',
    description: 'Professional JSON validation tool with real-time error checking, detailed error messages, and helpful suggestions for fixing invalid JSON.',
    url: 'https://jhozuad.github.io/json-derule/validator',
  },
}

import {
  Box,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  useToast,
  Flex,
  Divider,
  Icon,
  Switch,
  FormControl,
  FormLabel,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiCode, FiLayers } from 'react-icons/fi'
import { useState, useEffect, useCallback } from 'react'
import Layout from '@/components/Layout'
import JsonEditor from '@/components/JsonEditor'
import Logo from '@/components/Logo'
import { FloatingBrackets, JsonLoadingDots } from '@/components/JsonDecorations'
import { ValidateButton, ClearButton } from '@/components/JsonButton'
import { validateJson, formatValidationError } from '@/utils/jsonValidator'
import { useKeyboardShortcuts, createShortcuts } from '@/utils/useKeyboardShortcuts'
import { ValidationResult } from '@/types'

export default function ValidatorPage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [autoValidate, setAutoValidate] = useState(true)

  const toast = useToast()

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      toast({
        title: 'No input',
        description: 'Please enter some JSON to validate',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsValidating(true)

    // Add small delay for better UX
    setTimeout(() => {
      const validationResult = validateJson(input)
      setResult(validationResult)
      setIsValidating(false)

      if (!autoValidate) {
        toast({
          title: validationResult.isValid ? 'Valid JSON' : 'Invalid JSON',
          description: validationResult.isValid
            ? 'Your JSON is valid and properly formatted'
            : 'Found validation errors in your JSON',
          status: validationResult.isValid ? 'success' : 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }, 100)
  }, [input, toast, autoValidate])

  // Auto-validation with debounce
  useEffect(() => {
    if (!autoValidate || !input.trim()) {
      setResult(null)
      return
    }

    const timeoutId = setTimeout(() => {
      handleValidate()
    }, 500) // 500ms debounce

    return () => clearTimeout(timeoutId)
  }, [input, autoValidate, handleValidate])

  const handleClear = () => {
    setInput('')
    setResult(null)
    toast({
      title: 'Cleared',
      description: 'Input and results have been cleared',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  // Keyboard shortcuts
  useKeyboardShortcuts([
    createShortcuts.validate(() => !autoValidate && handleValidate()),
    createShortcuts.clear(handleClear),
  ])

  return (
    <Layout variant="wide">
      <Box position="relative">
        <FloatingBrackets animate={true} />

        <VStack spacing={10} align="stretch">
        <Box textAlign="center">
          <Logo size="lg" showSubtext={true} animate={true} subtext="Validator" />
          <Text color={useColorModeValue('gray.600', 'gray.300')} mt={4}>
            Validate your JSON syntax and get detailed analysis with helpful suggestions
          </Text>
        </Box>

        {/* Controls */}
        <Box
          bg={useColorModeValue('gray.50', 'gray.700')}
          p={6}
          rounded="xl"
          border="2px solid"
          borderColor={useColorModeValue('green.200', 'green.600')}
          boxShadow="lg"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 6,
            width: '60px',
            height: '2px',
            bg: 'green.500',
            borderRadius: '1px',
          }}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={6}
            align={{ base: 'stretch', md: 'center' }}
            justify="space-between"
          >
          <FormControl display="flex" alignItems="center" maxW="200px">
            <FormLabel fontSize="sm" mb={0}>
              Auto-validate
            </FormLabel>
            <Switch
              isChecked={autoValidate}
              onChange={(e) => setAutoValidate(e.target.checked)}
              colorScheme="blue"
            />
          </FormControl>

          <HStack spacing={3}>
            <ValidateButton
              onClick={handleValidate}
              isLoading={isValidating}
              isDisabled={!input.trim() || autoValidate}
              size="sm"
            >
              Validate
            </ValidateButton>
            <ClearButton
              onClick={handleClear}
              isDisabled={!input}
              size="sm"
            >
              Clear
            </ClearButton>
          </HStack>
          </Flex>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mt={2}>
          {/* Input Editor */}
          <VStack spacing={4} align="stretch">
            <Text fontWeight="medium" fontSize="sm">
              JSON Input
            </Text>
            <JsonEditor
              value={input}
              onChange={setInput}
              placeholder="Paste your JSON here to validate..."
              height="500px"
            />
          </VStack>

          {/* Results Panel */}
          <VStack spacing={4} align="stretch">
            <Text fontWeight="medium" fontSize="sm">
              Validation Results
            </Text>

            <Box
              border="1px"
              borderColor="gray.200"
              rounded="md"
              p={4}
              minH="500px"
              bg="gray.50"
              _dark={{
                borderColor: 'gray.600',
                bg: 'gray.800',
              }}
            >
              {!input.trim() ? (
                <Box textAlign="center" py={20}>
                  <Icon as={FiCode} boxSize={12} color="gray.400" mb={4} />
                  <Text color="gray.500">
                    Enter JSON in the editor to see validation results
                  </Text>
                </Box>
              ) : result ? (
                <VStack spacing={4} align="stretch">
                  {/* Status */}
                  <Alert
                    status={result.isValid ? 'success' : 'error'}
                    rounded="md"
                  >
                    <AlertIcon />
                    <Box flex={1}>
                      <AlertTitle>
                        {result.isValid ? 'Valid JSON!' : 'Invalid JSON'}
                      </AlertTitle>
                      {result.isValid ? (
                        <AlertDescription>
                          Your JSON is syntactically correct and ready to use.
                        </AlertDescription>
                      ) : (
                        <AlertDescription>
                          {formatValidationError(result)}
                          {result.suggestion && (
                            <Box mt={2}>
                              <Text fontWeight="medium" fontSize="sm">
                                💡 Suggestion: {result.suggestion}
                              </Text>
                            </Box>
                          )}
                        </AlertDescription>
                      )}
                    </Box>
                  </Alert>

                  {/* JSON Statistics (only for valid JSON) */}
                  {result.isValid && result.stats && (
                    <Card>
                      <CardHeader pb={2}>
                        <HStack>
                          <Icon as={FiLayers} color="blue.500" />
                          <Text fontWeight="medium">JSON Analysis</Text>
                        </HStack>
                      </CardHeader>
                      <CardBody pt={0}>
                        <SimpleGrid columns={2} spacing={4}>
                          <Stat>
                            <StatLabel fontSize="xs">Size</StatLabel>
                            <StatNumber fontSize="md">
                              {result.stats.size.toLocaleString()}
                            </StatNumber>
                            <StatHelpText fontSize="xs">bytes</StatHelpText>
                          </Stat>

                          <Stat>
                            <StatLabel fontSize="xs">Depth</StatLabel>
                            <StatNumber fontSize="md">
                              {result.stats.depth}
                            </StatNumber>
                            <StatHelpText fontSize="xs">levels</StatHelpText>
                          </Stat>

                          <Stat>
                            <StatLabel fontSize="xs">Keys</StatLabel>
                            <StatNumber fontSize="md">
                              {result.stats.keys.toLocaleString()}
                            </StatNumber>
                            <StatHelpText fontSize="xs">properties</StatHelpText>
                          </Stat>

                          <Stat>
                            <StatLabel fontSize="xs">Values</StatLabel>
                            <StatNumber fontSize="md">
                              {result.stats.values.toLocaleString()}
                            </StatNumber>
                            <StatHelpText fontSize="xs">total</StatHelpText>
                          </Stat>
                        </SimpleGrid>

                        <Divider my={4} />

                        <VStack spacing={3} align="stretch">
                          <Text fontSize="sm" fontWeight="medium" color="gray.600">
                            Data Types
                          </Text>
                          <SimpleGrid columns={2} spacing={2}>
                            {result.stats.objects > 0 && (
                              <HStack justify="space-between">
                                <HStack>
                                  <Badge colorScheme="blue" size="sm">Objects</Badge>
                                </HStack>
                                <Text fontSize="sm">{result.stats.objects}</Text>
                              </HStack>
                            )}

                            {result.stats.arrays > 0 && (
                              <HStack justify="space-between">
                                <HStack>
                                  <Badge colorScheme="green" size="sm">Arrays</Badge>
                                </HStack>
                                <Text fontSize="sm">{result.stats.arrays}</Text>
                              </HStack>
                            )}

                            {result.stats.strings > 0 && (
                              <HStack justify="space-between">
                                <HStack>
                                  <Badge colorScheme="purple" size="sm">Strings</Badge>
                                </HStack>
                                <Text fontSize="sm">{result.stats.strings}</Text>
                              </HStack>
                            )}

                            {result.stats.numbers > 0 && (
                              <HStack justify="space-between">
                                <HStack>
                                  <Badge colorScheme="orange" size="sm">Numbers</Badge>
                                </HStack>
                                <Text fontSize="sm">{result.stats.numbers}</Text>
                              </HStack>
                            )}

                            {result.stats.booleans > 0 && (
                              <HStack justify="space-between">
                                <HStack>
                                  <Badge colorScheme="teal" size="sm">Booleans</Badge>
                                </HStack>
                                <Text fontSize="sm">{result.stats.booleans}</Text>
                              </HStack>
                            )}

                            {result.stats.nulls > 0 && (
                              <HStack justify="space-between">
                                <HStack>
                                  <Badge colorScheme="gray" size="sm">Nulls</Badge>
                                </HStack>
                                <Text fontSize="sm">{result.stats.nulls}</Text>
                              </HStack>
                            )}
                          </SimpleGrid>
                        </VStack>
                      </CardBody>
                    </Card>
                  )}
                </VStack>
              ) : isValidating ? (
                <Box textAlign="center" py={20}>
                  <VStack spacing={4}>
                    <JsonLoadingDots />
                    <Text color="gray.500">Validating JSON...</Text>
                  </VStack>
                </Box>
              ) : (
                <Box textAlign="center" py={20}>
                  <Text color="gray.500">
                    Results will appear here after validation
                  </Text>
                </Box>
              )}
            </Box>
          </VStack>
        </SimpleGrid>

        {/* Tips */}
        <Box
          bg={useColorModeValue('green.50', 'green.900')}
          p={6}
          rounded="xl"
          border="2px solid"
          borderColor={useColorModeValue('green.200', 'green.600')}
        >
          <Text fontSize="sm" color={useColorModeValue('green.700', 'green.200')}>
            <strong>💡 Tips:</strong> Turn on auto-validate for real-time feedback as you type,
            or turn it off and use the validate button for manual checking. The validator provides
            detailed error messages with line numbers and helpful suggestions to fix common issues.
            <br />
            <strong>⌨️ Shortcuts:</strong> Ctrl+V to validate (when auto-validate is off), Ctrl+K to clear.
          </Text>
        </Box>
        </VStack>
      </Box>
    </Layout>
  )
}