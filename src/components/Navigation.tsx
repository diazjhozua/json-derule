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
      color={isActive ? 'brand.600' : 'gray.600'}
      fontWeight={isActive ? 'semibold' : 'medium'}
      bg={isActive ? useColorModeValue('brand.50', 'brand.900') : 'transparent'}
      border="1px solid"
      borderColor={isActive ? useColorModeValue('brand.200', 'brand.700') : 'transparent'}
      transition="all 0.2s ease"
      position="relative"
      _hover={{
        textDecoration: 'none',
        color: 'brand.600',
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
      <Flex h={18} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Link as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
            <LogoMark size="sm" />
          </Link>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink href="/">Formatter</NavLink>
            <NavLink href="/validator">Validator</NavLink>
            <NavLink href="/compare">Compare</NavLink>
          </HStack>
        </HStack>

        <Flex alignItems="center">
          <Button
            onClick={toggleColorMode}
            mr={3}
            size="sm"
            variant="ghost"
            borderRadius="lg"
            color="gray.600"
            _hover={{
              bg: useColorModeValue('brand.50', 'brand.900'),
              color: 'brand.600',
              transform: 'scale(1.05)',
            }}
            transition="all 0.2s ease"
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>
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