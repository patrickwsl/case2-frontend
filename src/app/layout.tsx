import { ThemeProvider } from '@/context/ThemeContext'
import './globals.css'
import ThemeClassController from '@/components/ThemeClassController'

export const metadata = {
  title: 'Anka Tech',
  description: 'Sistema de investimento',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          <ThemeClassController />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
