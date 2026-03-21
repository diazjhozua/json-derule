'use client'

import {
  Box,
  Spinner,
  VStack,
  Text,
  HStack,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react'

interface LoadingProps {
  variant?: 'spinner' | 'skeleton' | 'dots'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  fullScreen?: boolean
}

export default function Loading({
  variant = 'spinner',
  size = 'md',
  text,
  fullScreen = false,
}: LoadingProps) {
  const bg = useColorModeValue('white', 'gray.900')

  const sizeMap = {
    sm: { spinner: 'sm', height: '40px', fontSize: 'sm' },
    md: { spinner: 'md', height: '60px', fontSize: 'md' },
    lg: { spinner: 'lg', height: '80px', fontSize: 'lg' },
    xl: { spinner: 'xl', height: '100px', fontSize: 'xl' },
  }

  const { spinner, height, fontSize } = sizeMap[size]

  const LoadingContent = () => {
    switch (variant) {
      case 'skeleton':
        return (
          <VStack spacing={4} w="full" maxW="400px">
            <Skeleton height="20px" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            <Skeleton height="40px" />
          </VStack>
        )

      case 'dots':
        return (
          <HStack spacing={2}>
            <Box
              w="8px"
              h="8px"
              bg="blue.500"
              rounded="full"
              animation="pulse 1.5s ease-in-out infinite"
            />
            <Box
              w="8px"
              h="8px"
              bg="blue.500"
              rounded="full"
              animation="pulse 1.5s ease-in-out 0.1s infinite"
            />
            <Box
              w="8px"
              h="8px"
              bg="blue.500"
              rounded="full"
              animation="pulse 1.5s ease-in-out 0.2s infinite"
            />
          </HStack>
        )

      default:
        return (
          <VStack spacing={4}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size={spinner}
            />
            {text && (
              <Text color="gray.600" fontSize={fontSize} textAlign="center">
                {text}
              </Text>
            )}
          </VStack>
        )
    }
  }

  if (fullScreen) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={bg}
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={9999}
      >
        <LoadingContent />
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH={height}
      w="full"
    >
      <LoadingContent />
    </Box>
  )
}

// Specialized loading components for common use cases
export function JsonProcessingLoader({ operation }: { operation: string }) {
  return (
    <Loading
      variant="spinner"
      size="md"
      text={`${operation}...`}
    />
  )
}

export function PageLoader() {
  return (
    <Loading
      variant="spinner"
      size="lg"
      text="Loading..."
      fullScreen
    />
  )
}

export function ContentSkeleton() {
  return <Loading variant="skeleton" />
}