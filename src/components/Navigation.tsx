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
      px={2}
      py={1}
      rounded="md"
      color={isActive ? 'blue.500' : 'gray.600'}
      fontWeight={isActive ? 'bold' : 'normal'}
      _hover={{
        textDecoration: 'none',
        color: 'blue.500',
      }}
    >
      {children}
    </Link>
  )
}

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} borderBottomWidth="1px">
      <Flex h={16} alignItems="center" justifyContent="space-between">
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
          <Button onClick={toggleColorMode} mr={3} size="sm" variant="ghost">
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