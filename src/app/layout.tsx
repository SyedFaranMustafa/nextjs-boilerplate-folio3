import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@styles/globals.css'
import theme from '@theme/themeConfig'
import { Author } from 'next/dist/lib/metadata/types/metadata-types'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js boilerplate folio',
  description: 'Next.js boilerplate folio',
  viewport: 'width=device-width, initial-scale=1',
  authors: ['SyedFaranMustafa'] as Author[],
}

export default function RootLayout(props: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <ConfigProvider theme={theme}>
      <AntdRegistry>
        <html lang="en">
          <body className={inter.className}>{props.children}</body>
        </html>
      </AntdRegistry>
    </ConfigProvider>
  )
}
