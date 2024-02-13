import { NextRequest } from 'next/server'
import { refreshSession } from '@lib/auth/manageSession'

export async function middleware(request: NextRequest) {
  return await refreshSession(request)
}

// Stop Middleware running on static files
export const config = { matcher: '/((?!.*\\.).*)' }
