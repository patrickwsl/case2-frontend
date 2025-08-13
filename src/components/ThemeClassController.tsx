'use client'

import { useTheme } from '@/context/ThemeContext'
import { useEffect } from 'react'

export default function ThemeClassController() {
  const { theme } = useTheme()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return null
}
