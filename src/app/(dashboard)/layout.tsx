'use client'
import { AuthProvider } from '@/src/context/auth-provider'

export default function DashboardLayout(props: { children: React.ReactNode }) {
  return (
    <main>
      <AuthProvider>{props.children}</AuthProvider>
    </main>
  )
}
