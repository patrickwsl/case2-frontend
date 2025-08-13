'use client'

import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="fixed top-4 right-4 text-neonBlue text-3xl z-50"
      title="Toggle theme"
    >
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  )
}
