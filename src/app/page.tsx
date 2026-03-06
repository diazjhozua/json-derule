import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Button,
  Icon,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiCode, FiCheckCircle, FiGitCompare } from 'react-icons/fi'
import Link from 'next/link'

export default function Home() {
  const cardBg = useColorModeValue('white', 'gray.800')
  const cardBorder = useColorModeValue('gray.200', 'gray.600')

  return (
    <Container maxW="6xl" py={12}>
      <Stack spacing={8} textAlign="center" mb={12}>
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
          fontWeight="bold"
        >
          JSON DERULE
        </Heading>
        <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
          A powerful suite of JSON manipulation tools for developers. Format, validate, and compare JSON with ease.
        </Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        <Card
          bg={cardBg}
          border="1px"
          borderColor={cardBorder}
          shadow="lg"
          transition="transform 0.2s"
          _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
        >
          <CardHeader textAlign="center">
            <Box
              w={16}
              h={16}
              mx="auto"
              mb={4}
              bg="blue.500"
              rounded="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiCode} color="white" boxSize={8} />
            </Box>
            <Heading size="md">JSON Formatter</Heading>
          </CardHeader>
          <CardBody textAlign="center">
            <Text color="gray.600" mb={6}>
              Format and beautify your JSON or minify it for production. Clean up messy JSON instantly.
            </Text>
            <Link href="/formatter" passHref>
              <Button colorScheme="blue" width="full">
                Format JSON
              </Button>
            </Link>
          </CardBody>
        </Card>

        <Card
          bg={cardBg}
          border="1px"
          borderColor={cardBorder}
          shadow="lg"
          transition="transform 0.2s"
          _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
        >
          <CardHeader textAlign="center">
            <Box
              w={16}
              h={16}
              mx="auto"
              mb={4}
              bg="green.500"
              rounded="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiCheckCircle} color="white" boxSize={8} />
            </Box>
            <Heading size="md">JSON Validator</Heading>
          </CardHeader>
          <CardBody textAlign="center">
            <Text color="gray.600" mb={6}>
              Validate your JSON syntax and get detailed error messages with line numbers for debugging.
            </Text>
            <Link href="/validator" passHref>
              <Button colorScheme="green" width="full">
                Validate JSON
              </Button>
            </Link>
          </CardBody>
        </Card>

        <Card
          bg={cardBg}
          border="1px"
          borderColor={cardBorder}
          shadow="lg"
          transition="transform 0.2s"
          _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
        >
          <CardHeader textAlign="center">
            <Box
              w={16}
              h={16}
              mx="auto"
              mb={4}
              bg="purple.500"
              rounded="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FiGitCompare} color="white" boxSize={8} />
            </Box>
            <Heading size="md">JSON Compare</Heading>
          </CardHeader>
          <CardBody textAlign="center">
            <Text color="gray.600" mb={6}>
              Compare two JSON objects and visualize the differences with detailed change tracking.
            </Text>
            <Link href="/compare" passHref>
              <Button colorScheme="purple" width="full">
                Compare JSON
              </Button>
            </Link>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Container>
  )
}