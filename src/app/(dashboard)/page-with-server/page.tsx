import React from 'react'
import { getSession } from '@/src/lib/auth'

export default async function ServerPage() {
  const session = await getSession()

  console.log('session line 7', session)

  return <div>page with server </div>
}
