'use client'

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Heading,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoMark } from './Logo'
import JsonThemeToggle from './JsonThemeToggle'

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      as={NextLink}
      href={href}
      px={4}
      py={2}
      rounded="lg"
      color={isActive ? useColorModeValue('brand.600', 'brand.300') : useColorModeValue('gray.600', 'gray.300')}
      fontWeight={isActive ? 'semibold' : 'medium'}
      bg={isActive ? useColorModeValue('brand.50', 'brand.900') : 'transparent'}
      border="1px solid"
      borderColor={isActive ? useColorModeValue('brand.200', 'brand.700') : 'transparent'}
      transition="all 0.2s ease"
      position="relative"
      _hover={{
        textDecoration: 'none',
        color: useColorModeValue('brand.600', 'brand.200'),
        bg: useColorModeValue('brand.50', 'brand.900'),
        borderColor: useColorModeValue('brand.200', 'brand.700'),
        transform: 'translateY(-1px)',
      }}
      _before={isActive ? {
        content: '""',
        position: 'absolute',
        bottom: '-2px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '20px',
        height: '2px',
        bg: 'brand.500',
        borderRadius: '1px',
      } : {}}
    >
      {children}
    </Link>
  )
}

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      px={6}
      borderBottomWidth="2px"
      borderBottomColor={useColorModeValue('brand.100', 'brand.800')}
      boxShadow={useColorModeValue('0 2px 8px rgba(13, 148, 136, 0.1)', '0 2px 8px rgba(45, 212, 191, 0.2)')}
      position="sticky"
      top={0}
      zIndex={10}
      backdropFilter="blur(8px)"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Link
            as={NextLink}
            href="/"
            _hover={{ textDecoration: 'none' }}
            color="inherit"
            _focus={{ color: 'inherit' }}
            display="inline-flex"
            alignItems="center"
            h="40px"
          >
            <LogoMark size="sm" />
          </Link>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink href="/">Formatter</NavLink>
            <NavLink href="/validator">Validator</NavLink>
            <NavLink href="/compare">Compare</NavLink>
          </HStack>
        </HStack>

        <HStack spacing={3}>
          <JsonThemeToggle />
          <Box
            as="button"
            w="32px"
            h="32px"
            borderRadius="lg"
            color="gray.600"
            bg="transparent"
            border="none"
            cursor="pointer"
            display={{ base: 'flex', md: 'none' }}
            alignItems="center"
            justifyContent="center"
            lineHeight="1"
            onClick={isOpen ? onClose : onOpen}
            aria-label="Open Menu"
            _hover={{
              bg: useColorModeValue('brand.50', 'brand.900'),
              color: 'brand.600',
            }}
          >
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </Box>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <NavLink href="/">Formatter</NavLink>
            <NavLink href="/validator">Validator</NavLink>
            <NavLink href="/compare">Compare</NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}