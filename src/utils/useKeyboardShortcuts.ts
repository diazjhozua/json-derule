'use client'

import { useEffect } from 'react'

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger custom shortcuts when typing in inputs
      const isInInput = event.target instanceof HTMLElement &&
        (event.target.tagName === 'INPUT' ||
         event.target.tagName === 'TEXTAREA' ||
         event.target.isContentEditable)

      if (isInInput) {
        // Allow normal browser shortcuts (Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+Z, etc.) in inputs
        const allowedInInputs = ['a', 'c', 'v', 'z', 'x', 'y']
        if (event.ctrlKey && allowedInInputs.includes(event.key.toLowerCase())) {
          return // Let browser handle these shortcuts
        }
        // Don't trigger custom shortcuts in inputs
        return
      }

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrlKey === undefined || shortcut.ctrlKey === event.ctrlKey
        const shiftMatch = shortcut.shiftKey === undefined || shortcut.shiftKey === event.shiftKey
        const altMatch = shortcut.altKey === undefined || shortcut.altKey === event.altKey
        const keyMatch = shortcut.key.toLowerCase() === event.key.toLowerCase()

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          event.preventDefault()
          shortcut.action()
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

// Common keyboard shortcut combinations
export const createShortcuts = {
  format: (action: () => void): KeyboardShortcut => ({
    key: 'f',
    ctrlKey: true,
    action,
    description: 'Format JSON (Ctrl+F)',
  }),

  minify: (action: () => void): KeyboardShortcut => ({
    key: 'm',
    ctrlKey: true,
    action,
    description: 'Minify JSON (Ctrl+M)',
  }),

  validate: (action: () => void): KeyboardShortcut => ({
    key: 'v',
    ctrlKey: true,
    action,
    description: 'Validate JSON (Ctrl+V)',
  }),

  compare: (action: () => void): KeyboardShortcut => ({
    key: 'r',
    ctrlKey: true,
    action,
    description: 'Compare JSON (Ctrl+R)',
  }),

  clear: (action: () => void): KeyboardShortcut => ({
    key: 'k',
    ctrlKey: true,
    action,
    description: 'Clear all (Ctrl+K)',
  }),

  copy: (action: () => void): KeyboardShortcut => ({
    key: 'c',
    ctrlKey: true,
    shiftKey: true,
    action,
    description: 'Copy result (Ctrl+Shift+C)',
  }),
}