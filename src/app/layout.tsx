import './globals.css'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'Anka Tech',
  description: 'Sistema de investimento',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
