'use client'

import {
  Box,
  Button,
  VStack,
  HStack,
  Heading,
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
  Badge,
  useToast,
  Flex,
  Divider,
  Icon,
  Switch,
  FormControl,
  FormLabel,
  Code,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
} from '@chakra-ui/react'
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons'
import { FiGitCompare, FiPlus, FiMinus, FiEdit, FiRefreshCw } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import JsonEditor from '@/components/JsonEditor'
import { FloatingBrackets, JsonLoadingDots } from '@/components/JsonDecorations'
import { compareJson, formatValueForDisplay, getDifferenceColor } from '@/utils/jsonComparison'
import { useKeyboardShortcuts, createShortcuts } from '@/utils/useKeyboardShortcuts'
import { ComparisonResult, Difference } from '@/types'

export default function ComparePage() {
  const [json1, setJson1] = useState('')
  const [json2, setJson2] = useState('')
  const [result, setResult] = useState<ComparisonResult | null>(null)
  const [isComparing, setIsComparing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [autoCompare, setAutoCompare] = useState(false)

  const toast = useToast()

  // Auto-comparison with debounce
  useEffect(() => {
    if (!autoCompare || !json1.trim() || !json2.trim()) {
      if (autoCompare) {
        setResult(null)
        setError(null)
      }
      return
    }

    const timeoutId = setTimeout(() => {
      handleCompare()
    }, 800) // 800ms debounce for comparison (longer due to complexity)

    return () => clearTimeout(timeoutId)
  }, [json1, json2, autoCompare])

  const handleCompare = () => {
    if (!json1.trim() || !json2.trim()) {
      toast({
        title: 'Missing input',
        description: 'Please enter JSON in both editors to compare',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsComparing(true)
    setError(null)

    // Add delay for better UX
    setTimeout(() => {
      try {
        const comparisonResult = compareJson(json1, json2)
        setResult(comparisonResult)
        setError(null)

        if (!autoCompare) {
          toast({
            title: comparisonResult.areEqual ? 'JSONs are identical' : 'Differences found',
            description: comparisonResult.areEqual
              ? 'Both JSON objects are exactly the same'
              : `Found ${comparisonResult.summary.totalDifferences} difference(s)`,
            status: comparisonResult.areEqual ? 'success' : 'info',
            duration: 3000,
            isClosable: true,
          })
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Comparison failed'
        setError(errorMessage)
        setResult(null)
      }

      setIsComparing(false)
    }, 200)
  }

  const handleClear = () => {
    setJson1('')
    setJson2('')
    setResult(null)
    setError(null)
    toast({
      title: 'Cleared',
      description: 'All inputs and results have been cleared',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  const handleSwap = () => {
    setJson1(json2)
    setJson2(json1)
    toast({
      title: 'Swapped',
      description: 'Left and right JSON inputs have been swapped',
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  // Keyboard shortcuts
  useKeyboardShortcuts([
    createShortcuts.compare(() => !autoCompare && handleCompare()),
    createShortcuts.clear(handleClear),
    {
      key: 's',
      ctrlKey: true,
      action: handleSwap,
      description: 'Swap inputs (Ctrl+S)',
    },
  ])

  const getDifferenceIcon = (type: Difference['type']) => {
    switch (type) {
      case 'added':
        return FiPlus
      case 'removed':
        return FiMinus
      case 'modified':
      case 'type-changed':
        return FiEdit
      default:
        return FiEdit
    }
  }

  const cardBg = useColorModeValue('white', 'gray.800')

  return (
    <Layout variant="wide">
      <Box position="relative">
        <FloatingBrackets animate={true} />

        <VStack spacing={10} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            JSON Compare
          </Heading>
          <Text color="gray.600">
            Compare two JSON objects and visualize the differences with detailed change tracking
          </Text>
        </Box>

        {/* Controls */}
        <Box
          bg="gray.50"
          _dark={{ bg: 'gray.800' }}
          p={6}
          rounded="xl"
          border="2px solid"
          borderColor="purple.100"
          _dark={{ borderColor: 'purple.800' }}
          boxShadow="lg"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 6,
            width: '60px',
            height: '2px',
            bg: 'purple.500',
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
              Auto-compare
            </FormLabel>
            <Switch
              isChecked={autoCompare}
              onChange={(e) => setAutoCompare(e.target.checked)}
              colorScheme="purple"
            />
          </FormControl>

          <HStack spacing={2}>
            <Button
              colorScheme="purple"
              onClick={handleCompare}
              isLoading={isComparing}
              loadingText="Comparing..."
              isDisabled={!json1.trim() || !json2.trim() || autoCompare}
              size="sm"
            >
              Compare
            </Button>
            <Button
              variant="outline"
              onClick={handleSwap}
              leftIcon={<Icon as={FiRefreshCw} />}
              isDisabled={!json1.trim() && !json2.trim()}
              size="sm"
            >
              Swap
            </Button>
            <Button
              variant="ghost"
              onClick={handleClear}
              isDisabled={!json1.trim() && !json2.trim()}
              size="sm"
            >
              Clear All
            </Button>
          </HStack>
          </Flex>
        </Box>

        {/* Error Display */}
        {error && (
          <Alert status="error" rounded="md">
            <AlertIcon />
            <Box>
              <AlertTitle>Comparison Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Box>
          </Alert>
        )}

        {/* JSON Input Editors */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mt={2}>
          <VStack spacing={3} align="stretch">
            <Text fontWeight="medium" fontSize="sm">
              JSON 1 (Left)
            </Text>
            <JsonEditor
              value={json1}
              onChange={setJson1}
              placeholder="Paste first JSON here..."
              height="400px"
            />
          </VStack>

          <VStack spacing={3} align="stretch">
            <Text fontWeight="medium" fontSize="sm">
              JSON 2 (Right)
            </Text>
            <JsonEditor
              value={json2}
              onChange={setJson2}
              placeholder="Paste second JSON here..."
              height="400px"
            />
          </VStack>
        </SimpleGrid>

        {/* Results Section */}
        {(result || isComparing) && (
          <Box>
            <Text fontWeight="medium" fontSize="sm" mb={4}>
              Comparison Results
            </Text>

            {isComparing ? (
              <Card bg={cardBg}>
                <CardBody>
                  <Box textAlign="center" py={8}>
                    <VStack spacing={6}>
                      <JsonLoadingDots />
                      <Icon as={FiGitCompare} boxSize={8} color="purple.400" />
                      <Text color="gray.500">Comparing JSON objects...</Text>
                    </VStack>
                  </Box>
                </CardBody>
              </Card>
            ) : result ? (
              <VStack spacing={6} align="stretch">
                {/* Summary */}
                <Alert
                  status={result.areEqual ? 'success' : 'info'}
                  rounded="md"
                >
                  <AlertIcon />
                  <Box flex={1}>
                    <AlertTitle>
                      {result.areEqual ? 'Objects are identical!' : 'Differences detected'}
                    </AlertTitle>
                    <AlertDescription>
                      {result.areEqual
                        ? 'Both JSON objects are exactly the same'
                        : `Found ${result.summary.totalDifferences} difference(s) between the objects`
                      }
                    </AlertDescription>
                  </Box>
                </Alert>

                {/* Statistics */}
                {!result.areEqual && (
                  <Card bg={cardBg}>
                    <CardHeader pb={2}>
                      <HStack>
                        <Icon as={FiGitCompare} color="purple.500" />
                        <Text fontWeight="medium">Change Summary</Text>
                      </HStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <SimpleGrid columns={4} spacing={4}>
                        <Stat textAlign="center">
                          <StatLabel fontSize="xs">Added</StatLabel>
                          <StatNumber fontSize="lg" color="green.500">
                            {result.summary.added}
                          </StatNumber>
                        </Stat>

                        <Stat textAlign="center">
                          <StatLabel fontSize="xs">Removed</StatLabel>
                          <StatNumber fontSize="lg" color="red.500">
                            {result.summary.removed}
                          </StatNumber>
                        </Stat>

                        <Stat textAlign="center">
                          <StatLabel fontSize="xs">Modified</StatLabel>
                          <StatNumber fontSize="lg" color="orange.500">
                            {result.summary.modified}
                          </StatNumber>
                        </Stat>

                        <Stat textAlign="center">
                          <StatLabel fontSize="xs">Type Changed</StatLabel>
                          <StatNumber fontSize="lg" color="purple.500">
                            {result.summary.typeChanged}
                          </StatNumber>
                        </Stat>
                      </SimpleGrid>
                    </CardBody>
                  </Card>
                )}

                {/* Detailed Differences */}
                {!result.areEqual && result.differences.length > 0 && (
                  <Card bg={cardBg}>
                    <CardHeader>
                      <Text fontWeight="medium">Detailed Differences</Text>
                    </CardHeader>
                    <CardBody pt={0}>
                      <Accordion allowMultiple defaultIndex={[0]}>
                        {result.differences.map((diff, index) => {
                          const colorScheme = getDifferenceColor(diff.type)
                          const IconComponent = getDifferenceIcon(diff.type)

                          return (
                            <AccordionItem key={index} border="none" mb={2}>
                              <AccordionButton
                                bg={colorScheme.bg}
                                color={colorScheme.color}
                                rounded="md"
                                _hover={{
                                  bg: colorScheme.bg,
                                  opacity: 0.8,
                                }}
                                _dark={{
                                  bg: colorScheme.bg.replace('100', '900'),
                                  color: colorScheme.color.replace('800', '200'),
                                }}
                              >
                                <HStack flex={1} spacing={3} align="center">
                                  <Icon as={IconComponent} />
                                  <VStack align="start" spacing={0} flex={1}>
                                    <HStack>
                                      <Badge
                                        size="sm"
                                        colorScheme={
                                          diff.type === 'added' ? 'green' :
                                          diff.type === 'removed' ? 'red' :
                                          diff.type === 'type-changed' ? 'purple' : 'orange'
                                        }
                                      >
                                        {colorScheme.label}
                                      </Badge>
                                      <Code fontSize="sm">{diff.path}</Code>
                                    </HStack>
                                  </VStack>
                                  <AccordionIcon />
                                </HStack>
                              </AccordionButton>

                              <AccordionPanel pb={4}>
                                <Stack spacing={2}>
                                  {diff.type === 'added' && (
                                    <Box>
                                      <Text fontSize="sm" fontWeight="medium" color="green.600">
                                        Added:
                                      </Text>
                                      <Code
                                        display="block"
                                        whiteSpace="pre"
                                        p={2}
                                        bg="green.50"
                                        _dark={{ bg: 'green.900' }}
                                        rounded="sm"
                                        fontSize="sm"
                                      >
                                        {formatValueForDisplay(diff.newValue)}
                                      </Code>
                                    </Box>
                                  )}

                                  {diff.type === 'removed' && (
                                    <Box>
                                      <Text fontSize="sm" fontWeight="medium" color="red.600">
                                        Removed:
                                      </Text>
                                      <Code
                                        display="block"
                                        whiteSpace="pre"
                                        p={2}
                                        bg="red.50"
                                        _dark={{ bg: 'red.900' }}
                                        rounded="sm"
                                        fontSize="sm"
                                      >
                                        {formatValueForDisplay(diff.oldValue)}
                                      </Code>
                                    </Box>
                                  )}

                                  {(diff.type === 'modified' || diff.type === 'type-changed') && (
                                    <>
                                      <Box>
                                        <Text fontSize="sm" fontWeight="medium" color="red.600">
                                          Old value:
                                        </Text>
                                        <Code
                                          display="block"
                                          whiteSpace="pre"
                                          p={2}
                                          bg="red.50"
                                          _dark={{ bg: 'red.900' }}
                                          rounded="sm"
                                          fontSize="sm"
                                        >
                                          {formatValueForDisplay(diff.oldValue)}
                                        </Code>
                                      </Box>

                                      <Box>
                                        <Text fontSize="sm" fontWeight="medium" color="green.600">
                                          New value:
                                        </Text>
                                        <Code
                                          display="block"
                                          whiteSpace="pre"
                                          p={2}
                                          bg="green.50"
                                          _dark={{ bg: 'green.900' }}
                                          rounded="sm"
                                          fontSize="sm"
                                        >
                                          {formatValueForDisplay(diff.newValue)}
                                        </Code>
                                      </Box>

                                      {diff.type === 'type-changed' && (
                                        <Text fontSize="sm" color="purple.600" fontStyle="italic">
                                          Type changed from {diff.oldType} to {diff.newType}
                                        </Text>
                                      )}
                                    </>
                                  )}
                                </Stack>
                              </AccordionPanel>
                            </AccordionItem>
                          )
                        })}
                      </Accordion>
                    </CardBody>
                  </Card>
                )}
              </VStack>
            ) : null}
          </Box>
        )}

        {/* Tips */}
        <Box bg="purple.50" p={4} rounded="md" _dark={{ bg: 'purple.900' }}>
          <Text fontSize="sm" color="purple.700" _dark={{ color: 'purple.200' }}>
            <strong>💡 Tips:</strong> Use auto-compare for real-time diff as you type,
            or turn it off for manual comparison. Click on any difference to see detailed
            before/after values. Use the Swap button to quickly switch the left and right inputs.
            <br />
            <strong>⌨️ Shortcuts:</strong> Ctrl+R to compare (when auto-compare is off), Ctrl+S to swap inputs, Ctrl+K to clear all.
          </Text>
        </Box>
        </VStack>
      </Box>
    </Layout>
  )
}