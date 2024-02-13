'use client'
import React from 'react'
import { useSession } from '@/src/context/auth-provider'

export default function Dashboard() {
  const { session, loading, error } = useSession()

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  console.log('log session line 13 PAGE WITH CLIENT', session)

  return (
    <div>
      <h1>Dashboard with client session</h1>
    </div>
  )
}
