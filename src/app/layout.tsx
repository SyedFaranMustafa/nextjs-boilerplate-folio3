import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@styles/globals.css'
import '@theme/themeConfig'
import { Author } from 'next/dist/lib/metadata/types/metadata-types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js with Windi CSS',
  description: 'Next.js with Windi CSS',
  viewport: 'width=device-width, initial-scale=1',
  authors: ['SyedFaranMustafa'] as Author[],
}

export default function RootLayout(props: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{props.children}</body>
    </html>
  )
}
