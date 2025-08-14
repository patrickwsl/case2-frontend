'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/context/ThemeContext'
import ThemeClassController from '@/components/ThemeClassController'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeClassController />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
